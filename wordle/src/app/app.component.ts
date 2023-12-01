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
  arrayLetrasPalabraSeleccionada: string[] = [];
  palabraAcomprobar: string = '';

  mensajeResultado: string = '';

  seleccionarPalabra() {
    let indiceAleatorio = Math.round(Math.random() * this.diccionario.length);
    this.palabraSeleccionada = this.diccionario[indiceAleatorio];
    console.log(this.palabraSeleccionada);
    this.arrayLetrasPalabraSeleccionada = this.palabraSeleccionada.split('');
    console.log(this.arrayLetrasPalabraSeleccionada);
  }

  comprobarPalabra() {
    if (this.palabraAcomprobar === this.palabraSeleccionada) {
      this.mensajeResultado = '¡Has acertado!';
    } else {
      this.mensajeResultado = 'Intenta de nuevo';
    }
  }


  /* ESto era necesario en la versión con 5 inputs

  letras: string[] = ['', '', '', '', ''];

  comprobarPalabra() {
     if (this.letras.join('') === this.palabraSeleccionada) {
       this.mensajeResultado = '¡Has acertado!';
     } else {
       this.mensajeResultado = 'Intenta de nuevo';
     }
   }*/

}
