import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCalendar, NgbAlertModule, NgbDatepickerModule, NgbDateParserFormatter, NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
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
	date: any;
	listeParasolsFile: any = [];
	listeParasolsFile1: any = [];
	listeParasolsFile2: any = [];
	listeParasolsFile3: any = [];
	listeParasolsFile4: any = [];
	listeParasolsFile5: any = [];
	listeParasolsFile6: any = [];
	listeParasolsFile7: any = [];
	listeParasolsFile8: any = [];
	listeParasols: any = [];

	constructor(
		private router: Router,
		private reservationService: ReservationService,
		private calendar: NgbCalendar
	) {}
	
	definitListeParasolsparFile(noFile: any, idDepart: number, tableauDeFile: any[]) {
		let emptyCase = false
		tableauDeFile = [];
		for (let i=idDepart; i>idDepart-10; i--) {
			let file = this.listeParasolsFile[i][1];
			if(i==idDepart-6 && !emptyCase) {
				tableauDeFile.push({});
				emptyCase = true;
				i++
				continue
			}
			if (file == noFile) {
				tableauDeFile.push(this.listeParasolsFile[i]);
			}
		}
		this.listeParasols.push(tableauDeFile);
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
		return yyyy + '-' + mm + '-' + dd + ' 00:00';
	}

	ngOnInit() {
		this.model = this.calendar.getToday();
		this.date = this.transformerDate(this.calendar.getToday());
		console.log(this.date)
		this.rafraichirPlanning();
	}

	rafraichirPlanning() {
		this.reservationService.recupererListeParasols(this.date).subscribe({
			next: reponse => {
				this.listeParasols = [];
				this.listeParasolsFile = reponse;				
				this.definitListeParasolsparFile(1, 9, this.listeParasolsFile1);
				this.definitListeParasolsparFile(2, 18, this.listeParasolsFile2);
				this.definitListeParasolsparFile(3, 27, this.listeParasolsFile3);
				this.definitListeParasolsparFile(4, 36, this.listeParasolsFile4);
				this.definitListeParasolsparFile(5, 45, this.listeParasolsFile5);
				this.definitListeParasolsparFile(6, 54, this.listeParasolsFile6);
				this.definitListeParasolsparFile(7, 63, this.listeParasolsFile7);
				
			},
			error: err => {
				console.log(err);
			}
		})
	}

	onDateSelect(d: any) {
		this.date = this.transformerDate(d);
		this.rafraichirPlanning();
	}

	voirDetail(idReservation: number) {
		if(idReservation==null) return;
		this.router.navigateByUrl(`/detail?idReservation=${idReservation}`)
	}
}
