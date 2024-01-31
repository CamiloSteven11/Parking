import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Vehiculo } from 'src/app/interfaces/commons';

@Component({
  selector: 'app-salida',
  templateUrl: './salida.component.html',
  styleUrls: ['./salida.component.css']
})
export class SalidaComponent implements OnInit {

  formulario!: FormGroup;
  selectedVehicle!: Vehiculo;
  cobroTarifa: number = 0;
  errorFactura: boolean = false
  errorHora: boolean = false
  errorModalVisible: boolean = false
  modalCorrecto: boolean = false
  vehiculos: Vehiculo[] = [
    { tipoVehiculo: 'Carro', placa: 'DZR849', imagen: 'https://cdn-icons-png.flaticon.com/512/3202/3202926.png', horaIngreso: '09:30', color: 'Rojo' },
    { tipoVehiculo: 'Moto', placa: 'HHY65Y', imagen: 'https://cdn-icons-png.flaticon.com/512/3988/3988406.png', horaIngreso: '10:15', color: 'Azul' },
    { tipoVehiculo: 'Carro', placa: 'TTT645', imagen: 'https://cdn-icons-png.flaticon.com/512/3202/3202926.png', horaIngreso: '11:00', color: 'Blanco' },
    { tipoVehiculo: 'Moto', placa: 'JUY76I', imagen: 'https://cdn-icons-png.flaticon.com/512/3988/3988406.png', horaIngreso: '12:45', color: 'Verde' },
    { tipoVehiculo: 'Carro', placa: 'RHU345', imagen: 'https://cdn-icons-png.flaticon.com/512/3202/3202926.png', horaIngreso: '14:20', color: 'Azul' },
    { tipoVehiculo: 'Moto', placa: 'KKU77O', imagen: 'https://cdn-icons-png.flaticon.com/512/3988/3988406.png', horaIngreso: '15:10', color: 'Blanco' },
    { tipoVehiculo: 'Carro', placa: 'FGH567', imagen: 'https://cdn-icons-png.flaticon.com/512/3202/3202926.png', horaIngreso: '16:30', color: 'Blanco' },
    { tipoVehiculo: 'Moto', placa: 'LOL76E', imagen: 'https://cdn-icons-png.flaticon.com/512/3988/3988406.png', horaIngreso: '17:15', color: 'Negro' },
    { tipoVehiculo: 'Carro', placa: 'ABR843', imagen: 'https://cdn-icons-png.flaticon.com/512/3202/3202926.png', horaIngreso: '18:45', color: 'Rojo' },
    { tipoVehiculo: 'Moto', placa: 'SSE45R', imagen: 'https://cdn-icons-png.flaticon.com/512/3988/3988406.png', horaIngreso: '19:20', color: 'Rojo' },
    { tipoVehiculo: 'Carro', placa: 'AFD765', imagen: 'https://cdn-icons-png.flaticon.com/512/3202/3202926.png', horaIngreso: '20:00', color: 'Rojo' },
    { tipoVehiculo: 'Bicicleta', placa: 'Bici Gris', imagen: 'https://cdn.icon-icons.com/icons2/2645/PNG/512/bicycle_icon_160403.png', horaIngreso: '21:30', color: 'Gris' },
  ];


  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  redirect() {
    this.router.navigate(['inicio']);
  }

  abrirModal(vehicle: any) {
    this.cobroTarifa = 0;
    this.selectedVehicle = vehicle;

    this.formulario.patchValue({
      placa: vehicle.placa,
      horaIngreso: vehicle.horaIngreso,
      horaSalida: vehicle.horaSalida,
      factura: vehicle.factura,
      color: vehicle.color,
      tipoVehiculo: vehicle.tipoVehiculo,
    });

    document.getElementById('myModal')!.classList.add('show');
    document.getElementById('myModal')!.style.display = 'block';

  }

  cerrarModal() {
    document.getElementById('myModal')?.classList.remove('show');
    document.getElementById('myModal')!.style.display = 'none';
  }

  calcularCobro() {
    if (!this.selectedVehicle) {
      console.log('Vehículo no seleccionado.');
      return;
    }

    const horaIngreso = this.formulario.get('horaIngreso')!.value;
    const horaSalida = this.formulario.get('horaSalida')!.value;
    const factura = this.formulario.get('factura')!.value;

    if (horaIngreso >= horaSalida) {
      this.errorHora = true
    } else {
      this.errorHora = false
      const ingresoDate = this.parseHoraToTime(2022, horaIngreso);
      const salidaDate = this.parseHoraToTime(2022, horaSalida);

      const minutosDiferencia = this.calcularMinutosDiferencia(ingresoDate, salidaDate);

      const tarifaPorMinuto = this.obtenerTarifaPorMinuto();

      this.calcularCobroTarifa(minutosDiferencia, tarifaPorMinuto, factura);

      console.log('Cobro:', this.cobroTarifa);

      this.formulario.patchValue({
        cobro: this.cobroTarifa,
      });
    }
  }

  private parseHoraToTime(year: number, hora: string): Date {
    const [hours, minutes] = hora.split(':').map(Number);
    return new Date(year, 0, 1, hours, minutes);
  }

  private calcularMinutosDiferencia(ingresoDate: Date, salidaDate: Date): number {
    return Math.floor((salidaDate.getTime() - ingresoDate.getTime()) / (1000 * 60));
  }

  private obtenerTarifaPorMinuto(): number {
    switch (this.selectedVehicle.tipoVehiculo) {
      case 'Carro':
        return 110;
      case 'Moto':
        return 50;
      case 'Bicicleta':
        return 10;
      default:
        return 0;
    }
  }

  private calcularCobroTarifa(minutosDiferencia: number, tarifaPorMinuto: number, factura: string): void {
    this.cobroTarifa = minutosDiferencia * tarifaPorMinuto;
    this.errorFactura = false
    if (this.formulario.get('factura')!.value !== '' && this.formulario.get('factura')!.value !== undefined) {
      if (factura && factura.startsWith('12345A')) {
        const descuento = 0.3 * this.cobroTarifa;
        this.cobroTarifa -= descuento;
        console.log('Descuento aplicado:', descuento);
        this.errorFactura = false
      } else {
        this.errorFactura = true
      }
    }
  }

  initForm() {
    this.formulario = this.fb.group({
      tipoVehiculo: ['', Validators.required],
      placa: ['', Validators.required],
      color: ['', Validators.required],
      horaIngreso: ['', Validators.required],
      horaSalida: ['', Validators.required],
      factura: [''],
      cobro: ['']
    });
  }

  payParking() {
    const formData = this.formulario.value;
    if (this.formulario.get('horaSalida')!.value != undefined) {
      this.modalCorrecto = true;
    } else {
      this.errorModalVisible = true;
    }
  }
  closeErrorModal() {
    this.errorModalVisible = false;
    this.modalCorrecto = false;

  }
}
