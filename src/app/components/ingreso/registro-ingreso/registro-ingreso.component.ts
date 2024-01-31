import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-ingreso',
  templateUrl: './registro-ingreso.component.html',
  styleUrls: ['./registro-ingreso.component.css']
})
export class RegistroIngresoComponent implements OnInit {
  formulario: FormGroup = new FormGroup({});
  selectedCard!: string;
  errorModalVisible: boolean = false
  modalCorrecto: boolean = false

  constructor(private fb: FormBuilder, private router: Router) {
    this.initForm()
  }

  ngOnInit(): void {
  }

  //metodo para regresar al inicio
  redirect() {
    this.router.navigate(['inicio']);
  }

  //metodo para inicializar el formulario
  initForm() {
    this.formulario = this.fb.group({
      tipoVehiculo: ['', Validators.required],
      placa: ['', Validators.required],
      modelo: ['', Validators.required],
      color: ['', Validators.required],
      horaIngreso: ['', Validators.required]
    });
  }

  //metodo para verificar si los datos del formulario estan correctos
  onSubmit() {
    const formData = this.formulario.value;
    if (this.formulario.valid) {

      this.modalCorrecto = true;
    } else {
      this.errorModalVisible = true;
      console.log(this.errorModalVisible);

    }
  }

  //metodo para cerrar el modal
  closeErrorModal() {
    this.errorModalVisible = false;
    this.modalCorrecto = false;

  }

  //metodo para cambiar el background de la card seleccionada
  selectCard(cardType: string) {
    this.selectedCard = cardType;
    this.formulario.patchValue({ tipoVehiculo: cardType });
  }
}
