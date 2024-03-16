import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrl: './login-button.component.css'
})
export class LoginButtonComponent implements OnInit{

  userProfile: any;

  constructor(public auth: AuthService) { }
  

  ngOnInit(): void {

 }

 getUserProfile(): void {
  
}


  handleLogin(): void{
    this.auth.loginWithRedirect();


  }


}


