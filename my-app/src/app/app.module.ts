import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCgnj2hpqpp15rsluBSx9SHfqbMLAKyL1M",
    authDomain: "angular-cashier-app.firebaseapp.com",
    databaseURL: "https://angular-cashier-app.firebaseio.com",
    projectId: "angular-cashier-app",
    storageBucket: "angular-cashier-app.appspot.com",
    messagingSenderId: "755750908137",
    appId: "1:755750908137:web:4b37acc3e8e4635a"
};

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
