import { Component, OnInit  } from '@angular/core';
import { ProfileService } from '../../../services/profile/profile.service';
import {  FormsModule, Validators, ReactiveFormsModule, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-password-update',
  standalone: true,
  imports: [FormsModule,HttpClientModule, ReactiveFormsModule],
  templateUrl: './password-update.component.html',
  styleUrl: './password-update.component.css',
  providers: [ProfileService]

})
export class PasswordUpdateComponent implements OnInit {
  passwordForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder,private profileService: ProfileService, private router: Router){
    this.passwordForm = this.fb.group({
      current_password: ['', Validators.required],
      new_password: ['', [Validators.required, Validators.minLength(3)]],
      confirm_password: ['', Validators.required]
    }, { validators: this.passwordsMatchValidator });
  }

  ngOnInit(): void {
  }

  // Validador personalizado para verificar si las contraseñas nuevas coinciden
  passwordsMatchValidator(group: FormGroup) {
    const new_passwordControl = group.get('new_password');
    const confirm_passwordControl = group.get('confirm_password');

    if (!new_passwordControl || !confirm_passwordControl) {
      return null; // Retorna null si los controles no están definidos
    }

    const new_password = new_passwordControl.value;
    const confirm_password = confirm_passwordControl.value;
    return new_password === confirm_password ? null : { passwordsNotMatch: true };
  }

  updatePassword(): void {
    if (this.passwordForm.valid) {
      const passwordData = this.passwordForm.value;
      this.profileService.passwordUpdate(passwordData).subscribe(
        (response) => {
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: 'success',
            title:  response.message,
            showConfirmButton: false,
            timer: 1500
          });
          this.passwordForm.reset();
        },
        (error) => {
          this.errorMessage = error.error.message;
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: 'error',
            title:  this.errorMessage,
            showConfirmButton: false,
            timer: 1500
          });
        }
      );
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: 'info',
        title:  this.errorMessage,
        showConfirmButton: false,
        timer: 1500
      });
    }
  }
}