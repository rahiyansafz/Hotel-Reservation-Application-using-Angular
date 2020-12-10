import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  LfRouter,
  LF_ROUTER_BASE_PATH,
  LF_I18N_LANGUAGE_QUERY_PARAM,
  LfRoutes
} from '@lightweightform/core';
import { ReservationDetailsComponent } from './components/reservation-details/reservation-details.component';
import { GuestsComponent } from './components/guests/guests.component';
import { GuestComponent } from './components/guests/guest/guest.component';

const routes: LfRoutes = [
  { path: '', redirectTo: 'reservation-details', pathMatch: 'full' },
  { path: 'reservation-details', component: ReservationDetailsComponent },
  { path: 'guests', component: GuestsComponent },
  { path: 'guests/:guest-id', component: GuestComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    LfRouter,
    { provide: LF_ROUTER_BASE_PATH, useValue: '/' },
    { provide: LF_I18N_LANGUAGE_QUERY_PARAM, useValue: 'l' }
  ]
})
export class AppRoutingModule {}
