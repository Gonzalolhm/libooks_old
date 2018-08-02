import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { PeticionDBService } from '../../../services/peticion-db.service';

@Component({
  selector: 'app-crear-premio',
  templateUrl: './crear-premio.component.html',
  styles: []
})
export class CrearPremioComponent implements OnInit {

  premio:FormGroup;

  error:string;

  @Input() sugerencia:string;

  @Output() recibirPremio = new EventEmitter();

  constructor(private fb:FormBuilder,
              private _peticion:PeticionDBService) {
    this.crearPremio();
  }

  ngOnInit() { }

  ngOnChanges( changes:SimpleChanges ){
    this.error = "";
    this.sugerencia = changes.sugerencia.currentValue;
    this.crearPremio();
  }

  crearPremio(){
    this.premio = this.fb.group({
      nombre: new FormControl(this.sugerencia, Validators.required)
    })
  }

  guardar(){
    this._peticion.guardarInfo(this.premio.value, "premio")
      .subscribe( res => {
        if(res['status'] == "OK"){
          let nuevoPremio:Object = {
            id_premio: res['id_premio'],
            nombre: this.premio.value.nombre
          }
          this.recibirPremio.emit(nuevoPremio);
        }
        else if(res['status'] == "KO"){
          this.error = "No se ha podido crear el premio";
        }
        else if(res['status'] == "DUP"){
          this.error = "Ya existe un premio con este nombre";
        }
      });
  }

}
