import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private http: HttpClient,public auth:AuthService) { }


  register():void {
    this.http.post<any>('https://localhost:44347/api/account/login',{}).subscribe(
      Response => {
        window.location.href = Response.RedirectUrl;
      },
      error => {
        console.error('Error:', error);
      }
    )

  }
  
}
