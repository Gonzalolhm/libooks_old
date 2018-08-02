import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ajustar-portada',
  templateUrl: './ajustar-portada.component.html',
  styles: []
})
export class AjustarPortadaComponent implements OnInit {

  imagenEvent:any = "";
  aspectRatio:number = 240 / 400;

  constructor() { }

  ngOnInit() {
  }

  actualizarImagen(event):void{
    this.imagenEvent = event;
  }

  cambiarRatio(){
    this.aspectRatio = 1 / 1;
  }
  imageCropped(image: string) {
    //this.croppedImage = image;
  }
  imageLoaded() {
      // show cropper
      console.log("show cropper");
  }
  loadImageFailed() {
      // show message
      console.log("show message");
  }
}
