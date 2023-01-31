import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Parasol } from '../models/parasol.model';
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
	estConcessionnaire: boolean = false;
	listeParasols: any[] = [];
	listeParasolsFile: any = [];
	listeParasolsFile1: any = [];
	listeParasolsFile2: any = [];
	listeParasolsFile3: any = [];
	listeParasolsFile4: any = [];
	listeParasolsFile5: any = [];
	listeParasolsFile6: any = [];
	listeParasolsFile7: any = [];
	listeParasolsFile8: any = [];
	public toast = {
		show: false,
		class: "",
		message: ""
	}

	constructor(
		private reservationService: ReservationService,
		private utilisateurService: UtilisateurService,
		public modalService: NgbModal,
		private toastService: ToastService,
		private route: ActivatedRoute,
		private router: Router,
	) {}

	ngOnInit() {
		this.route.queryParamMap.subscribe(res=>{
			this.idReservation = res.get("idReservation") != null ? +(res.get("idReservation")!) : 0;
		});
		
		if (this.idReservation == 0) {
			this.router.navigateByUrl("/404");
		}
		this.mettreAJourUtilisateur();
		this.rafraichirPage();
	}

	definitListeParasolsparFile(noFile: any, idDepart: number, tableauDeFile: any[]) {
		tableauDeFile = [];
		for (let i=idDepart; i>idDepart-10; i--) {
			let file = this.listeParasolsFile[i][2];
			if (file == noFile) {
				tableauDeFile.push(this.listeParasolsFile[i]);
			}
		}
		this.listeParasols.push(tableauDeFile);
	}

	rafraichirPage() {
		this.reservationService.recupererReservationParId(this.idReservation).subscribe({
			next: reponse => {
				this.reservation = reponse;				
				if(this.estConcessionnaire && this.reservation.statut.nom=='à traiter') {
					this.recupererParasolsDisponibles();
				}
			},
			error: err=>{
				console.log(err);
			}
		});
	}

	recupererParasolsDisponibles() {
		this.reservationService.recupererParasolsDisponibles(this.reservation.dateHeureDebut!, this.reservation.dateHeureFin!).subscribe({
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
			error: err=>{
				console.log(err);
			}
		});
	}

	majReservation():boolean {
		this.reservationService.majStatutReservation(this.reservation).subscribe({
			next: response => {
				if(response) {
					this.reservation = response;
				} else {
					this.toast = this.toastService.voirToast("Une erreur est survenue !", false);
				}
			},
			error: err => {
				console.log(err);
				this.toast = this.toastService.voirToast("Une erreur est survenue !", false);
			}
		});
		return true;
	}
	
	mettreAJourUtilisateur() {
		this.utilisateurService.recupererUtilisateurCourantREST()?.subscribe({
			next: reponse => {
				this.estConcessionnaire = false;
				for (let role of reponse.roles) {
					if (role.name == 'ROLE_ADMIN') {
						this.estConcessionnaire = true;
						break;
					}
				}
			},
			error: err=> {
				console.log(err);
			}
		});
	}

	confirmerReservation(form: NgForm) {
		if( !form.valid ) {
			this.toast = this.toastService.voirToast("Veuillez affecter tous les parasols", false);
			return;
		}
		let conteneurParasol: any[] = <any[]>form.value;
		
		this.reservation.statut.id = 2;

		for (let key in conteneurParasol) {
			let parasol: Parasol = <Parasol>{};
			parasol.id = +conteneurParasol[key];
			this.reservation.parasols.push(parasol);
		}		
		
		if ( this.majReservation() ) {
			this.toast = this.toastService.voirToast("Cette réservation à bien été validée", true);
		}
	}

	refuserReservation() {
		this.modalService.dismissAll();
		this.reservation.statut.id = 3;
		
		if ( this.majReservation()) {
			this.toast = this.toastService.voirToast("Cette réservation à bien été refusée", true);
		}
	}

}
