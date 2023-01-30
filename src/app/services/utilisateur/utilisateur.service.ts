import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from "moment";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

	private baseUrl: string = "http://localhost:8080/api/v1";
	constructor(private http: HttpClient) { }
	public emetteurDonees = new Subject();
	public utilisateurCourant: any;

	emissionDeDonees(donees: any) {
		this.emetteurDonees.next(donees);
	}

	suprimerUtilisateur(id: number){
		return this.http.delete(`${this.baseUrl}/utilisateur/supprimer/${id}`);
	}

	connexion(email: string, motDePasse: string) {
		let param = `?email=${email}&motDePasse=${motDePasse}`;
		return this.http.post<any>(`${this.baseUrl}/login${param}`, null);
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

	ajouterUtilisateur() {
		
	}

	recupererBaseUrl() {
		return this.baseUrl;
	}
}
