import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Libro } from '../classes/libro';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PeticionDBService {

  url:string = "http://127.0.0.1/";

  listaUrls:Object = {
    "libro": "guardarLibro.php",
    "autor": "guardarAutor.php",
    "serie": "guardarSerie.php",
    "coleccion": "guardarColeccion.php",
    "editorial": "guardarEditorial.php",
    "premio": "guardarPremio.php",
    "etiqueta": "guardarEtiqueta.php",
    "libroColeccion": "anadirLibroColeccion.php"
  }

  constructor(private http:HttpClient) { }

  pedirColeccion():Observable<any>{
    let url = this.url + 'dameColeccion.php';
    return this.http.get(url).pipe(
      map(res => res)
    );
  }
  pedirNube(pag, filtros):Observable<any>{
    let url = this.url + 'dameNube.php';
    let params = new HttpParams().set("pag", pag);

    for(let filtro in filtros){
      if(Array.isArray(filtros[filtro])){
        filtros[filtro] = filtros[filtro].join('&&');
      }
      params = params.set(filtro, filtros[filtro]);
    }

    return this.http.get(url, { params: params})
    .pipe(
      map( res => res )
    )
  }
  pedirAutores(pag, busqueda):Observable<any>{
    let url = this.url + 'dameAutores.php';
    let params= new HttpParams().set("pag", pag).set("busqueda", busqueda);

    return this.http.get(url, { params: params })
    .pipe(
      map( res => res )
    )
  }
  pedirSeries(pag, busqueda):Observable<any>{
    let url = this.url + 'dameSeries.php';
    let params = new HttpParams().set("pag", pag).set("busqueda", busqueda);

    return this.http.get(url, { params: params })
    .pipe(
      map( res => res )
    )
  }
  pedirNumSerie(id_serie):Observable<any>{
    let url  = this.url + 'dameNumSerie.php';
    let params = new HttpParams().set("id_serie", id_serie);

    return this.http.get(url, { params: params })
    .pipe(
      map( res => res )
    )
  }
  pedirColecciones(pag, busqueda):Observable<any>{
    let url = this.url + 'dameColecciones.php';
    let params = new HttpParams().set("pag", pag).set("busqueda", busqueda);

    return this.http.get(url, { params: params })
    .pipe(
      map( res => res )
    )
  }
  pedirNumColeccion(id_coleccion):Observable<any>{
    let url = this.url + 'dameNumColeccion.php';
    let params = new HttpParams().set("id_coleccion", id_coleccion);

    return this.http.get(url, { params: params })
    .pipe(
      map( res => res )
    )
  }
  pedirGeneros():Observable<any>{
    let url = this.url + 'dameGeneros.php';
    return this.http.get(url);
  }
  pedirEtiquetas(arrayGeneros, busqueda):Observable<any>{
    let url = this.url + 'dameEtiquetas.php';
    let generos = arrayGeneros.join(",");
    let params = new HttpParams().set("generos", generos).set("busqueda", busqueda);

    return this.http.get(url, { params: params })
    .pipe(
      map( res => res )
    )
  }
  pedirEditoriales(pag, busqueda):Observable<any>{
    let url = this.url + 'dameEditoriales.php';
    let params = new HttpParams().set("pag", pag).set("busqueda", busqueda);

    return this.http.get(url, { params: params })
    .pipe(
      map( res => res )
    )
  }
  pedirPremios(pag, busqueda):Observable<any>{
    let url = this.url + 'damePremios.php';
    let params = new HttpParams().set("pag", pag).set("busqueda", busqueda);

    return this.http.get(url, { params: params })
    .pipe(
      map( res => res )
    )
  }
  comprobarTitulo(titulo):Observable<any>{
    let url = this.url + 'comprobarTitulo.php';
    let params = new HttpParams().set("titulo", titulo);

    return this.http.get(url, { params: params })
    .pipe(
      map( res => res )
    )
  }
  guardarInfo(params, tipo):Observable<any>{
    let url = this.url + this.listaUrls[tipo];

    const headers:HttpHeaders = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

    let json = JSON.stringify(params);
    let body = "params=" + json;

    return this.http.post(url, body, { headers })
    .pipe(
      map( res => res )
    );
  }
  subirImagen(file):Observable<any>{
    let url = this.url + 'guardarImagen.php';

    const formData = new FormData();
    formData.append('file', file, file.name);

    const headers:HttpHeaders = new HttpHeaders().set('Content-Type', []);

    return this.http.post(url, formData, { headers })
    .pipe(
      map( res => res)
    );
  }

}
