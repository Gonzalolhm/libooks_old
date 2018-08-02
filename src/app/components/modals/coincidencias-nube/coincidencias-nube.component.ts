import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { PeticionDBService } from '../../../services/peticion-db.service';
import { Libro } from '../../../classes/libro';

@Component({
  selector: 'app-coincidencias-nube',
  templateUrl: './coincidencias-nube.component.html',
  styles: []
})
export class CoincidenciasNubeComponent implements OnInit {

  @Input() titulo:string;

  libros:Libro[] = [];
  total:number = 0;

  constructor(private _peticion:PeticionDBService) {
  }

  ngOnInit() { }

  ngOnChanges( changes:SimpleChanges ){

    this.titulo = changes.titulo.currentValue;
    this._peticion.pedirNube(1, { query: this.titulo, precision: 'true' })
      .subscribe( res => {
        this.libros = res.lista;
        this.total = res.total;
      })

  }

}
