import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieModel } from '../models/movies.model';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  endpoint: string = 'https://movies-896a0.firebaseio.com';

  constructor(private _http: HttpClient) {}

  createMovie(movie: MovieModel) {
    return this._http.post(`${this.endpoint}/movies.json`, movie).pipe(
      map((resp: any) => {
        movie.id = resp.name;
        return movie;
      })
    );
  }

  getAllMovies() {
    return this._http
      .get(`${this.endpoint}/movies.json`)
      .pipe(map(this.convertArray));
  }

  updateMovie(movie: MovieModel) {
    const movieTemp = {
      ...movie,
    };

    delete movieTemp.id;

    return this._http.put(
      `${this.endpoint}/movies/${movie.id}.json`,
      movieTemp
    );
  }

  deleteMovie(id: string) {
    return this._http.delete(`${this.endpoint}/movies/${id}.json`);
  }

  private convertArray(moviesObject: Object) {
    let arrMovies = [];
    if (moviesObject != null) {
      Object.keys(moviesObject).map((key) => {
        let movie: MovieModel = moviesObject[key];
        movie.id = key;
        arrMovies.push(movie);
      });
    }
    return arrMovies;
  }
}
