import { Component, OnInit } from '@angular/core';
import { MovieModel } from 'src/app/models/movies.model';
import { MoviesService } from 'src/app/services/movies.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
})
export class ListProductsComponent implements OnInit {
  movies: MovieModel[];

  constructor(private _movies: MoviesService) {}

  ngOnInit(): void {
    this._movies.getAllMovies().subscribe((resp) => (this.movies = resp));
  }

  deleteMovie(movie: MovieModel, i: number) {
    Swal.fire({
      title: 'Confirmación',
      text: `Desea eliminar la película "${movie.name}"?`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    }).then((resp) => {
      if (resp.value) {
        this.movies.splice(i, 1);
        this._movies.deleteMovie(movie.id).subscribe();
      }
    });
  }
}
