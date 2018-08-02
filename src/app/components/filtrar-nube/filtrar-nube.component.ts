import { Component, OnInit } from '@angular/core';
import { PeticionDBService } from '../../services/peticion-db.service';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filtrar-nube',
  templateUrl: './filtrar-nube.component.html',
  styles: []
})
export class FiltrarNubeComponent implements OnInit {

  contexto:string = "filtrar-nube";
  cargando:boolean = false;

  contextos:Object[] = [
    { id: 'contexto-titulo', value: 1, nombre: 'En el título' },
    { id: 'contexto-autor', value: 2, nombre: 'En el nombre del autor' },
    { id: 'contexto-serie', value: 4, nombre: 'En el nombre de la serie' },
    { id: 'contexto-coleccion', value: 8, nombre: 'En el nombre de la coleccion' },
    { id: 'contexto-sinopsis', value: 16, nombre: 'En la sinopsis' }
  ];
  filtros:FormGroup;

  total:number = 0;

  constructor(private _peticion:PeticionDBService,
              private fb:FormBuilder,
              private router:Router) {

    const controls = this.contextos.map(c => new FormControl(false));
    controls[0].setValue(true);

    this.filtros = this.fb.group({
      query: new FormControl(''),
      contextos: new FormArray(controls),
      duplicados: '',
      precision: ''
    });

    this.filtros.valueChanges.subscribe( res => {
      this.cargarLibros();
    });

  }

  ngOnInit() {
    this.cargarLibros();
  }

  limpiarFiltros(){

  }

  cargarLibros(){

    this.cargando = true;

    this._peticion.pedirNube(1, this.filtros.value)
      .subscribe( res => {
        this.cargando = false;
        this.total = res.total;
      })
  }

  enviar(){

    //let filtros = this.filtros.value;
    let filtros = {
    'query': "La isla del tesoro"
  }

    this.router.navigate(['/la-nube'], { queryParams: { filtros: this.filtros.value } });
  }

}
