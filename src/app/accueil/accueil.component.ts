import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UtilisateurService } from '../services/utilisateur/utilisateur.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent {

	constructor(
		private router: Router,
		private utilisateurService: UtilisateurService,
	) {}

	redirection() {
		let lienRedirection: string = "/reservation";
		if (!this.utilisateurService.estConnecte()) {
			lienRedirection = "/connexion";
			localStorage.setItem("redirection", "reservation");
		}
		this.router.navigateByUrl(lienRedirection);
	}

}
