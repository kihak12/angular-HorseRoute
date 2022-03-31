import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TrajetsListeComponent } from './components/trajets-liste/trajets-liste.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TrajetInfoComponent } from './components/trajet-info/trajet-info.component';
import { MapModule } from '../map/map.module';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [
    TrajetsListeComponent,
    TrajetInfoComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    ReactiveFormsModule,
    MapModule,
    AppRoutingModule,
  ],
  exports: [
    TrajetsListeComponent,
    TrajetInfoComponent,
  ],
  providers: [],
})
export class TrajetModule { }
