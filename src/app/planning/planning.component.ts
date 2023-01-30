import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDateParserFormatter, NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CustomDateParserFormatter, CustomDatepickerI18n } from '../services/BSLocal/bslocal.service';
import { ReservationService } from '../services/reservation/reservation.service';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css'],
  providers: [
	{ provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n },
	{ provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
]
})
export class PlanningComponent {
	model: NgbDateStruct | undefined;
	dateDuJour: string = this.recupererDateDuJour();
	listeParasolsFile: any = [
		null, null, null
	];
	listeParasolsFile1: any = [];
	listeParasolsFile2: any = [];
	listeParasolsFile3: any = [];
	listeParasolsFile4: any = [];
	listeParasolsFile5: any = [];
	listeParasolsFile6: any = [];
	listeParasolsFile7: any = [];

	constructor(
		private router: Router,
		private reservationService: ReservationService
	) {}

	recupererDateDuJour() {
		let auj = new Date(),
			dd: any = auj.getDate(),
			mm: any = auj.getMonth() + 1,
			yyyy: any = auj.getFullYear();
		if (dd < 10) {
			dd = '0' + dd;
		}
		if (mm < 10) {
			mm = '0' + mm;
		}
		return yyyy + '-' + mm + '-' + dd;
	}
	
	defunutListeParasolsparFile(file:any) {

		for (let i=0; i<8;i++) {
			for (let location of this.listeParasolsFile ) {
				if(!location.parasols.length) continue;
				for (let parasol of location.parasols) {
					if( parasol.numEmplacement !=  i+1) continue;
					this.listeParasolsFile1[i] = parasol;
					this.listeParasolsFile1[i]["res"] = location.id;
					break;
				}
			}
		}

		console.log(this.listeParasolsFile1);
		
	}

	ngOnInit() {		
		this.reservationService.recupererListeParasols("2023-08-15").subscribe({
			next: reponse => {
				// this.formatageListeParasol(reponse);
				console.log(reponse);
				this.listeParasolsFile = reponse;
				this.defunutListeParasolsparFile(1)
			},
			error: err => {
				console.log(err);
			}
		})
	}

	voirDetail(idReservation: number) {
		this.router.navigateByUrl(`/detail?idReservation=${idReservation}`)
	}
}
