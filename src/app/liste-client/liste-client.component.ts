import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../services/toast/toast.service';
import { UtilisateurService } from '../services/utilisateur/utilisateur.service';

@Component({
  selector: 'app-liste-client',
  templateUrl: './liste-client.component.html',
  styleUrls: ['./liste-client.component.css']
})
export class ListeClientComponent {
	public toast = {
		show: false,
		class: "",
		message: ""
	}

	constructor(
		private utilisateurService: UtilisateurService,
		public modalService: NgbModal,
		private toastService: ToastService
	) {}

	suprimerUtilisateur() {
		// this.utilisateurService.suprimerUtilisateur(2).subscribe({
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
		
		this.modalService.dismissAll();
		this.toast = this.toastService.voirToast("Le client à bien été supprimé", true);
	}
}
