import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

	private baseUrl: string = "http://localhost:8080/api/v1/utilisateur";
	constructor(private http: HttpClient) { }

	suprimerUtilisateur(id: number){
		return this.http.delete(`${this.baseUrl}/user/${id}`);
	}

	ajouterUtilisateur() {
		
	}
}
