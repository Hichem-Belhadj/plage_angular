import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { UtilisateurService } from '../services/utilisateur/utilisateur.service';

@Injectable({
  providedIn: 'root'
})
export class LocataireGuard implements CanActivate {
	constructor(
		private utilisateurService: UtilisateurService,
		private router: Router
	) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
			let roles: any;
			let estLocataire: boolean = true
			return this.utilisateurService.recupererUtilisateurCourantREST().pipe(
				map( reponse => {
					roles = reponse.roles;

					for (let role of roles) {
						if (role.name == 'ROLE_ADMIN') {
							estLocataire = false;
							break;
						}
					}
					
					return estLocataire;
				}),
				catchError(() => {
					this.router.navigateByUrl('/404');
					return of(false);
				})
			)
	}
  
}
