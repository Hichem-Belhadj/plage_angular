import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lettreCapitale'
})
export class LettreCapitalePipe implements PipeTransform {

  transform(value: any): unknown {
	while(!value.prenom) {
		return "";
	}
	let prenom = value.prenom[0].toUpperCase() + value.prenom.slice(1).toLowerCase();
	let nom = value.nom.toUpperCase();
    return `${prenom} ${nom}`;
  }

}
