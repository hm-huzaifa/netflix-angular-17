declare var google: any

import {environment} from "../../../environments/environments";
import {Component, OnInit, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  private router = inject(Router)

  ngOnInit(): void {
    google.accounts.id.initialize({
    client_id: environment.GOOGLE_CLIENT_ID,
      callback: (response: any) => {
        console.log('response: ', response)
        this.handleLogin(response)
      }
    });

    google.accounts.id.renderButton(document.getElementById("google-btn"), {
      theme: 'filled_blue',
      size: 'large',
      shape: 'rectangle',
      width: 250
    });
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split(".")[1]))
  }
  handleLogin(response: any) {
    if (response) {
      // decode the token
      const payload = this.decodeToken(response.credential)
      // store in session
      sessionStorage.setItem('loggedInUser', JSON.stringify(payload))
      // navigate to home
      // this.router.navigate(['browse'])
      this.router.navigateByUrl('/browse')
    }
  }

}
