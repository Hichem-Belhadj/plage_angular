import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';
import { NgbDate, NgbDateParserFormatter, NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CustomDateParserFormatter, CustomDatepickerI18n } from '../services/BSLocal/bslocal.service';
import { ReservationService } from '../services/reservation/reservation.service';
import { ToastService } from '../services/toast/toast.service';
import { UtilService } from '../services/util/util.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
  providers: [
	{ provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n },
	{ provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
]
})
export class ReservationComponent {
	formulaireReservation: FormGroup = <FormGroup>{};
	modelDateDebut: NgbDateStruct | undefined;
	modelDateFin: NgbDateStruct | undefined;
	public toast = {
		show: false,
		class: "",
		message: ""
	}

	constructor(
		private reservationService: ReservationService,
		public utilService: UtilService,
		private toastService: ToastService,
	) {}

	ngOnInit() {
		this.formulaireReservation = new FormGroup({
			modelDateDebut: new FormControl('', [Validators.required]),
			modelDateFin: new FormControl('', [Validators.required]),
			parasol1: new FormControl('', [Validators.required]),
			parasol2: new FormControl('',),
			remarques: new FormControl(''),
			parasols: new FormArray([])
		})
	}

	dateControle() {
		const moisDebut: number = this.formulaireReservation.value.modelDateDebut.month,
			moisFin: number = this.formulaireReservation.value.modelDateDebut.month,
			jourFin: number = this.formulaireReservation.value.modelDateDebut.day,
			dateDebut: NgbDate = NgbDate.from(this.formulaireReservation.value.modelDateDebut)!,
			dateFin: NgbDate = NgbDate.from(this.formulaireReservation.value.modelDateFin)!;

		if(moisDebut < 6 || (moisFin >=  9 && jourFin > 15) || dateFin.before(dateDebut)) {
			return false
		}

		return true
	}

	reserver(){
		console.log(this.formulaireReservation.value.modelDateDebut,this.formulaireReservation.value.modelDateFin);
		if(!this.dateControle()) {
			this.toast = this.toastService.voirToast("Choisissez une date entre le 01 juin au 15 Septembre!", false);
			return
		}
		this.toast = this.toastService.voirToast("Votre réservation est en cours de traitement !", true);
		// this.formulaireReservation.reset();
		
		// this.user.firstName = this.userForm.value.firstName;
		// this.user.lastName = this.userForm.value.lastName;
		// this.user.userType = this.userForm.value.userType;
		// this.user.startDate = this.parseDate(this.userForm.value.startDate);
		
		// this.save();

		// this.reservationService.ajoutReservation(reservation).subscribe({
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
	}

	get parasolForms() {
		return <FormArray>this.formulaireReservation.get('parasols')
	}

	addUmbrella() {
		let newCtrl = new FormControl(null);
		this.parasolForms.push(newCtrl);
		console.log(this.parasolForms.controls);
	}
}
