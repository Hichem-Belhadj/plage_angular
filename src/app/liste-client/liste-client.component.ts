import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Utilisateur } from '../models/utilisateur.model';
import { ToastService } from '../services/toast/toast.service';
import { UtilisateurService } from '../services/utilisateur/utilisateur.service';

@Component({
  selector: 'app-liste-client',
  templateUrl: './liste-client.component.html',
  styleUrls: ['./liste-client.component.css']
})
export class ListeClientComponent {
	locataires: Utilisateur[] = [];
	idLocataireASupprimer: number = <number>{};
	nomLocataireASupprimer: string = <string>{};
	pays: string = "";
	parametrePage = {
		page: 0,
		taille: 5,
		filtrerPar: "id",
		trierPar: "desc",
		pageCourante: 0,
		totalElements: 8,
    	totalPages: 1
	}
	public toast = {
		show: false,
		class: "",
		message: ""
	}

	constructor(
		private utilisateurService: UtilisateurService,
		public modalService: NgbModal,
		private router: Router,
		private route: ActivatedRoute,
		private toastService: ToastService
	) {}

	ngOnInit() {
		this.route.queryParamMap.subscribe(p=>{
			this.parametrePage.page = p.get("page") != null ? +(p.get("page")!) : 0;
			this.parametrePage.taille = p.get("taille") != null ? +(p.get("taille")!) : this.parametrePage.taille;
			this.parametrePage.filtrerPar = p.get("filtrerPar") != null ? (p.get("filtrerPar")!) : this.parametrePage.filtrerPar;
			this.parametrePage.trierPar = p.get("trierPar") != null ? (p.get("trierPar")!) : this.parametrePage.trierPar;
		});
		this.rafraichirPage(this.parametrePage.page, this.parametrePage.taille, this.parametrePage.filtrerPar, this.parametrePage.trierPar);
		this.utilisateurService.recupererLocataires(
			this.parametrePage.page,
			this.parametrePage.taille,
			this.parametrePage.filtrerPar,
			this.parametrePage.trierPar,
			).subscribe({
			next: reponse => {
				this.definirListeLocataire(reponse);
			}
		});
	}

	trierTableau(champ: string) {
		this.route.queryParamMap.subscribe(p=>{
			this.parametrePage.trierPar = p.get("trierPar") != null ? (p.get("trierPar")!) : this.parametrePage.trierPar;
		});
		let page = this.parametrePage.page,
			taille = this.parametrePage.taille,
			filtrerPar = champ,
			trierPar = this.parametrePage.trierPar == "asc" ? "desc": "asc";
		this.router.navigateByUrl(`liste-client?page=${page}&taille=${taille}&filtrerPar=${filtrerPar}&trierPar=${trierPar}`)
		this.rafraichirPage( page, taille, champ, trierPar );
	}

	pagination(pagination: any) {
		this.pays= "";
		let page = pagination.page -1;
		let taille = this.parametrePage.taille;
		let filtrerPar = this.parametrePage.filtrerPar;
		let trierPar = this.parametrePage.trierPar;
		this.router.navigateByUrl(`liste-client?page=${page}&size=${taille}&sortBy=${filtrerPar}&orderBy=${trierPar}`)
		this.rafraichirPage(page, taille, filtrerPar, trierPar);
	}

	definirListeLocataire(reponse: any) {
		this.locataires = [];
		for (let locataire of reponse.locataires) {
			locataire[0]["pays"] = locataire[1];
			this.locataires.push(locataire[0]);
		}		
		this.parametrePage.pageCourante = reponse.pageCourante+1;
		this.parametrePage.totalElements = reponse.totalElements;
		this.parametrePage.totalPages = reponse.totalPages;
	}

	rafraichirPage(page: number, taille: number, filtrerPar: string, trierPar: string, pays?: string) {
		this.utilisateurService.recupererLocataires(page, taille, filtrerPar, trierPar, pays).subscribe({
			next: reponse => {
				this.parametrePage.page = page;
				this.parametrePage.taille = taille;
				this.parametrePage.filtrerPar = filtrerPar;
				this.parametrePage.trierPar = trierPar;
				this.definirListeLocataire(reponse);
			}
		});
	}

	suprimerUtilisateur() {
		this.modalService.dismissAll();
		this.utilisateurService.suprimerUtilisateur(this.idLocataireASupprimer).subscribe({
			next: reponse => {
				if (reponse) {					
					this.rafraichirPage(
						this.parametrePage.page,
						this.parametrePage.taille,
						this.parametrePage.filtrerPar,
						this.parametrePage.trierPar
					);
					this.toast = this.toastService.voirToast(this.nomLocataireASupprimer + " a bien été supprimé !", true);
				} else {
					this.toast = this.toastService.voirToast("Ce locataire de peut pas être supprimé !", false);
				}
			},
			error: err => {
				console.log(err);
				this.toast = this.toastService.voirToast("Une erreur est survenue!", false);
			}
		});
	}

	definirUtilisateurASupprimer(id: number, modal: any, nom: String, prenom: String) {
		this.idLocataireASupprimer = id;
		this.nomLocataireASupprimer = `${prenom} ${nom}`;
		this.modalService.open(modal);
	}

	filtrerParPays(pays: string) {
		let page = this.parametrePage.page;
		let taille = this.parametrePage.taille;
		let filtrerPar = this.parametrePage.filtrerPar;
		let trierPar = this.parametrePage.trierPar;
		this.router.navigateByUrl(`liste-client?page=${page}&size=${taille}&sortBy=${filtrerPar}&orderBy=${trierPar}&valeur=${pays}`)
		this.rafraichirPage(page, taille, filtrerPar, trierPar, pays);
	}
}
