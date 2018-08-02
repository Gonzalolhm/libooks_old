import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { PeticionDBService } from '../../../services/peticion-db.service';

@Component({
  selector: 'app-crear-autor',
  templateUrl: './crear-autor.component.html',
  styles: []
})
export class CrearAutorComponent implements OnInit {

  autor:FormGroup;

  formatoAutor:string[] = ["nombre-apellidos", "nombres-apellidos", "nombre"];
  punteroFormatoAutor:number = 0;

  error:string;

  @Input() sugerencia:string;
  palabras:string[] = [];

  @Output() recibirAutor = new EventEmitter();

  constructor(private fb:FormBuilder,
              private _peticion:PeticionDBService) {

    this.crearAutor();
  }

  ngOnInit() {
  }

  ngOnChanges(changes:SimpleChanges){
    this.error = "";
    this.punteroFormatoAutor = 0;
    this.sugerencia = changes.sugerencia.currentValue;
    this.crearAutor();
  }

  crearAutor(){

    let nombre = "";
    let apellidos = "";

    if(this.sugerencia){
      this.palabras = this.sugerencia.split(" ");

      if(this.palabras.length == 1){
        nombre = this.palabras.join(" ");
      }
      else{
        if(this.formatoAutor[this.punteroFormatoAutor] == "nombre-apellidos"){
          nombre = this.palabras.shift();
          apellidos = this.palabras.join(" ");
        }
        else{
          if(this.palabras.length == 2){
            nombre = this.palabras.join(" ");
          }
          else{
            if(this.formatoAutor[this.punteroFormatoAutor] == "nombres-apellidos"){
              nombre = this.palabras.shift() + " " + this.palabras.shift();
              apellidos = this.palabras.join(" ");
            }
            else{
              nombre = this.palabras.join(" ");
            }
          }
        }
      }
    }

    this.autor = this.fb.group({
      nombre: new FormControl(nombre, Validators.required),
      apellidos: new FormControl(apellidos)
    });
  }

  cambiarFormato(){
    this.punteroFormatoAutor++;
    if(this.punteroFormatoAutor == 1 && this.palabras.length < 2){
      this.punteroFormatoAutor++;
    }
    if(this.punteroFormatoAutor >= this.formatoAutor.length){
      this.punteroFormatoAutor = 0;
    }
    this.crearAutor();
  }

  guardar(){
    this._peticion.guardarInfo(this.autor.value, "autor")
      .subscribe( res => {
        if(res['status'] == "OK"){
          let nuevoAutor = {
            id_autor: res['id_autor'],
            nombre: this.autor.value.nombre,
            apellidos: this.autor.value.apellidos,
            funcion: "Escritor"
          }
          this.recibirAutor.emit(nuevoAutor);
        }
        else if(res['status'] == "KO"){
          this.error = "No se ha podido crear el autor";
        }
        else if(res['status'] == "DUP"){
          this.error = "Ya existe un autor con estos datos";
        }
    });
  }

}
