import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {HeaderComponent} from '../../core/components/header/header.component';
import {AsyncPipe, NgOptimizedImage} from "@angular/common";
import {BannerComponent} from "../../core/components/banner/banner.component";
import {MovieService} from "../../shared/services/movie.service";
import {MovieCarousalComponent} from "../../shared/components/movie-carousal/movie-carousal.component";
import {IVideoContent} from "../../shared/models/video-content.interface";
import {forkJoin, map, Observable} from "rxjs";
import {RouterLink} from "@angular/router";
import {DataService} from "../../core/services/data.service";

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [HeaderComponent, NgOptimizedImage, BannerComponent, MovieCarousalComponent, AsyncPipe, RouterLink],
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

  navListIds: any[] = [];

  // @ViewChild('scrollToTopButton') scrollToTopButton!: ElementRef;
  @ViewChild('scrollToTopButton', {static: false}) scrollToTopButton!: ElementRef<HTMLButtonElement>;

  constructor(private dataService: DataService) {
  }

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
    this.dataService.dataArray$.subscribe((navListIds: any[]) => {
      this.navListIds = navListIds;
    });

    forkJoin(this.sources).pipe(map(([movies, tvShows, nowPlaying, upcoming, popular, topRated]) => {
      this.bannerDetail$ = this.movieService.getBannerDetail(movies.results[0].id);
      this.bannerVideo$ = this.movieService.getBannerVideo(movies.results[0].id);

      return {movies, tvShows, nowPlaying, upcoming, popular, topRated}
    })).subscribe((res: any) => {
      this.movies = res.movies.results as IVideoContent[];
      this.tvShows = res.tvShows.results as IVideoContent[];
      this.nowPlayingMovies = res.nowPlaying.results as IVideoContent[];
      this.upcomingMovies = res.upcoming.results as IVideoContent[];
      this.popularMovies = res.popular.results as IVideoContent[];
      this.topRatedMovies = res.topRated.results as IVideoContent[];
    })
  }

  scrollToTop(): void {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

}
