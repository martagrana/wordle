import { Component, OnInit } from '@angular/core';
import { DiccionarioService } from './diccionario.service';
import { DiccionarioRemotoService } from './diccionario-remoto.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'wordle';

  diccionario: string[] = [];
  palabraSeleccionada: string = '';
  palabraAComprobar: string = '';
  mensajeResultado: string = '';
  hasAcertado: boolean = false;
  hasFallado: boolean = false;
  puntuacionTotal: number = 0;
  letrasAcertadas: string[] = [];

  constructor(public servicio: DiccionarioService) { }
  ngOnInit(): void {
    this.servicio.listarDiccionario().subscribe(resultado => {
      this.diccionario = resultado;
    });
  }

  /**
   * Esta función se activa mediante un boton para comenzar a jugar.
   * Selecciona una palabra aleatoria del diccionario.
   *  
   */
  seleccionarPalabra(): void {
    this.hasAcertado = false;
    this.hasFallado = false;
    let indiceAleatorio = Math.round(Math.random() * this.diccionario.length);
    this.palabraSeleccionada = this.diccionario[indiceAleatorio];
    console.log(this.palabraSeleccionada);
  }
  /**
   * Esta función comprueba que las dos palabras tengan el mismo tamaño.
   * Devuelve true si tienen el mismo tamaño y false en caso contrario.
   *  
   */
  comprobarTamanoPalabrasSonIguales(): boolean {
    if (this.palabraAComprobar.length === this.palabraSeleccionada.length) {
      return true;
    }
    else {
      return false;
    }
  }

  /** Implementar funcion "Includes" propia. 
   * Es una funcion que recibe una cadena/string y una letra/caracter y devuelve un boolean. 
   * Devuelve True si la letra está dentro de la cadena
    */
  includes(palabraAAdivinar: string, letra: string): boolean {
    let estaDentro: boolean = false;
    for (let index = 0; index < palabraAAdivinar.length; index++) {
      if (letra === palabraAAdivinar[index]) {
        estaDentro = true;
        break;
      }
    }
    return estaDentro;
  }

  /**
   * Esta función calcula la puntuación por letras acertadas de la palabra.
   * Suma 3 puntos si la letra está en la posición correcta y 1 punto si está incluida pero en otra posición.
   *  
   */
  calcularPuntuacion(): number {
    let contadorAciertosPosicionCorrecta: number = 0;
    let contadorAciertosLetraIncluida: number = 0;
    let copiaPalabraSeleccionada: string = this.palabraSeleccionada;
    for (let indexAComprobar = 0; indexAComprobar < this.palabraAComprobar.length; indexAComprobar++) {
      if (this.palabraAComprobar[indexAComprobar] === copiaPalabraSeleccionada[indexAComprobar]) {
        contadorAciertosPosicionCorrecta += 3;
        this.letrasAcertadas.push(this.palabraAComprobar[indexAComprobar]);
        copiaPalabraSeleccionada = copiaPalabraSeleccionada.slice(0, indexAComprobar) + copiaPalabraSeleccionada.slice(indexAComprobar + 1, copiaPalabraSeleccionada.length);
      } else {
        if (this.includes(copiaPalabraSeleccionada, this.palabraAComprobar[indexAComprobar])) {
          contadorAciertosLetraIncluida += 1;
          copiaPalabraSeleccionada = copiaPalabraSeleccionada.slice(0, indexAComprobar) + copiaPalabraSeleccionada.slice(indexAComprobar + 1, copiaPalabraSeleccionada.length);
        }
      }
    }
    return contadorAciertosPosicionCorrecta + contadorAciertosLetraIncluida;
  }

  /**
  * Esta función se utiliza mediante un botón que muestra el resultado del juego. 
  * Comprueba si la palabra es correcta y devuelve una puntuación según las letras acertadas
  */
  comprobarPalabra(): void {
    this.hasAcertado = false;
    this.hasFallado = false;
    if (this.comprobarTamanoPalabrasSonIguales()) {
      if (this.palabraAComprobar === this.palabraSeleccionada) {
        this.hasAcertado = true;
      } else {
        this.hasFallado = true;
      }
      this.puntuacionTotal = this.calcularPuntuacion();
    }
  }

}
