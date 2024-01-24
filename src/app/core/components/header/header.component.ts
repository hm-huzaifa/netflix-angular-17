import {Component, inject, Input, input} from '@angular/core';
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {AuthService} from "../../../shared/services/auth.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  auth = inject(AuthService)

  @Input({required: true}) user_profileImg: string = ''
  @Input({required: true}) user_name: string = ''
  navList = ["Home", "TV Shows", "News & Popular", "My List", "Browse by Language"]

  signOut() {
    sessionStorage.removeItem('loggedInUser')
    this.auth.signOut()
  }
}
