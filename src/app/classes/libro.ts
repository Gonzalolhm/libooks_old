export class Libro{
  titulo:string;
  autores:string[];
  serie?:string;
  num_serie?:number;
  coleccion?:string;
  num_coleccion?:number;
  editorial?:string;
  sinopsis?:string;
  seleccionado:boolean = false;
  poseido:boolean = false;
}
