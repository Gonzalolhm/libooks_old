import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { PeticionDBService } from '../../../services/peticion-db.service';

@Component({
  selector: 'app-crear-serie',
  templateUrl: './crear-serie.component.html',
  styles: []
})
export class CrearSerieComponent implements OnInit {

  serie:FormGroup;

  error:string;

  @Input() sugerencia:string;

  @Output() recibirSerie = new EventEmitter();

  constructor(private fb:FormBuilder,
              private _peticion:PeticionDBService) {
    this.crearSerie();
  }

  ngOnInit() { }

  ngOnChanges(changes:SimpleChanges){
    this.error = "";
    this.sugerencia = changes.sugerencia.currentValue;
    this.crearSerie();
  }

  crearSerie(){
    this.serie = this.fb.group({
      nombre: new FormControl(this.sugerencia, Validators.required)
    })
  }

  guardar(){
    this._peticion.guardarInfo(this.serie.value, "serie")
      .subscribe( res => {
        if(res['status'] == "OK"){
          let nuevaSerie:Object = {
            id_serie: res['id_serie'],
            nombre: this.serie.value.nombre
          }
          this.recibirSerie.emit(nuevaSerie);
        }
        else if(res['status'] == "KO"){
          this.error = "No se ha podido crear la serie";
        }
        else if(res['status'] == "DUP"){
          this.error = "Ya existe una serie con este nombre";
        }
      });
  }

}
