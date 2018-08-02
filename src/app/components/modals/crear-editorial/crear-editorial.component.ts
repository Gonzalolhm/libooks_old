import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { PeticionDBService } from '../../../services/peticion-db.service';

@Component({
  selector: 'app-crear-editorial',
  templateUrl: './crear-editorial.component.html',
  styles: []
})
export class CrearEditorialComponent implements OnInit {

  editorial:FormGroup;

  error:string;

  @Input() sugerencia:string;

  @Output() recibirEditorial = new EventEmitter();

  constructor(private fb:FormBuilder,
              private _peticion:PeticionDBService) {
    this.crearEditorial();
  }

  ngOnInit() { }

  ngOnChanges(changes:SimpleChanges){
    this.error = "";
    this.sugerencia = changes.sugerencia.currentValue;
    this.crearEditorial();
  }

  crearEditorial(){
    this.editorial = this.fb.group({
      nombre: new FormControl(this.sugerencia, Validators.required)
    })
  }

  guardar(){
    this._peticion.guardarInfo(this.editorial.value, "editorial")
      .subscribe( res => {
        if(res['status'] == "OK"){
          let nuevaEditorial:Object = {
            id_editorial: res['id_editorial'],
            nombre: this.editorial.value.nombre
          };
          this.recibirEditorial.emit(nuevaEditorial);
        }
        else if(res['status'] == "KO"){
          this.error = "No se ha podido crear la editorial";
        }
        else if(res['status'] == "DUP"){
          this.error = "Ya existe una editorial con este nombre";
        }
      });
  }

}
