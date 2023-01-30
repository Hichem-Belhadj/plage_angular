import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast/toast.service';
import { UtilService } from '../services/util/util.service';
import { UtilisateurService } from '../services/utilisateur/utilisateur.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {
	formulaireConnexion: FormGroup = <FormGroup>{};
	redirection: boolean = localStorage.getItem("redirection") == "reservation";
	utilisateur: any = {
		email: "",
		motDePasse: "",
		estConnecte: false
	};
	public toast = {
		show: false,
		class: "",
		message: ""
	};
	
	constructor(
		private utilisateurService: UtilisateurService,
		public utilService: UtilService,
		private router: Router,
		private toastService: ToastService
	) {}

	ngOnInit() {
		this.formulaireConnexion = new FormGroup({
			email: new FormControl('', [Validators.required, Validators.email]),
			motDePasse: new FormControl('', [Validators.required])
		})
		this.utilisateurService.emetteurDonees.subscribe((reponse: any)=> {
			if (reponse.refresh) {				
				this.redirection = localStorage.getItem("redirection") ? true: false;
			}
		})
	}

	connexion() {
		this.utilisateur.email = this.formulaireConnexion.value.email;
		this.utilisateur.motDePasse = this.formulaireConnexion.value.motDePasse;

		this.utilisateurService.connexion(this.utilisateur).subscribe({
			next: reponse => {
				if(reponse) {
					localStorage.setItem('access_token', reponse.access_token);
					localStorage.setItem('expire_at', reponse.expire_at);
					this.utilisateur.estConnecte = this.utilisateurService.estConnecte;
					this.utilisateurService.emissionDeDonees({refresh: true});
					let redirection = this.redirection ? "/reservation" : "/liste-reservation";
					localStorage.removeItem("redirection");
					this.router.navigateByUrl(redirection);
				} else {
					this.toast = this.toastService.voirToast("Une erreur est survenue !", false);
				}
			},
			error: err => {
				console.log(err);
				this.toast = this.toastService.voirToast("Une erreur est survenue !", false);
			}
		});
	}

}
