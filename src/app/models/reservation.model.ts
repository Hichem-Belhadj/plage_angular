import { Utilisateur } from "./utilisateur.model";

export class Reservation {
	id: number = <number>{};
  	remarque: String = <String>{};
  	montantARegler: number = <number>{};
  	dateHeureDebut: string|null = <string>{};
  	dateHeureFin: string|null = <string>{};
	locataire: Utilisateur = <Utilisateur>{};
	statut: any;
}