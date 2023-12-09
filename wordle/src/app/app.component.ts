import { Component } from '@angular/core';
import { DiccionarioService } from './diccionario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wordle';

  diccionario: string[] = this.servicio.listarDiccionario();
  palabraSeleccionada: string = '';
  palabraAComprobar: string = '';
  mensajeResultado: string = '';

  constructor(public servicio: DiccionarioService) { }

  seleccionarPalabra(): void {
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

  comprobarPalabra() {

    if (!this.comprobarTamanoPalabrasSonIguales()) {
      this.mensajeResultado = 'No has introducido una palabra de 5 letras';
    }
    else {
      if (this.palabraAComprobar === this.palabraSeleccionada) {
        this.mensajeResultado = '¡Has acertado!';
      } else {
        let contadorAciertos: number = 0;
        let letrasAcertadas: string[] = [];
        for (let index = 0; index < this.palabraAComprobar.length; index++) {
          if (this.palabraAComprobar[index] === this.palabraSeleccionada[index]) {
            contadorAciertos++;
            letrasAcertadas.push(this.palabraAComprobar[index]);
          }
        }
        this.mensajeResultado = `Has acertado ${contadorAciertos} letras. Las letras acertadas son ${letrasAcertadas}. Intenta de nuevo.`;
      }
    }
  }


  /*version descomponiendo la palabra y formando un array con las letras
  comprobarPalabra() {
    let letrasPalabraSeleccionada: string[] = [];
    let letrasPalabraAComprobar: string[] = [];
    letrasPalabraSeleccionada = this.palabraSeleccionada.split('');
    console.log(letrasPalabraSeleccionada);
    letrasPalabraAComprobar = this.palabraAComprobar.split('');
    console.log(letrasPalabraAComprobar);
    let contadorAciertos: number = 0;
    if (letrasPalabraAComprobar.length !== letrasPalabraSeleccionada.length) {
      this.mensajeResultado = 'No has introducido una palabra de 5 letras';
    }
    else {
      if (this.palabraAComprobar === this.palabraSeleccionada) {
        this.mensajeResultado = '¡Has acertado!';
      } else {
        for (let i = 0; i < letrasPalabraAComprobar.length; i++) {
          if (letrasPalabraAComprobar[i] === letrasPalabraSeleccionada[i]) {
            contadorAciertos++
          }
        }
        contadorAciertos = contadorAciertos++;
        console.log(contadorAciertos);
        this.mensajeResultado = `Has acertado ${contadorAciertos} letras. Intenta de nuevo.`;
 
      }
    }
  }*/

}
