import { Component } from '@angular/core';
import { Router ,RouterLink } from '@angular/router';
import {  FormsModule, Validators, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,FormsModule,HttpClientModule, ReactiveFormsModule,NavbarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [AuthService]
})
export class LoginComponent {
  loginForm: FormGroup;
  message = '';

  activeTwoAuth: any = null;

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      loginname: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
      code: new FormControl(''),
    })
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    //console.log(this.loginForm.value);

    this.authService.login(this.loginForm.value).subscribe(
      res => {
        this.router.navigate([NavbarComponent]);
        this.router.navigate(['/admin/dashboard']);
      },
      error=> {
          this.message = error.error.message;
          this.activeTwoAuth = error.error.two_factor_required;
      }
    );    
  }
}
