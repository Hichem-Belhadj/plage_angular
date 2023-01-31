import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reservation } from '../models/reservation.model';
import { ReservationService } from '../services/reservation/reservation.service';
import { ToastService } from '../services/toast/toast.service';
import { UtilisateurService } from '../services/utilisateur/utilisateur.service';

@Component({
  selector: 'app-liste-reservation',
  templateUrl: './liste-reservation.component.html',
  styleUrls: ['./liste-reservation.component.css']
})
export class ListeReservationComponent {
	reservations: Reservation[] = [];
	estConcessionnaire: boolean = false;
	parametrePage = {
		page: 0,
		taille: 5,
		filtrerPar: "id",
		trierPar: "desc",
		pageCourante: 0,
		totalElements: 8,
    	totalPages: 1
	}
	
	constructor(
		private router: Router,
		private utilisateurService: UtilisateurService,
		private route: ActivatedRoute,
		private reservationService: ReservationService
	) {}

	ngOnInit() {
		this.route.queryParamMap.subscribe(p=>{
			this.parametrePage.page = p.get("page") != null ? +(p.get("page")!) : 0;
			this.parametrePage.taille = p.get("taille") != null ? +(p.get("taille")!) : this.parametrePage.taille;
			this.parametrePage.filtrerPar = p.get("filtrerPar") != null ? (p.get("filtrerPar")!) : this.parametrePage.filtrerPar;
			this.parametrePage.trierPar = p.get("trierPar") != null ? (p.get("trierPar")!) : this.parametrePage.trierPar;
		});
		this.reservationService.recupererReservations(
			this.parametrePage.page,
			this.parametrePage.taille,
			this.parametrePage.filtrerPar,
			this.parametrePage.trierPar,
			).subscribe({
			next: reponse => {
				this.definirListeReservations(reponse);
			}
		});
		this.mettreAJourUtilisateur();
	}

	pagination(pagination: any) {
		let page = pagination.page -1;
		let taille = this.parametrePage.taille;
		let filtrerPar = this.parametrePage.filtrerPar;
		let trierPar = this.parametrePage.trierPar;
		this.router.navigateByUrl(`liste-reservation?page=${page}&size=${taille}&sortBy=${filtrerPar}&orderBy=${trierPar}`)
		this.rafraichirPage(page, taille, filtrerPar, trierPar);
	}

	rafraichirPage(page: number, taille: number, filtrerPar: string, trierPar: string) {
		this.reservationService.recupererReservations(page, taille, filtrerPar, trierPar).subscribe({
			next: reponse => {
				this.parametrePage.page = page;
				this.parametrePage.taille = taille;
				this.parametrePage.filtrerPar = filtrerPar;
				this.parametrePage.trierPar = trierPar;
				this.definirListeReservations(reponse);
			},
			error: err=>{
				console.log(err);
				
			}
		});
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

	definirListeReservations(reponse: any) {
		this.reservations = reponse.locations;	
		this.parametrePage.pageCourante = reponse.pageCourante+1;
		this.parametrePage.totalElements = reponse.totalElements;
		this.parametrePage.totalPages = reponse.totalPages;
	}

	voirDetail(idReservation: number) {
		this.router.navigateByUrl(`/detail?idReservation=${idReservation}`)
	}
}
