import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

	private baseUrl: string = "http://localhost:8080/api/v1";
	constructor(private http: HttpClient) { }

	majStatutReservation(statut: string){
		return this.http.delete(`${this.baseUrl}`);
	}

	recupererListeParasols(date: string){
		return this.http.get<any>(`${this.baseUrl}/recupererParasolParDate?date=${date}`);
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

	ajoutReservation() {
		
	}
}
