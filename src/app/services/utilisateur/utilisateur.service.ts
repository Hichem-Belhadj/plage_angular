import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from "moment";
import { Subject } from 'rxjs';
import { Utilisateur } from 'src/app/models/utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

	private baseUrl: string = "http://localhost:8080/api/v1";
	public emetteurDonees = new Subject();
	public utilisateurCourant: any;
	public estConcessionnaire: boolean = false;
	
	constructor(
		private http: HttpClient
	) { }

	/**
	 * Permet de supprimer un utilisateur
	 * @param id 
	 * @returns 
	 */
	suprimerUtilisateur(id: number){
		return this.http.delete(`${this.baseUrl}/utilisateur/supprimer/${id}`);
	}

	/**
	 * Permet d'établir la connexion
	 * @param utilisateur 
	 * @returns 
	 */
	connexion(utilisateur: any) {
		return this.http.post<any>(`${this.baseUrl}/login`, utilisateur);
	}

	/**
	 * 
	 * @returns Permet de récupérer les information de l'utilisateur courrant
	 */
	recupererUtilisateurCourantREST() {
		return this.http.get<any>(this.baseUrl + "/utilisateurCourrant");
	}

	/**
	 * Permet de récupérer la liste des utilisateur avec pagination
	 * @param page 
	 * @param taille 
	 * @param filtrerPar 
	 * @param trierPar 
	 * @param valeur 
	 * @returns 
	 */
	recupererLocataires(page?: number, taille?: number, filtrerPar?: string, trierPar?: string, valeur?: string) {
		let paramValeur = valeur ? `&valeur=${valeur}` : "";
		let param = `?page=${page}&taille=${taille}&filtrerPar=${filtrerPar}&trierPar=${trierPar}${paramValeur}`;
		return this.http.get<any>(`${this.baseUrl}/utilisateur/locataire${param}`);
	}

	/**
	 * Permet de récupérer la liste des liens de parenté
	 * @returns 
	 */
	recupererLienDeParente() {
		return this.http.get<any>(`${this.baseUrl}/utilisateur/lienDeParente`);
	}

	/**
	 * Permet de récupérer la liste des pays en base
	 * @returns 
	 */
	recupererListePays() {
		return this.http.get<any>(`${this.baseUrl}/utilisateur/listePays`);
	}

	/**
	 * Permet d'enregistrer un nouveau locataire
	 * @param locataire 
	 * @returns 
	 */
	enregistrerLocataire(locataire: Utilisateur) {
		return this.http.post<any>(`${this.baseUrl}/utilisateur/ajout`, locataire);
	}

	/**
	 * Définit si l'utilisateur est connecté
	 */
	definirUtilisateurCourrant() {
		if (this.estConnecte()) {
			this.recupererUtilisateurCourantREST()?.subscribe({
				next: reponse => {
					return console.log(reponse);
				}
			});
		}
	}

	/**
	 * Retourne les information de l'utilisateur courant
	 * @returns 
	 */
	recupererUtilisateurCourant() {
		this.definirUtilisateurCourrant();
		return this.utilisateurCourant;
	}

	/**
	 * Déconnecte l'utilisateur
	 */
	deconnexion() {
		localStorage.removeItem("access_token");
		localStorage.removeItem("expire_at");
	}

	/**
	 * Retourne la date d'expiration du jeton de sécurité
	 * @returns 
	 */
	recupererDateExpiration() {
		return new Date(+localStorage.getItem("expire_at")!);
	}

	/**
	 * Vérifie si l'utilisateur est connecté.
	 * @returns 
	 */
	estConnecte() {
		if (moment().isBefore(this.recupererDateExpiration())) {
			return true
		} else {
			this.deconnexion();
			return false
		}
	}

	/**
	 * Retourne l'url de base
	 * @returns 
	 */
	recupererBaseUrl() {
		return this.baseUrl;
	}

	/**
	 * Permet de rafraichir la page entre plusieur composants
	 * @param donees 
	 */
	emissionDeDonees(donees: any) {
		this.emetteurDonees.next(donees);
	}
}
