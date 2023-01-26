import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

	private baseUrl: string = "http://localhost:8080/api/v1/reservation";
	constructor(private http: HttpClient) { }

	majStatutReservation(statut: string){
		return this.http.delete(`${this.baseUrl}`);
	}

	recupererStatutReservation(id: number) {
		return this.http.delete(`${this.baseUrl}`);
	}

	ajoutReservation() {
		
	}
}
