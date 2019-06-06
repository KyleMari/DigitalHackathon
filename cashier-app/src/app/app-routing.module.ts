import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { AboutComponent } from './component/about/about.component';
import { TransactionsComponent } from './component/transactions/transactions.component';
import { SettingsComponent } from './component/settings/settings.component';
import { NavsideComponent } from './component/navside/navside.component';

const routes: Route[] = [
  { path: 'about', component: AboutComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'navside', component: NavsideComponent},
  { path: '**', redirectTo: '/about' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
