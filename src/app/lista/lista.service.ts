import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lista } from './lista';
import { ListaDetalhada } from './listaDetalhada';



@Injectable({
  providedIn: 'root'
})
export class ListaService {

  private listaUrl: string = 'http://localhost:3000/lista';
  private itemUrl: string = 'http://localhost:3000/listaDetalhada';

  constructor(private httpClient: HttpClient) { }

  getAllListas(): Observable<Lista[]> {
    return this.httpClient.get<Lista[]>(this.listaUrl);
  }

  getAllItens(id): Observable<ListaDetalhada[]> {
    return this.httpClient.get<ListaDetalhada[]>(`${this.itemUrl}?id_lista=${id}`);
  }

  getByIdLista(id: number): Observable<Lista>{
    return this.httpClient.get<Lista>(`${this.listaUrl}/${id}`);
  }

  postLista(lista: Lista): Observable<Lista>{
    if(lista.id){
      return this.httpClient.put<Lista>(`${this.listaUrl}/${lista.id}`, lista);
    }else{
      return this.httpClient.post<Lista>(this.listaUrl, lista);
    }
  }

  postItem(lista: ListaDetalhada): Observable<ListaDetalhada>{
    if(lista.id){
      return this.httpClient.put<ListaDetalhada>(`${this.itemUrl}/${lista.id}`, lista);
    }else{
      return this.httpClient.post<ListaDetalhada>(this.itemUrl, lista);
    }
  }

  deleteByIdLista(id: number): Observable<any>{
    return this.httpClient.delete<any>(`${this.listaUrl}/${id}`);
  }

  deleteByIdItem(id: number): Observable<any>{
    return this.httpClient.delete<any>(`${this.itemUrl}/${id}`);
  }

}
