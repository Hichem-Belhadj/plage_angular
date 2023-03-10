import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReservationService } from '../services/reservation/reservation.service';
import { ToastService } from '../services/toast/toast.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
	reservation: any = <any>{};
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

	majReservation(idStatut: number): boolean {
		this.reservationService.majStatutReservation(this.idReservation, idStatut).subscribe({
			next: response => {
				if(response) {
					this.reservation = response;
					// this.toast = this.toastService.voirToast(this.userToDelete.firstName + " has been removed from the database!", true);
				} else {
					this.toast = this.toastService.voirToast("An error has occurred!", false);
				}
			},
			error: err => {
				console.log(err);
				this.toast = this.toastService.voirToast("An error has occurred!", false);
			}
		});
		return true;
	}

	confirmerReservation(form: NgForm) {
		console.log(form.valid);
		if( !form.valid ) {
			this.toast = this.toastService.voirToast("Veuillez affecter tous les parasols", false);
			return;
		}
		if ( this.majReservation(2) ) {
			this.toast = this.toastService.voirToast("Cette r??servation ?? bien ??t?? valid??e", true);
		}
	}

	refuserReservation() {
		this.modalService.dismissAll();
		if ( this.majReservation(3) ) {
			this.toast = this.toastService.voirToast("Cette r??servation ?? bien ??t?? refus??e", true);
		}
	}

}
