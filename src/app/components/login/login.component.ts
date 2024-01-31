import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorLogin: boolean = false

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  //metodo para verificar que los datos del login sean correctos y almacenar la bandera en el sessionstorage
  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')!.value;
      const password = this.loginForm.get('password')!.value;
      if (username === 'josePerez@gmail.com' && password === 'park12r') {
        this.errorLogin = false
        console.log('Credenciales válidas. Ingresando...');
        sessionStorage.setItem('isLoggedIn', 'true');
        this.router.navigate(['inicio']);
      } else {
        this.errorLogin = true
        console.log('Credenciales incorrectas. No se permite el acceso.');
      }
    }
  }
}
