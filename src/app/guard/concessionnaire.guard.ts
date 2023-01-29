import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { UtilisateurService } from '../services/utilisateur/utilisateur.service';

@Injectable({
  providedIn: 'root'
})
export class ConcessionnaireGuard implements CanActivate {
	roles: any;
	estConcessionnaire: boolean = false;

	constructor(
		private utilisateurService: UtilisateurService,
		private router: Router
	) {}
	
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

		let roles: any;
		let estConcessionnaire: boolean = false
		return this.utilisateurService.recupererUtilisateurCourantREST().pipe(
			map( reponse => {
				roles = reponse.roles;

				for (let role of roles) {
					if (role.name == 'ROLE_ADMIN') {
						estConcessionnaire = true;
						break;
					}
				}
				
				return estConcessionnaire;
			}),
			catchError(() => {
				this.router.navigateByUrl('/404');
				return of(false);
			})
		)
	}
  
}
