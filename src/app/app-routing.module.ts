import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrajetInfoComponent } from './module/trajet/components/trajet-info/trajet-info.component';
import { TrajetSearchComponent } from './module/trajet/components/trajet-search/trajet-search.component';
import { TrajetsListeComponent } from './module/trajet/components/trajets-liste/trajets-liste.component';
import { UserInfoComponent } from './module/user/components/user-info/user-info.component';

const routes: Routes = [
  { path: 'trajets', children: [
    { path: '', component: TrajetsListeComponent},
    { path: 'search', component: TrajetSearchComponent},
  ] },
  { path: 'trajets/:id', component: TrajetInfoComponent },
  { path: 'users/:id', component: UserInfoComponent },
  { path: '', redirectTo: '/trajets', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
