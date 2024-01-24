import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from '../../../environments/environment';

const options = {
  params: {
    include_adult: 'true',
    include_video: 'true',
    language: 'en-US',
    page: 1,
    sort_by: 'popularity.desc'
  },
  headers: {
    accept: 'application/json',
    Authorization: environment.TMDB_AUTH_KEY
  }
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  http = inject(HttpClient)

  constructor() {
  }

  getMovies() {
    // const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
    const url = 'https://api.themoviedb.org/3/discover/movie';
    return this.http.get<any>(url, options)
  }
}
