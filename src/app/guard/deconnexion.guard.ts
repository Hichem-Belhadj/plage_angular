import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilisateurService } from '../services/utilisateur/utilisateur.service';

@Injectable({
  providedIn: 'root'
})
export class DeconnexionGuard implements CanActivate {

	constructor(
		private utilisateurService: UtilisateurService,
		private router: Router
	) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
			let token = localStorage.getItem('access_token');
			if (this.utilisateurService.estConnecte()) {
				this.router.navigateByUrl('/404');
				return false;
			}
			else {
				return true;
			}
	}
  
}
