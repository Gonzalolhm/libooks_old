import { Component, OnInit } from '@angular/core';
import { PeticionDBService } from '../../services/peticion-db.service';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-ordenar-nube',
  templateUrl: './ordenar-nube.component.html',
  styles: []
})
export class OrdenarNubeComponent implements OnInit {

  filtros:FormGroup;

  ordenes:Object[] = [
    { value: 'fecha_creacion|DESC', name: 'Últimos añadidos' },
    { value: 'titulo|ASC', name: 'Título (A - Z)' },
    { value: 'putuacion|DESC', name: 'Mejor valorados' },
  ];

  constructor(private _peticion:PeticionDBService,
              private fb:FormBuilder) {
    this.filtros = this.fb.group({
      orden: 'fecha_creacion|DESC'
    })
  }

  ngOnInit() {
  }

}
