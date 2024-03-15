import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrl: './logout-button.component.css'
})
export class LogoutButtonComponent implements OnInit{
  constructor(public auth:AuthService,@Inject(DOCUMENT) public document: Document) {}
  ngOnInit(): void {
  
  }

  logout(): void{
    this.auth.logout({ logoutParams: { returnTo: document.location.origin } })
  }
}
