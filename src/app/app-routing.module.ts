import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { DetailComponent } from './detail/detail.component';
import { ConcessionnaireGuard } from './guard/concessionnaire.guard';
import { ConnexionGuard } from './guard/connexion.guard';
import { DeconnexionGuard } from './guard/deconnexion.guard';
import { InscriptionComponent } from './inscription/inscription.component';
import { ListeClientComponent } from './liste-client/liste-client.component';
import { ListeReservationComponent } from './liste-reservation/liste-reservation.component';
import { NonTrouveComponent } from './non-trouve/non-trouve.component';
import { PlanningComponent } from './planning/planning.component';
import { ReservationComponent } from './reservation/reservation.component';

const routes: Routes = [
	{path:"", component: AccueilComponent},
	{path:"connexion", component: ConnexionComponent, canActivate: [DeconnexionGuard]},
	{path:"reservation", component: ReservationComponent, canActivate: [ConnexionGuard]},
	{path:"inscription", component: InscriptionComponent, canActivate: [DeconnexionGuard]},
	{path:"liste-reservation", component: ListeReservationComponent, canActivate: [ConnexionGuard]},
	{path:"liste-client", component: ListeClientComponent, canActivate: [ConnexionGuard, ConcessionnaireGuard]},
	{path:"planning", component: PlanningComponent, canActivate: [ConnexionGuard, ConcessionnaireGuard]},
	{path:"detail", component: DetailComponent, canActivate: [ConnexionGuard]},
	{path: '404', component: NonTrouveComponent},
 	{path: '**', redirectTo: '404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
