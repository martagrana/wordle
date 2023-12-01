import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wordle';

  diccionario: string[] = ['cisne', 'erizo', 'tigre', 'mosca', 'cabra'];
  palabraSeleccionada: string = '';

  palabraAComprobar: string = '';

  mensajeResultado: string = '';

  seleccionarPalabra() {
    let indiceAleatorio = Math.round(Math.random() * this.diccionario.length);
    this.palabraSeleccionada = this.diccionario[indiceAleatorio];
    console.log(this.palabraSeleccionada);
  }

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
  }

}
