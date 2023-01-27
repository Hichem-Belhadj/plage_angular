import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste-reservation',
  templateUrl: './liste-reservation.component.html',
  styleUrls: ['./liste-reservation.component.css']
})
export class ListeReservationComponent {
	
	constructor(
		private router: Router,
	) {}

	voirDetail(idReservation: number) {
		this.router.navigateByUrl(`/detail?idReservation=${idReservation}`)
	}
}
