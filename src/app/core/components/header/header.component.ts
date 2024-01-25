import {Component, inject, Input, OnInit} from '@angular/core';
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {AuthService} from "../../../shared/services/auth.service";
import {Router, RouterLink} from "@angular/router";
import {DataService} from "../../services/data.service";


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  router = inject(Router);
  @Input({required: true}) user_profileImg: string = ''
  @Input({required: true}) user_name: string = ''
  navList = ["Home", "TV Shows", "Now Playing Movies", "Popular Movies", "Top Rated Movies", "Upcoming Movies"]
  navListIds = ["Home", "TV-Shows", "Now-Playing-Movies", "Popular-Movies", "Top-Rated-Movies", "Upcoming-Movies"]
  navListWithDash = this.navList.map(item => item.replace(/ /g, '-'));

  auth = inject(AuthService)

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.setDataArray(this.navListIds);
  }

  signOut() {
    sessionStorage.removeItem('loggedInUser')
    this.auth.signOut()
  }

  scrollToSection(fragment: string): void {
    // Scroll to the specified section using Angular Router
    this.router.navigate([], {fragment}).then(() => {
      const element = document.getElementById(fragment);
      if (element) {
        element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
      }
    });
  }

}
