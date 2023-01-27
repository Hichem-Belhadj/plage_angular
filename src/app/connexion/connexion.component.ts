import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilService } from '../services/util/util.service';
import { UtilisateurService } from '../services/utilisateur/utilisateur.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {
	formulaireConnexion: FormGroup = <FormGroup>{};
	
	constructor(
		private utilisateurService: UtilisateurService,
		public utilService: UtilService,
		private router: Router,
	) {}

	ngOnInit() {
		this.formulaireConnexion = new FormGroup({
			email: new FormControl('', [Validators.required, Validators.email]),
			motDePasse: new FormControl('', [Validators.required]),
		})
	}

	connexion(){
		// this.user.firstName = this.formulaireConnexion.value.firstName;
		// this.user.lastName = this.formulaireConnexion.value.lastName;
		// this.user.userType = this.formulaireConnexion.value.userType;
		// this.user.startDate = this.parseDate(this.formulaireConnexion.value.startDate);
		
		// this.save();

		// this.utilisateurService.ajouterUtilisateur(2).subscribe({
		// 	next: response => {
		// 		if(response) {
		// 			this.updatePage(this.pageData.page, this.pageData.size, this.pageData.sortBy, this.pageData.orderBy);
		// 			this.toast = this.toastService.showToast(this.userToDelete.firstName + " has been removed from the database!", true);
		// 		} else {
		// 			this.toast = this.toastService.showToast("An error has occurred!", false);
		// 		}
		// 	},
		// 	error: err => {
		// 		console.log(err);
		// 		this.toast = this.toastService.showToast("An error has occurred!", false);
		// 	}
		// });
		this.router.navigateByUrl(`/liste-reservation`);
	}

}
