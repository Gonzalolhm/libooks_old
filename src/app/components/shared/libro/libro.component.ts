import { Component, OnInit, Input } from '@angular/core';
import { PeticionDBService } from '../../../services/peticion-db.service';
import { Libro } from '../../../classes/libro';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})
export class LibroComponent implements OnInit {

  @Input() libro:Libro;
  @Input() contexto:string;

  masGeneros:boolean = false;
  masEtiquetas:boolean = false;

  constructor(private _peticion:PeticionDBService) {
  }

  ngOnInit() {
    if(this.libro["portada"] == "" || this.libro["portada"] == null){
      this.libro["portada"] = "assets/images/default_cover.jpg";
    }
    else{
      this.libro["portada"] = "assets/covers/" + this.libro["portada"];
    }
    console.log(this.libro);
  }

  hayMasEtiquetas(){
    if(!this.masEtiquetas && this.libro['etiquetas'].length > 3){
      return true;
    }
    return false;
  }

  anadirLibroColeccion(){

  }

  quitarLibroColeccion(){

  }

}
