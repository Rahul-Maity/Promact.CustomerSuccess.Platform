import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../../shared/auth.service';
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrl: './login-button.component.css'
})
export class LoginButtonComponent implements OnInit{





  constructor(public auth:AuthService,private http:HttpClient) { }
  

  ngOnInit(): void {
   
   

 }


  handleLogin(): void{
    this.auth.loginWithRedirect();


  }


 


}


