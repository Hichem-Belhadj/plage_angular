import { LienDeParente } from "./lienDeParente.model";
import { Pays } from "./pays.model";

export class Utilisateur {
	[x: string]: any;
	id: number = <number>{};
  	nom: String = <String>{};
  	prenom: String = <String>{};
  	email: String = <String>{};
  	motDePasse: String = <String>{};
  	numeroDeTelephone: String = <String>{};
  	startDate: string|null = <string>{};
	roles: any[] = <any[]>{};
	pays: Pays = <Pays>{};
	lienDeParente: LienDeParente = <LienDeParente>{};
	dateHeureInscription: string = <string>{};
}