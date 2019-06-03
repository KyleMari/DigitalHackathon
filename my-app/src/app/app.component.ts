import { Component } from '@angular/core';
import { FirebaseService } from './service/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-app';

constructor(public firebaseService: FirebaseService){


}

testUser(){
  this.firebaseService.testPayment();
  this.firebaseService.testUserAdd();
  this.firebaseService.testRetrievePayment();
}

}
