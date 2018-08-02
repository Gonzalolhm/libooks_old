import { Component, OnInit } from '@angular/core';
import { PeticionDBService } from '../../services/peticion-db.service';
import { Libro } from '../../classes/libro';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-coleccion',
  templateUrl: './coleccion.component.html',
  styles: []
})
export class ColeccionComponent implements OnInit {

  contexto:string = "coleccion";

  total:number = 0;
  libros:Observable<Libro[]>;

  constructor(private _peticion:PeticionDBService) { }

  ngOnInit() {
    this._peticion.pedirColeccion().subscribe( libros => {
      this.total  = libros.total;
      this.libros = libros.lista;
    });
  }

}
