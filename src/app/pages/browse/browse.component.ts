import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {HeaderComponent} from '../../core/components/header/header.component';
import {AsyncPipe, NgOptimizedImage} from "@angular/common";
import {BannerComponent} from "../../core/components/banner/banner.component";
import {MovieService} from "../../shared/services/movie.service";
import {MovieCarousalComponent} from "../../shared/components/movie-carousal/movie-carousal.component";
import {IVideoContent} from "../../shared/models/video-content.interface";
import {forkJoin, map, Observable} from "rxjs";

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [HeaderComponent, NgOptimizedImage, BannerComponent, MovieCarousalComponent, AsyncPipe],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.scss'
})
export class BrowseComponent implements OnInit {
  auth = inject(AuthService)
  movieService = inject(MovieService)

  user_name = JSON.parse(sessionStorage.getItem('loggedInUser')!).name
  user_profileImg = JSON.parse(sessionStorage.getItem('loggedInUser')!).picture
  user_email = JSON.parse(sessionStorage.getItem('loggedInUser')!).email
  bannerDetail$ = new Observable<any>();
  bannerVideo$ = new Observable<any>();


  movies: IVideoContent[] = [];
  tvShows: IVideoContent[] = [];
  nowPlayingMovies: IVideoContent[] = [];
  popularMovies: IVideoContent[] = [];
  topRatedMovies: IVideoContent[] = [];
  upcomingMovies: IVideoContent[] = [];

  sources = [
    this.movieService.getMovies(),
    this.movieService.getTvShows(),
    this.movieService.getNowPlayingMovies(),
    this.movieService.getUpcomingMovies(),
    this.movieService.getPopularMovies(),
    this.movieService.getTopRated()
  ];

  ngOnInit() {
    // this
    //   .movieService
    //   .getMovies()
    //
    //   .subscribe(
    //     (res => {
    //       this.popularMovies = res.results
    //       console.log(res)
    //     }))
    forkJoin(this.sources).pipe(map(([movies, tvShows, nowPlaying, upcoming, popular, topRated])=> {
      this.bannerDetail$ = this.movieService.getBannerDetail(movies.results[1].id);
      this.bannerVideo$ = this.movieService.getBannerVideo(movies.results[1].id);

      return {movies, tvShows, nowPlaying, upcoming, popular, topRated}
    })).subscribe((res:any)=> {
      this.movies = res.movies.results as IVideoContent[];
      this.tvShows = res.tvShows.results as IVideoContent[];
      this.nowPlayingMovies = res.nowPlaying.results as IVideoContent[];
      this.upcomingMovies = res.upcoming.results as IVideoContent[];
      this.popularMovies = res.popular.results as IVideoContent[];
      this.topRatedMovies = res.topRated.results as IVideoContent[];
      // this.getMovieKey();
    })
  }
}
