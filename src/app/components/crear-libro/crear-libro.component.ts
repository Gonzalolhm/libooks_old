import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeticionDBService } from '../../services/peticion-db.service';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

declare function cerrarModal(modalID):any;

@Component({
  selector: 'app-crear-libro',
  templateUrl: './crear-libro.component.html',
  styles: []
})
export class CrearLibroComponent implements OnInit {

  contexto:string;

  titulosDuplicados:number = 0;

  libro:FormGroup;
  errorLibro:string       = "";

  totalAutores:number     = 0;
  listaAutores:Object[]   = [];
  autorQuery:string       = "";
  busquedaAutor:boolean   = false;
  pagAutores:number       = 1;
  totalPagAutores:number  = 1;

  imagenPortada:string    = "assets/images/default_cover.jpg";
  errorPortada:string     = "";

  totalSeries:number      = 0;
  listaSeries:Object[]    = [];
  serieQuery:string       = "";
  busquedaSerie:boolean   = false;
  pagSeries:number        = 1;
  totalPagSeries:number   = 1;

  totalColecciones:number     = 0;
  listaColecciones:Object[]   = [];
  coleccionQuery:string       = "";
  busquedaColeccion:boolean   = false;
  pagColecciones:number       = 1;
  totalPagColecciones:number  = 1;

  listaGeneros:Object[]             = [];
  listaEtiquetas:Object[]           = [];

  totalEditoriales:number     = 0;
  listaEditoriales:Object[]   = [];
  editorialQuery:string       = "";
  busquedaEditorial:boolean   = false;
  pagEditoriales:number       = 1;
  totalPagEditoriales:number  = 1;

  totalPremios:number         = 0;
  listaPremios:Object[]       = [];
  premioQuery:string          = "";
  busquedaPremio:boolean      = false;
  pagPremios:number           = 1;
  totalPagPremios:number      = 1;

  idiomas:Object[] = [
    { nombre: "Alemán", value: "de" },
    { nombre: "Árabe", value: "ar" },
    { nombre: "Búlgaro", value: "bg" },
    { nombre: "Catalán", value: "ca" },
    { nombre: "Checo", value: "cs" },
    { nombre: "Chino", value: "zh" },
    { nombre: "Coreano", value: "co" },
    { nombre: "Español", value: "es" },
    { nombre: "Euskera", value: "eu" },
    { nombre: "Francés", value: "fr" },
    { nombre: "Gallego", value: "gl" },
    { nombre: "Griego", value: "el" },
    { nombre: "Inglés", value: "en" },
    { nombre: "Italiano", value: "it" },
    { nombre: "Japonés", value: "ja" },
    { nombre: "Latín", value: "la" },
    { nombre: "Polaco", value: "pl" },
    { nombre: "Portugués", value: "pt" },
    { nombre: "Rumano", value: "ro" },
    { nombre: "Ruso", value: "ru" }
  ]

  constructor(private route:ActivatedRoute,
    private router:Router,
    private _peticion:PeticionDBService,
    private fb:FormBuilder) {

    this.route.queryParams.subscribe( params => {
      this.contexto = params.contexto;
    });

    this.crearModeloLibro();

    //this.pedirAutores();
    this.pedirSeries();
    this.pedirGeneros();
    this.pedirColecciones();
    this.pedirEditoriales();
    this.pedirPremios();

  }

  ngOnInit() { }

  crearModeloLibro(){
    this.libro = this.fb.group({
      titulo: new FormControl('', Validators.required),
      tipoAutor: new FormControl(0, Validators.required),
      autores: this.fb.array([]),
      autorQuery: new FormControl(''),
      portada: new FormControl(''),
      conSinopsis: new FormControl(false),
      sinopsis: new FormControl(''),
      conSerie: new FormControl(false),
      series: this.fb.array([]),
      serieQuery: new FormControl(''),
      conColeccion: new FormControl(false),
      colecciones: this.fb.array([]),
      coleccionQuery: new FormControl(''),
      generos: this.fb.array([]),
      etiquetas: this.fb.array([]),
      etiquetaQuery: new FormControl(''),
      conEditorial: new FormControl(false),
      editoriales: this.fb.array([]),
      editorialQuery: new FormControl(''),
      publicacion: new FormControl('', [Validators.minLength(4), Validators.maxLength(4)]),
      numPags: new FormControl('', [Validators.min(1)]),
      isbn: new FormControl('', [Validators.minLength(10), Validators.maxLength(13)]),
      idioma: new FormControl('es', Validators.required),
      conPremio: new FormControl(false),
      premios: this.fb.array([]),
      premioQuery: new FormControl('')
    });
  }

  comprobarTitulo(){
    this._peticion.comprobarTitulo(this.libro.value.titulo)
      .subscribe( res => {
        this.titulosDuplicados = res['sugerencias'].length;
      })
  }
  comprobarDuplicado(claveArray, clave, valor){
    let array = this.libro.get(claveArray) as FormArray;
    for(let i = 0; i < array.value.length; i++){
      if(array.value[i][clave] == valor){
        return true;
      }
    }
    return false;
  }
  ordenarArray(array){
    return array.sort(function(a,b) {return (a['nombre'] > b['nombre']) ? 1 : ((b['nombre'] > a['nombre']) ? -1 : 0);} );
  }

  //AUTORES
  crearAutor(id_autor:number, nombre:string, apellidos:string):FormGroup{
    return this.fb.group({
      id_autor: id_autor,
      nombre: nombre,
      apellidos: apellidos,
      funcion: 'Escritor'
    });
  }
  pedirAutores(){
    let query = this.libro.get("autorQuery").value;
    this._peticion.pedirAutores(this.pagAutores, query)
      .subscribe( res => {
        this.listaAutores = res.lista;
        this.totalAutores = res.total;
        this.totalPagAutores = res.pags;
    });
  }
  cambiarTipoAutor(tipo){
    if(tipo == this.libro.get("tipoAutor").value){
      tipo = 0;
    }
    this.libro.get("tipoAutor").setValue(tipo);
  }
  anadirAutor(autor, idx){
    if(!this.comprobarDuplicado("autores", "id_autor", autor["id_autor"])){
      let autores = this.libro.get("autores") as FormArray;
      autores.push(this.crearAutor(autor['id_autor'], autor['nombre'], autor['apellidos']));
    }
    if(idx >= 0){
      this.listaAutores.splice(idx, 1);
    }
    this.busquedaAutor = false;
    this.libro.get("autorQuery").setValue("");
  }
  quitarAutor(autor, idx){
    let autores = this.libro.get("autores") as FormArray;
    autores.removeAt(idx);
    this.listaAutores.push(autor.value);
    this.listaAutores = this.ordenarArray(this.listaAutores);
  }
  crearAutorLista(nuevoAutor){
    this.busquedaAutor = false;
    this.libro.get("autorQuery").setValue("");
    cerrarModal("crearAutor");
    this.anadirAutor(nuevoAutor, -1);
  }
  buscarAutores(){
    this.busquedaAutor = true;
    this.pagAutores = 1;
    this.pedirAutores();
  }
  retrocederPagAutores(){
    this.pagAutores--;
    this.pedirAutores();
  }
  avanzarPagAutores(){
    this.pagAutores++;
    this.pedirAutores();
  }

  //PORTADA
  subirPortada(event){
    const file = event.target.files[0];

    if(file){

      this._peticion.subirImagen(file)
      .subscribe( res => {
        if(res['status'] == "OK"){
          this.errorPortada = "";
          this.libro.get('portada').setValue(res['src']);
          let reader = new FileReader();
          reader.onload = (event:ProgressEvent) => {
            this.imagenPortada = (<FileReader>event.target).result;
          }
          reader.readAsDataURL(file);
        }
        else{
          this.imagenPortada = "assets/images/default_cover.jpg";
          this.errorPortada = res['error'];
        }
      });
    }
    else{
      this.imagenPortada = "assets/images/default_cover.jpg";
      this.libro.get("portada").setValue("");
    }
  }

  //SERIES
  crearSerie(id_serie:number, nombre:string, num:number = 1):FormGroup{
    return this.fb.group({
      id_serie: id_serie,
      nombre: nombre,
      num: num
    });
  }
  pedirSeries(){
    const query = this.libro.get("serieQuery").value;
    this._peticion.pedirSeries(this.pagSeries, query)
      .subscribe( res => {
        this.listaSeries = res.lista;
        this.totalSeries = res.total;
        this.totalPagSeries = res.pags;
      })
  }
  anadirSerie(serie, idx){
    if(!this.comprobarDuplicado("series", "id_serie", serie["id_serie"])){
      let series = this.libro.get("series") as FormArray;
      let numSerie = 1;
      this._peticion.pedirNumSerie(serie["id_serie"])
      .subscribe( res => {
        numSerie = res['num'];
        series.push(this.crearSerie(serie['id_serie'], serie['nombre'], numSerie));
      });
    }
    if(idx >= 0){
      this.listaSeries.splice(idx, 1);
    }
    this.libro.get("serieQuery").setValue("");
    this.busquedaSerie = false;
  }
  quitarSerie(serie, idx){
    let series = this.libro.get("series") as FormArray;
    series.removeAt(idx);
    this.listaSeries.push(serie.value);
    this.listaSeries = this.ordenarArray(this.listaSeries);
  }
  crearSerieLista(nuevaSerie){
    this.libro.get("serieQuery").setValue("");
    this.busquedaSerie = false;
    cerrarModal("crearSerie");
    this.anadirSerie(nuevaSerie, -1);
    //this.buscarSeries();
  }
  retrocederPagSeries(){
    this.pagSeries--;
    this.pedirSeries();
  }
  avanzarPagSeries(){
    this.pagSeries++;
    this.pedirSeries();
  }
  buscarSeries(){
    this.busquedaSerie = true;
    this.pagSeries = 1;
    this.pedirSeries();
  }

  //COLECCIONES
  crearColeccion(id_coleccion:number, nombre:string, num:number = 1):FormGroup{
    return this.fb.group({
      id_coleccion: id_coleccion,
      nombre: nombre,
      num: num
    });
  }
  pedirColecciones(){
    const query = this.libro.get("coleccionQuery").value;
    this._peticion.pedirColecciones(this.pagColecciones, query)
      .subscribe( res => {
        this.listaColecciones = res.lista;
        this.totalColecciones = res.total;
        this.totalPagColecciones = res.pags;
      });
  }
  anadirColeccion(coleccion, idx){
    if(!this.comprobarDuplicado("colecciones", "id_coleccion", coleccion["id_coleccion"])){
      let colecciones = this.libro.get("colecciones") as FormArray;
      let numColeccion = 1;
      this._peticion.pedirNumColeccion(coleccion["id_coleccion"])
      .subscribe( res => {
        numColeccion = res['num'];
        colecciones.push(this.crearColeccion(coleccion['id_coleccion'], coleccion['nombre'], numColeccion));
      });
    }
    if(idx >= 0){
      this.listaColecciones.splice(idx, 1);
    }
    this.libro.get("coleccionQuery").setValue("");
    this.busquedaColeccion = false;
  }
  quitarColeccion(coleccion, idx){
    let colecciones = this.libro.get("colecciones") as FormArray;
    colecciones.removeAt(idx);
    this.listaColecciones.push(coleccion.value);
    this.listaColecciones = this.ordenarArray(this.listaColecciones);
  }
  crearColeccionLista(nuevaColeccion){
    this.libro.get("coleccionQuery").setValue("");
    this.busquedaColeccion = false;
    cerrarModal("crearColeccion");
    this.anadirColeccion(nuevaColeccion, -1);
    //this.buscarColecciones();
  }
  retrocederPagColecciones(){
    this.pagColecciones--;
    this.pedirColecciones();
  }
  avanzarPagColecciones(){
    this.pagColecciones++;
    this.pedirColecciones();
  }
  buscarColecciones(){
    this.busquedaColeccion = true;
    this.pagColecciones = 1;
    this.pedirColecciones();
  }

  //GÉNEROS
  pedirGeneros(){
    this._peticion.pedirGeneros()
      .subscribe( res => {
        this.listaGeneros = res.lista;
        for(let i = 0; i < this.listaGeneros.length; i++){
          this.listaGeneros['marcado'] = false;
        }
      });
  }
  pulsarGenero(genero){
    let generos = this.libro.get("generos") as FormArray;

    genero['marcado'] = !genero['marcado'];
    if(genero['marcado']){
      generos.push(this.fb.group(genero));
    }
    else{
      for(let i = 0; i < generos.value.length; i++){
        if(generos.value[i]['codigo'] == genero['codigo']){
          generos.removeAt(i);
        }
      }
    }
    this.pedirEtiquetas();
  }
  pedirEtiquetas(){
    let generos = this.libro.get("generos") as FormArray;

    let arrayGeneros = [];
    for(let i = 0; i < generos.value.length; i++){
      arrayGeneros.push(generos.value[i]['id_genero']);
    }
    this._peticion.pedirEtiquetas(arrayGeneros, '')
      .subscribe( res => {
        this.listaEtiquetas = res.lista;
      })
  }
  buscarEtiquetas(){
    const nombre = this.libro.get("etiquetaQuery").value;
    if(nombre != ""){
      this._peticion.guardarInfo({ "nombre": nombre }, "etiqueta")
        .subscribe( res => {
          if(res['status'] = "OK"){
            let nuevaEtiqueta = {
              id_etiqueta: res['id_etiqueta'],
              nombre: nombre
            }
            this.libro.get("etiquetaQuery").setValue("");
            this.anadirEtiqueta(nuevaEtiqueta, -1);
          }
      });
    }
  }
  anadirEtiqueta(etiqueta, idx){
    let duplicado:boolean = false;
    let etiquetas = this.libro.get("etiquetas") as FormArray;

    for(let i = 0; i < etiquetas.value.length; i++){
      if(etiquetas.value[i]['id_etiqueta'] == etiqueta['id_etiqueta']){
        duplicado = true;
      }
    }
    if(!duplicado){
      etiquetas.push(this.fb.group(etiqueta));
    }
    if(idx >= 0){
      this.listaEtiquetas.splice(idx, 1);
    }

    if(this.listaEtiquetas.length == 0){
      this.pedirEtiquetas();
    }
  }
  quitarEtiqueta(etiqueta, idx){
    let etiquetas = this.libro.get("etiquetas") as FormArray;
    this.listaEtiquetas.push(etiqueta.value);
    etiquetas.removeAt(idx);
  }
  //EDITORIALES
  crearEditorial(id_editorial:number, nombre:string):FormGroup{
    return this.fb.group({
      id_editorial: id_editorial,
      nombre: nombre
    });
  }
  pedirEditoriales(){
    const query = this.libro.get("editorialQuery").value;
    this._peticion.pedirEditoriales(this.pagEditoriales, query)
      .subscribe( res => {
        this.listaEditoriales = res.lista;
        this.totalEditoriales = res.total;
        this.totalPagEditoriales = res.pags;
      })
  }
  anadirEditorial(editorial, idx){
    if(!this.comprobarDuplicado("editoriales", "id_editorial", editorial["id_editorial"])){
      let editoriales = this.libro.get("editoriales") as FormArray;
      editoriales.push(this.crearEditorial(editorial['id_editorial'], editorial['nombre']));
    }
    if(idx >= 0){
      this.listaEditoriales.splice(idx, 1);
    }
    this.libro.get("editorialQuery").setValue("");
    this.busquedaEditorial = false;
  }
  quitarEditorial(editorial, idx){
    let editoriales = this.libro.get("editoriales") as FormArray;
    editoriales.removeAt(idx);
    this.listaEditoriales.push(editorial.value);
    this.listaEditoriales = this.ordenarArray(this.listaEditoriales);
  }
  crearEditorialLista(nuevaEditorial){
    this.libro.get("editorialQuery").setValue("");
    this.busquedaEditorial = false;
    cerrarModal("crearEditorial");
    this.anadirEditorial(nuevaEditorial, -1);
    this.buscarEditoriales();
  }
  retrocederPagEditoriales(){
    this.pagEditoriales--;
    this.pedirEditoriales();
  }
  avanzarPagEditoriales(){
    this.pagEditoriales++;
    this.pedirEditoriales();
  }
  buscarEditoriales(){
    this.busquedaEditorial = true;
    this.pagEditoriales = 1;
    this.pedirEditoriales();
  }

  //PREMIOS
  crearPremio(id_premio:number, nombre:string, posicion:number = 0, fecha?:string):FormGroup{
    return this.fb.group({
      id_premio: id_premio,
      nombre: nombre,
      posicion: posicion,
      fecha: fecha
    });
  }
  pedirPremios(){
    const query = this.libro.get("premioQuery").value;
    this._peticion.pedirPremios(this.pagPremios, query)
      .subscribe( res => {
        this.listaPremios = res.lista;
        this.totalPremios = res.total;
        this.totalPagPremios = res.pags;
      })
  }
  anadirPremio(premio, idx){
    if(!this.comprobarDuplicado("premios", "id_premio", premio["id_premio"])){
      let premios = this.libro.get("premios") as FormArray;
      premios.push(this.crearPremio(premio['id_premio'], premio['nombre']));
    }
    if(idx >= 0){
      this.listaPremios.splice(idx, 1);
    }
    this.libro.get("premioQuery").setValue("");
    this.busquedaPremio = false;
  }
  quitarPremio(premio, idx){
    let premios = this.libro.get("premios") as FormArray;
    premios.removeAt(idx);
    this.listaPremios.push(premio.value);
    this.listaPremios = this.ordenarArray(this.listaPremios);
  }
  crearPremioLista(nuevoPremio){
    this.libro.get("premioQuery").setValue("");
    this.busquedaPremio = false;
    cerrarModal("crearPremio");
    this.anadirPremio(nuevoPremio, -1);
    this.buscarPremios();
  }
  retrocederPagPremios(){
    this.pagPremios--;
    this.pedirPremios();
  }
  avanzarPagPremios(){
    this.pagPremios++;
    this.pedirPremios();
  }
  buscarPremios(){
    this.busquedaPremio = true;
    this.pagPremios = 1;
    this.pedirPremios();
  }

  validar(){
    console.log(this.libro.value);
    this._peticion.guardarInfo(this.libro.value, "libro")
      .subscribe( res => {
        if(res['status'] == "OK"){
          this.router.navigate(['la-nube']);
        }
        else{
          this.errorLibro = res['error'];
        }
    });
  }
}
