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

  constructor(private _movies: MoviesService) {}

  ngOnInit(): void {}

  updateForm(form: NgForm) {
    if (form.invalid) {
      Object.values(form.controls).forEach((control) =>
        control.markAsTouched()
      );
      return;
    }

    this._movies.createMovie(this.movie).subscribe((resp: MovieModel) => {
      Swal.fire({
        title: 'guardado',
        text: `Película ${resp.name} ha sido creado`,
        icon: 'success',
      }).then((clicked) => location.reload());
    });
  }
}
