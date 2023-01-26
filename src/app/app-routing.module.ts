import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { DetailComponent } from './detail/detail.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ListeClientComponent } from './liste-client/liste-client.component';
import { ListeReservationComponent } from './liste-reservation/liste-reservation.component';
import { NonTrouveComponent } from './non-trouve/non-trouve.component';
import { PlanningComponent } from './planning/planning.component';
import { ReservationComponent } from './reservation/reservation.component';

const routes: Routes = [
	{path:"", component: AccueilComponent},
	{path:"connexion", component: ConnexionComponent},
	{path:"reservation", component: ReservationComponent},
	{path:"inscription", component: InscriptionComponent},
	{path:"liste-reservation", component: ListeReservationComponent},
	{path:"liste-client", component: ListeClientComponent},
	{path:"planning", component: PlanningComponent},
	{path:"detail", component: DetailComponent},
	{ path: '404', component: NonTrouveComponent },
 	{ path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
