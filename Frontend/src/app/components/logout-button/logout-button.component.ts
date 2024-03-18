import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrl: './logout-button.component.css'
})
export class LogoutButtonComponent implements OnInit{
  userProfile: string | null = null;
  constructor(public auth: AuthService, @Inject(DOCUMENT) public document: Document) { }
  userEmail: string | null = null; 
  ngOnInit(): void {
    this.auth.user$.subscribe((profile) => {
      this.userProfile = JSON.stringify(profile, null, 2);
      const userProfileObject = profile as any; // Assuming profile is of type 'any' for simplicity
      this.userEmail = userProfileObject.email;
    });
   
  }

  logout(): void{
    this.auth.logout({ logoutParams: { returnTo: document.location.origin } })
  }
 
}
