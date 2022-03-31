import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MapModule } from '../map/map.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { UserInfoComponent } from './components/user-info/user-info.component';

@NgModule({
  declarations: [
    UserInfoComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    ReactiveFormsModule,
    MapModule,
    AppRoutingModule,
  ],
  exports: [
    UserInfoComponent,
  ],
  providers: [],
})
export class UserModule { }
