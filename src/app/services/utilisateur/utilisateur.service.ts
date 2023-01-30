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
		private http: HttpClient,
		private router: Router
	) { }

	emissionDeDonees(donees: any) {
		this.emetteurDonees.next(donees);
	}

	suprimerUtilisateur(id: number){
		return this.http.delete(`${this.baseUrl}/utilisateur/supprimer/${id}`);
	}

	connexion(utilisateur: any) {
		//let param = `?email=${email}&motDePasse=${motDePasse}`;
		return this.http.post<any>(`${this.baseUrl}/login`, utilisateur);
	}

	oncessionnaire() {
		this.recupererUtilisateurCourantREST()?.subscribe({
			next: reponse => {
				this.utilisateurCourant = reponse;
				for (let role of this.utilisateurCourant.roles) {
					if (role.name == 'ROLE_ADMIN') {
						this.estConcessionnaire = true;
						break;
					}
				}
			},
			error: err=> {
				console.log(err);
			}
		});
	}

	recupererUtilisateurCourantREST() {
		return this.http.get<any>(this.baseUrl + "/utilisateurCourrant");
	}

	recupererLocataires(page?: number, taille?: number, filtrerPar?: string, trierPar?: string, valeur?: string) {
		let paramValeur = valeur ? `&valeur=${valeur}` : "";
		let param = `?page=${page}&taille=${taille}&filtrerPar=${filtrerPar}&trierPar=${trierPar}${paramValeur}`;
		return this.http.get<any>(`${this.baseUrl}/utilisateur/locataire${param}`);
	}

	definirUtilisateurCourrant() {
		if (this.estConnecte()) {
			this.recupererUtilisateurCourantREST()?.subscribe({
				next: reponse => {
					return console.log(reponse);
				}
			});
		}
	}

	recupererUtilisateurCourant() {
		this.definirUtilisateurCourrant();
		return this.utilisateurCourant;
	}

	deconnexion() {
		localStorage.removeItem("access_token");
		localStorage.removeItem("expire_at");
	}

	recupererDateExpiration() {
		return new Date(+localStorage.getItem("expire_at")!);
	}

	estConnecte() {
		if (moment().isBefore(this.recupererDateExpiration())) {
			return true
		} else {
			this.deconnexion();
			return false
		}
	}

	recupererLienDeParente() {
		return this.http.get<any>(`${this.baseUrl}/utilisateur/lienDeParente`);
	}

	recupererListePays() {
		return this.http.get<any>(`${this.baseUrl}/utilisateur/listePays`);
	}

	enregistrerLocataire(locataire: Utilisateur) {
		return this.http.post<any>(`${this.baseUrl}/utilisateur/ajout`, locataire);
	}

	recupererBaseUrl() {
		return this.baseUrl;
	}
}
