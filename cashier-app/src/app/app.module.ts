import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './component/about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SettingsComponent } from './component/settings/settings.component';
import { TransactionsComponent } from './component/transactions/transactions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { NavsideComponent } from './component/navside/navside.component';
import { LoginComponent } from './infrastructure/login/login.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctionsModule } from '@angular/fire/functions'
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    SettingsComponent,
    TransactionsComponent,
    NavsideComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    AppRoutingModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AngularFireFunctionsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
