import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationComponent } from './navigation/navigation.component';
import { AccueilComponent } from './accueil/accueil.component';
import { NonTrouveComponent } from './non-trouve/non-trouve.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { ReservationComponent } from './reservation/reservation.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { PlanningComponent } from './planning/planning.component';
import { DetailComponent } from './detail/detail.component';
import { ListeClientComponent } from './liste-client/liste-client.component';
import { ListeReservationComponent } from './liste-reservation/liste-reservation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from './toast/toast.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    AccueilComponent,
    NonTrouveComponent,
    ConnexionComponent,
    ReservationComponent,
    InscriptionComponent,
    PlanningComponent,
    DetailComponent,
    ListeClientComponent,
    ListeReservationComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
	ReactiveFormsModule,
	FormsModule,
	HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
