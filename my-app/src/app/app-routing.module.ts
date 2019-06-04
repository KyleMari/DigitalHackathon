import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { UserComponent } from './user/user.component';

const  routes:  Routes  = [
  {
  path:  'user',
  component:  UserComponent,
  
      children: [
          { path:  'login',component:  LoginComponent}
      ]
    }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
