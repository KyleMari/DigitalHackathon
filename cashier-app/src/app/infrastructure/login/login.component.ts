import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  ngOnInit() {
  }  

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
        this.router.navigate(['/navside']);
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
      })
    }else{
      console.log("Invalid eid");
      this.errorMessage = "The eid specified is not a valid eid";
    }
    
  }

  /*tryLogout(){
    this.authService.doLogout()
      .then(res => {
        this.router.navigate(['/login']);
      }, err => {
        console.log(err);
      })
  }*/

}


