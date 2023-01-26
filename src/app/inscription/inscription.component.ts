import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilService } from '../services/util/util.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {
	formulaireInscription: FormGroup = <FormGroup>{};

	constructor(
		public utilService: UtilService,
		private router: Router,
	) {}

	ngOnInit() {
		this.formulaireInscription = new FormGroup({
			nom: new FormControl('', [Validators.required]),
			prenom: new FormControl('', [Validators.required]),
			email: new FormControl('', [Validators.required, Validators.email]),
			pays: new FormControl('', [Validators.required]),
			lienDeParente: new FormControl('', [Validators.required]),
			motDePasse: new FormControl('', [Validators.required, Validators.minLength(8)])
		})
	}

	inscription() {
		this.router.navigateByUrl("/reservation");
	}
}
