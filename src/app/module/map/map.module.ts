import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SearchMapComponent } from './components/search-map/search-map.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [
    SearchMapComponent,
    SearchBarComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  exports: [
    SearchBarComponent
  ],
  providers: [],
})
export class MapModule { }
