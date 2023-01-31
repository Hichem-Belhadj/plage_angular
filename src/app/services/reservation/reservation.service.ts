import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

	private baseUrl: string = "http://localhost:8080/api/v1";
	constructor(private http: HttpClient) { }

	/**
	 * Mise à jours du statut de la réservation
	 */
	majStatutReservation(Reservation: any){
		return this.http.patch<any>(`${this.baseUrl}/reservations/parasol`, Reservation);
	}

	/**
	 * Récupérer la liste des parasols
	 * @param date 
	 * @returns 
	 */
	recupererListeParasols(date: string){
		return this.http.get<any>(`${this.baseUrl}/reservations/parasol/statut?date=${date}`);
	}

	/**
	 * Récupérer la liste des réservations en fonction de l'ID
	 * @param id 
	 * @returns 
	 */
	recupererReservationParId(id: number) {
		return this.http.get<any>(`${this.baseUrl}/reservations/${id}`);
	}

	/**
	 * Récupérer des pages de réservation en fonction des droits du demandeur
	 * @param page 
	 * @param taille 
	 * @param filtrerPar 
	 * @param trierPar 
	 * @returns 
	 */
	recupererReservations(page?: number, taille?: number, filtrerPar?: string, trierPar?: string) {
		let param = `?page=${page}&taille=${taille}&filtrerPar=${filtrerPar}&trierPar=${trierPar}`;
		return this.http.get<any>(`${this.baseUrl}/reservations/page${param}`);
	}

	/**
	 * Permet l'ajout d'une reservation.
	 * @param donnees 
	 * @returns 
	 */
	ajoutReservation(donnees: any) {
		return this.http.post<any>(`${this.baseUrl}/location`, donnees);
	}

	recupererParasolsDisponibles(dateHeureDebut: string, dateHeureFin: string) {
		let param = `?dateDebut=${dateHeureDebut}&dateFin=${dateHeureFin}`;
		return this.http.get<any>(`${this.baseUrl}/reservations/parasol/statut/duree${param}`);
	}
}
