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

	transformerDate(date: any) {
		let dd: any = date.day,
			mm: any = date.month,
			yyyy: any = date.year;
		if (dd < 10) {
			dd = '0' + dd;
		}
		if (mm < 10) {
			mm = '0' + mm;
		}
		// 2023-06-20 14:24:34.395
		return yyyy + '-' + mm + '-' + dd + 'T00:00';
	}

	reserver(){
		const donnees = {
			listeFiles: this.formulaireReservation.value.parasols,
			dateHeureDebut: this.transformerDate(this.formulaireReservation.value.modelDateDebut),
			dateHeureFin: this.transformerDate(this.formulaireReservation.value.modelDateFin),
			remarques: this.formulaireReservation.value.remarques
		}
		donnees.listeFiles.unshift(this.formulaireReservation.value.parasol2);
		donnees.listeFiles.unshift(this.formulaireReservation.value.parasol1);
		console.log(donnees);
		if(!this.dateControle()) {
			this.toast = this.toastService.voirToast("Choisissez une date entre le 01 juin au 15 Septembre!", false);
			return
		}
		this.reservationService.ajoutReservation(donnees).subscribe({
			next: response => {
				if(response) {
					console.log(response);
					this.toast = this.toastService.voirToast("Votre réservation est en cours de traitement !", true);
					this.formulaireReservation.reset();
				} else {
					this.toast = this.toastService.voirToast("Une erreur est survenue !!", false);
				}
			},
			error: err => {
				console.log(err);
				this.toast = this.toastService.voirToast("Une erreur est survenue !", false);
			}
		});
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
