import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  //metodo para redireccionar segun la accion que desee realizar el usuario
  redirectPage(numero: number) {
    switch (numero) {
      case 1:
        this.router.navigate(['ingreso', 'registro']);
        break;
      case 2:
        this.router.navigate(['salida', 'salida']);
        break;
      case 3:
        this.router.navigate(['consulta', 'consulta-parking']);
        break;
      default:
        this.router.navigate(['consulta', 'consulta-parking']);
    }
  }
}
