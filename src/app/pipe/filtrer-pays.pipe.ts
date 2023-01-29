import { Pipe, PipeTransform } from '@angular/core';
import { Pays } from '../models/pays.model';
import { Utilisateur } from '../models/utilisateur.model';
import { UtilisateurService } from '../services/utilisateur/utilisateur.service';

@Pipe({
  name: 'filtrerPays'
})
export class FiltrerPaysPipe implements PipeTransform {
	transform(utilisateur: Utilisateur[], pays: string): Utilisateur[] {
		if (!pays) {
			return utilisateur;
		}

		return utilisateur.filter(item => {
			return item.pays.nom.toUpperCase().indexOf(pays.toUpperCase())  !== -1
		});
	}

}
