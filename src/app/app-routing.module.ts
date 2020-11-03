import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GuardService } from './service/guard.service';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { DetailComponent } from './detail/detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountComponent } from './account/account.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [GuardService]},
  { path: 'detail/:id', component: DetailComponent, canActivate: [GuardService]},
  { path: 'favorite', component: FavoriteComponent, canActivate: [GuardService]},
  { path: 'account', component: AccountComponent, canActivate: [GuardService] },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
