import { Component, OnInit, Input } from '@angular/core';
import { MovieModel } from 'src/app/models/movies.model';
import { NgForm } from '@angular/forms';
import { MoviesService } from 'src/app/services/movies.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  @Input() movie: MovieModel;
  loaded: boolean = false;

  constructor(private _movies: MoviesService) {}

  ngOnInit(): void {}

  saveInformation(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this._movies.updateMovie(this.movie).subscribe((resp) => {
      Swal.fire({
        title: 'guardado',
        text: `Película ${this.movie.name} ha sido actualizada.`,
        icon: 'success',
      }).then((clicked) => {
        location.reload();
      });
    });
  }
}
