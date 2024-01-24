import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {HeaderComponent} from '../../core/components/header/header.component';
import {NgOptimizedImage} from "@angular/common";
import {BannerComponent} from "../../core/components/banner/banner.component";
import {MovieService} from "../../shared/services/movie.service";
import {MovieCarousalComponent} from "../../shared/components/movie-carousal/movie-carousal.component";
import {IVideoContent} from "../../shared/models/video-content.interface";

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [HeaderComponent, NgOptimizedImage, BannerComponent, MovieCarousalComponent],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.scss'
})
export class BrowseComponent implements OnInit {
  auth = inject(AuthService)
  movieService = inject(MovieService)

  user_name = JSON.parse(sessionStorage.getItem('loggedInUser')!).name
  user_profileImg = JSON.parse(sessionStorage.getItem('loggedInUser')!).picture
  user_email = JSON.parse(sessionStorage.getItem('loggedInUser')!).email

  popularMovies: IVideoContent[] = []

  ngOnInit
  () {
    this
      .movieService
      .getMovies()

      .subscribe(
        (res => {
          this.popularMovies = res.results
          console.log(res)
        }))
  }

  signOut() {
    sessionStorage.removeItem('loggedInUser')
    this.auth.signOut()
  }
}
