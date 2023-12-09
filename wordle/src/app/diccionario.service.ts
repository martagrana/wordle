import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiccionarioService {

  listarDiccionario(): string[] {
    let diccionario: string[] = ['cisne', 'erizo', 'tigre', 'mosca', 'cabra', 'perro'];
    return diccionario;
  }
}
