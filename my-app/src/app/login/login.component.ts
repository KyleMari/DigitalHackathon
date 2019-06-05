import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service'
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['',Validators.required]
    });
  }

  tryLogin(value){
    // validates eid string (makes sure that it is a valid eid)
    const regex = new RegExp("^[a-z.]+@accenture.com$");
    if (regex.test(value.email)){
      console.log("Valid eid: " + value.email);

      //proceeds to auth service
      this.authService.doLogin(value)
      .then(res => {
        this.router.navigate(['/user']);
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
      })
    }else{
      console.log("Invalid eid");
      this.errorMessage = "The eid specified is not a valid eid";
    }
  }
}
