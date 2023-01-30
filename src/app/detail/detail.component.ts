import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Reservation } from '../models/reservation.model';
import { ReservationService } from '../services/reservation/reservation.service';
import { ToastService } from '../services/toast/toast.service';
import { UtilisateurService } from '../services/utilisateur/utilisateur.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
	reservation: Reservation = <Reservation>{};
	idReservation: number = 0;
	public toast = {
		show: false,
		class: "",
		message: ""
	}

	constructor(
		private reservationService: ReservationService,
		public modalService: NgbModal,
		private toastService: ToastService,
		private route: ActivatedRoute,
		private router: Router,
	) {}

	ngOnInit() {
		this.route.queryParamMap.subscribe(res=>{
			this.idReservation = res.get("idReservation") != null ? +(res.get("idReservation")!) : 0;
		});
		console.log(this.idReservation);
		
		if (this.idReservation == 0) {
			this.router.navigateByUrl("/404");
		}
		this.rafraichirPage();
	}

	rafraichirPage() {
		this.reservationService.recupererReservationParId(this.idReservation).subscribe({
			next: reponse => {
				this.reservation = reponse;
				console.log(reponse);
			},
			error: err=>{
				console.log(err);
				
			}
		});
	}

	majReservation(statut: string): boolean {
		// this.reservationService.majStatutReservation(statut).subscribe({
		// 	next: response => {
		// 		if(response) {
		// 			this.updatePage(this.pageData.page, this.pageData.size, this.pageData.sortBy, this.pageData.orderBy);
		// 			this.toast = this.toastService.voirToast(this.userToDelete.firstName + " has been removed from the database!", true);
		// 		} else {
		// 			this.toast = this.toastService.voirToast("An error has occurred!", false);
		// 		}
		// 	},
		// 	error: err => {
		// 		console.log(err);
		// 		this.toast = this.toastService.voirToast("An error has occurred!", false);
		// 	}
		// });
		this.reservation.statut.nom = statut;
		return true;
	}

	confirmerReservation(form: NgForm) {
		console.log(form.valid);
		if( !form.valid ) {
			this.toast = this.toastService.voirToast("Veuillez affecter tous les parasols", false);
			return;
		}
		if ( this.majReservation("confirmée") ) {
			this.toast = this.toastService.voirToast("Cette réservation à bien été validée", true);
		}
	}

	refuserReservation() {
		this.modalService.dismissAll();
		if ( this.majReservation("refusée") ) {
			this.toast = this.toastService.voirToast("Cette réservation à bien été refusée", true);
		}
	}

}
