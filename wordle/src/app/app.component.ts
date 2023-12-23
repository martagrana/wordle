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

  /**
   * Esta función calcula la puntuación por letras acertadas de la palabra.
   * Suma 3 puntos si la letra está en la posición correcta y 1 punto si está incluida pero en otra posición.
   *  
   */
  calcularPuntuacion(): number {
    let contadorAciertosPosicionCorrecta: number = 0;
    let contadorAciertosLetraIncluida: number = 0;
    for (let indexAComprobar = 0; indexAComprobar < this.palabraAComprobar.length; indexAComprobar++) {
      if (this.palabraAComprobar[indexAComprobar] === this.palabraSeleccionada[indexAComprobar]) {
        contadorAciertosPosicionCorrecta += 3;
        this.letrasAcertadas.push(this.palabraAComprobar[indexAComprobar]);
      } else {
        for (let indexSeleccionada = 0; indexSeleccionada < this.palabraSeleccionada.length; indexSeleccionada++) {
          if (this.palabraAComprobar[indexAComprobar] === this.palabraSeleccionada[indexSeleccionada]) {
            contadorAciertosLetraIncluida += 1;
          }
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
