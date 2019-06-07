import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navside',
  templateUrl: './navside.component.html',
  styleUrls: ['./navside.component.scss']
})
export class NavsideComponent implements OnInit {


  ngOnInit() {
    this.router.navigate(['/navside/about']);
  }

  constructor(private router : Router) { 
    
  }


}
