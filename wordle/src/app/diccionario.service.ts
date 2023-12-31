import { Injectable } from '@angular/core';
import * as jsonData from '../assets/palabras.json';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiccionarioService {
  constructor(public httpClient: HttpClient) { }

  listarDiccionario(): Observable<string[]> {
    return this.httpClient.get<string[]>('./assets/palabras.json');
  }

}
