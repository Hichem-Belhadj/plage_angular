import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LienDeParente } from '../models/lienDeParente.model';
import { Pays } from '../models/pays.model';
import { Utilisateur } from '../models/utilisateur.model';
import { ToastService } from '../services/toast/toast.service';
import { UtilService } from '../services/util/util.service';
import { UtilisateurService } from '../services/utilisateur/utilisateur.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {
	formulaireInscription: FormGroup = <FormGroup>{};
	locataire: Utilisateur = <Utilisateur>{};
	lienDeParente: LienDeParente[] = [];
	listePays: Pays[] = [];
	public toast = {
		show: false,
		class: "",
		message: ""
	}

	constructor(
		public utilService: UtilService,
		public utilisateurService: UtilisateurService,
		private router: Router,
		private toastService:ToastService
	) {}

	ngOnInit() {
		this.formulaireInscription = new FormGroup({
			nom: new FormControl('', [Validators.required]),
			prenom: new FormControl('', [Validators.required]),
			email: new FormControl('', [Validators.required, Validators.email]),
			pays: new FormControl('', [Validators.required]),
			lienDeParente: new FormControl('', [Validators.required]),
			motDePasse: new FormControl('', [Validators.required, Validators.minLength(8)])
		});
		this.recupererLienDeParente()
		this.recupererListePays()
	}

	recupererLienDeParente() {
		this.utilisateurService.recupererLienDeParente().subscribe({
			next: reponse => {
				this.lienDeParente = reponse;
			},
			error: err => {
				console.log(err);
			}
		})
	}

	recupererListePays() {
		this.utilisateurService.recupererListePays().subscribe({
			next: reponse => {
				this.listePays = reponse;
			},
			error: err => {
				console.log(err);
			}
		})
	}

	inscription() {
		this.locataire.pays = {code: "",nom: ""};
		this.locataire.lienDeParente = {nom:"", coefficient:""};

		this.locataire.nom = this.formulaireInscription.value.nom;
		this.locataire.prenom = this.formulaireInscription.value.prenom;
		this.locataire.email = this.formulaireInscription.value.email;
		this.locataire.pays.code = this.formulaireInscription.value.pays;
		this.locataire.lienDeParente.id = this.formulaireInscription.value.lienDeParente;
		this.locataire.motDePasse= this.formulaireInscription.value.motDePasse;
		this.utilisateurService.enregistrerLocataire(this.locataire).subscribe({
			next: reponse => {
				console.log(reponse);
				this.router.navigateByUrl("/connexion");
			},
			error: err => {
				console.log(err);
				this.toast = this.toastService.voirToast("Une erreur est survenue !", false);
			}
		});
		// this.router.navigateByUrl("/reservation");
	}
}
