import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { AboutComponent } from './component/about/about.component';
import { TransactionsComponent } from './component/transactions/transactions.component';
import { SettingsComponent } from './component/settings/settings.component';
import { NavsideComponent } from './component/navside/navside.component';
import { LoginComponent } from './infrastructure/login/login.component';


const routes: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: 'navside', component: NavsideComponent,
    children: [
    { path: 'transactions', component: TransactionsComponent },
    { path: 'about', component: AboutComponent },
    { path: 'settings', component: SettingsComponent }
  ]
  },
  { path: '**', redirectTo: '/login' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
