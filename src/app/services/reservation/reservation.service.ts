import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

	private baseUrl: string = "http://localhost:8080/api/v1";
	constructor(private http: HttpClient) { }

	majStatutReservation(idReservation: number, idStatut: number){
		return this.http.patch<any>(`${this.baseUrl}/reservations/statut/${idReservation}/${idStatut}`, {});
	}

	recupererListeParasols(date: string){
		return this.http.get<any>(`${this.baseUrl}/reservations/parasol/statut?date=${date}`);
	}

	recupererStatutReservation(id: number) {
		return this.http.delete(`${this.baseUrl}`);
	}

	recupererReservationParId(id: number) {
		return this.http.get<any>(`${this.baseUrl}/reservations/${id}`);
	}

	recupererReservations(page?: number, taille?: number, filtrerPar?: string, trierPar?: string) {
		let param = `?page=${page}&taille=${taille}&filtrerPar=${filtrerPar}&trierPar=${trierPar}`;
		return this.http.get<any>(`${this.baseUrl}/reservations/page${param}`);
	}

	ajoutReservation(donnees: any) {
		return this.http.post<any>(`${this.baseUrl}/location`, donnees);
	}
}
