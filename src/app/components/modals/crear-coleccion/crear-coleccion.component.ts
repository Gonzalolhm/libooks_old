import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { PeticionDBService } from '../../../services/peticion-db.service';

@Component({
  selector: 'app-crear-coleccion',
  templateUrl: './crear-coleccion.component.html',
  styles: []
})
export class CrearColeccionComponent implements OnInit {

  coleccion:FormGroup;

  error:string;

  @Input() sugerencia:string;

  @Output() recibirColeccion = new EventEmitter();

  constructor(private fb:FormBuilder,
              private _peticion:PeticionDBService) {
    this.crearColeccion();
  }

  ngOnInit() { }

  ngOnChanges( changes:SimpleChanges ){
    this.error = "";
    this.sugerencia = changes.sugerencia.currentValue;
    this.crearColeccion();
  }

  crearColeccion(){
    this.coleccion = this.fb.group({
      nombre: new FormControl(this.sugerencia, Validators.required)
    });
  }

  guardar(){

    this._peticion.guardarInfo(this.coleccion.value, "coleccion")
      .subscribe( res => {
        if(res['status'] == "OK"){
          let nuevaColeccion:Object = {
            id_coleccion: res['id_coleccion'],
            nombre: this.coleccion.value.nombre
          };
          this.recibirColeccion.emit(nuevaColeccion);
        }
        else if(res['status'] == "KO"){
          this.error = "No se ha podido crear la colección";
        }
        else if(res['status'] == "DUP"){
          this.error = "Ya existe otra colección con este nombre";
        }
      });
  }

}
