import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MovieModel } from 'src/app/models/movies.model';
import { MoviesService } from 'src/app/services/movies.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
})
export class NewProductComponent implements OnInit {
  movie: MovieModel = new MovieModel();
  newMovie: boolean = true;
  constructor(private _movies: MoviesService) {}

  ngOnInit(): void {}

  updateForm(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // document.getElementById('auto-click').click();
    this._movies.createMovie(this.movie).subscribe((resp: MovieModel) => {
      this.newMovie = false;
      Swal.fire({
        title: `Película ${resp.name} creada`,
        text: 'Refresce la página para ver los cambios.',
        icon: 'success',
      });
    });
  }
}
