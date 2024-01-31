import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Vehiculo } from 'src/app/interfaces/commons';


@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {
  vehiculos: Vehiculo[] = [
    { tipoVehiculo: 'Carro', placa: 'DZR849', imagen: 'https://cdn-icons-png.flaticon.com/512/3202/3202926.png', horaIngreso: '09:30', color: 'Rojo', valorPagado: 10500, horaSalida: '12:30' },
    { tipoVehiculo: 'Moto', placa: 'HHY65Y', imagen: 'https://cdn-icons-png.flaticon.com/512/3988/3988406.png', horaIngreso: '10:15', color: 'Azul', valorPagado: 12500, horaSalida: '12:30' },
    { tipoVehiculo: 'Carro', placa: 'TTT645', imagen: 'https://cdn-icons-png.flaticon.com/512/3202/3202926.png', horaIngreso: '11:00', color: 'Blanco', valorPagado: 11500, horaSalida: '14:30' },
    { tipoVehiculo: 'Moto', placa: 'JUY76I', imagen: 'https://cdn-icons-png.flaticon.com/512/3988/3988406.png', horaIngreso: '12:45', color: 'Verde', valorPagado: 12300, horaSalida: '14:30' },
    { tipoVehiculo: 'Carro', placa: 'RHU345', imagen: 'https://cdn-icons-png.flaticon.com/512/3202/3202926.png', horaIngreso: '14:20', color: 'Azul', valorPagado: 11100, horaSalida: '16:30' },
    { tipoVehiculo: 'Moto', placa: 'KKU77O', imagen: 'https://cdn-icons-png.flaticon.com/512/3988/3988406.png', horaIngreso: '15:10', color: 'Blanco', valorPagado: 1900, horaSalida: '17:30' },
    { tipoVehiculo: 'Carro', placa: 'FGH567', imagen: 'https://cdn-icons-png.flaticon.com/512/3202/3202926.png', horaIngreso: '16:30', color: 'Blanco', valorPagado: 15500, horaSalida: '17:30' },
    { tipoVehiculo: 'Moto', placa: 'LOL76E', imagen: 'https://cdn-icons-png.flaticon.com/512/3988/3988406.png', horaIngreso: '17:15', color: 'Negro', valorPagado: 13100, horaSalida: '18:30' },
    { tipoVehiculo: 'Carro', placa: 'ABR843', imagen: 'https://cdn-icons-png.flaticon.com/512/3202/3202926.png', horaIngreso: '18:45', color: 'Rojo', valorPagado: 16500, horaSalida: '19:30' },
    { tipoVehiculo: 'Moto', placa: 'SSE45R', imagen: 'https://cdn-icons-png.flaticon.com/512/3988/3988406.png', horaIngreso: '19:20', color: 'Rojo', valorPagado: 1100, horaSalida: '21:30' },
    { tipoVehiculo: 'Carro', placa: 'AFD765', imagen: 'https://cdn-icons-png.flaticon.com/512/3202/3202926.png', horaIngreso: '20:00', color: 'Rojo', valorPagado: 2300, horaSalida: '21:30' },
    { tipoVehiculo: 'Bicicleta', placa: 'Bici Gris', imagen: 'https://cdn.icon-icons.com/icons2/2645/PNG/512/bicycle_icon_160403.png', horaIngreso: '21:30', color: 'Gris', valorPagado: 1200, horaSalida: '22:30' },
  ];
  displayedColumns: string[] = ['tipoVehiculo', 'placa', 'imagen', 'horaIngreso', 'horaSalida', 'valorPagado', 'tiempoTotal'];
  dataSource = new MatTableDataSource<Vehiculo>(this.vehiculos);


  constructor(private router: Router) {

  }

  ngOnInit() {
  }
  //metodo para filtrar el array datasource
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //metodo para redireccionar al inicio
  redirect() {
    this.router.navigate(['inicio']);
  }

  //Metodo para calcular los minutos entre la hora de ingreso y de salida
  calculateTotalTime(horaIngreso: string, horaSalida: string): string {
    const ingreso = new Date('2022-01-01 ' + horaIngreso);
    const salida = new Date('2022-01-01 ' + horaSalida);
    const diffInMinutes = Math.floor((salida.getTime() - ingreso.getTime()) / (1000 * 60));
    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;
    return `${hours}h ${minutes}m`;
  }

}