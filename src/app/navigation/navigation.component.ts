import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Utilisateur } from '../models/utilisateur.model';
import { UtilisateurService } from '../services/utilisateur/utilisateur.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
	estConnecte: boolean = this.utilisateurService.estConnecte();
	utilisateurCourant: Utilisateur = <Utilisateur>{};
	estConcessionnaire: boolean = false;

	constructor(
		private utilisateurService: UtilisateurService,
		private router: Router
	) {}

	ngOnInit() {
		this.utilisateurService.emetteurDonees.subscribe((response: any) => {
			if (response.refresh) {
				this.estConnecte = this.utilisateurService.estConnecte();
				this.mettreAJourUtilisateur();
			}
	   });
	   this.mettreAJourUtilisateur();
	}

	mettreAJourUtilisateur() {
		if (this.estConnecte) {
			this.utilisateurService.recupererUtilisateurCourantREST()?.subscribe({
				next: reponse => {
					this.utilisateurCourant = reponse;
					for (let role of this.utilisateurCourant.roles) {
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
	}

	connexion() {
		localStorage.removeItem("redirection");
		this.utilisateurService.emissionDeDonees({refresh: true});
		this.router.navigateByUrl('/connexion');
	}

	deconnexion() {
		this.utilisateurService.deconnexion();
		this.estConnecte= this.utilisateurService.estConnecte();
		this.router.navigateByUrl('/');
	}
}
