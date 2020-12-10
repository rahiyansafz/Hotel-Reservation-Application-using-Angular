import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LfBootstrapThemeModule } from '@lightweightform/bootstrap-theme';
import {
  LfStorage,
  LfFileStorage,
  LfI18n,
  LfUnloadAlert,
  LfSerializer,
  LfJsonSerializer,
  LF_APP_SCHEMA,
  LF_APP_I18N
} from '@lightweightform/core';
import { appSchema } from './app.schema';
import { appI18n } from './app.i18n';
import { ReservationDetailsComponent } from './components/reservation-details/reservation-details.component';
import { GuestsComponent } from './components/guests/guests.component';
import { GuestComponent } from './components/guests/guest/guest.component';

@NgModule({
  declarations: [
    AppComponent,
    ReservationDetailsComponent,
    GuestsComponent,
    GuestComponent
  ],
  imports: [BrowserModule, AppRoutingModule, LfBootstrapThemeModule],
  providers: [
    LfStorage,
    LfFileStorage,
    LfI18n,
    LfUnloadAlert,
    { provide: LfSerializer, useClass: LfJsonSerializer },
    { provide: LF_APP_SCHEMA, useValue: appSchema },
    { provide: LF_APP_I18N, useValue: appI18n }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
