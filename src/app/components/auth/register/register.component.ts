import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgForm,FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { HttpClient,HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink,FormsModule,HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [AuthService]
})
export class RegisterComponent {
  registerFormData = { name: '', lastname: '', email: '', loginname: '', password: '', password_confirmation: '' };
  messageError: any;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.register(this.registerFormData).subscribe({
      next: (res) => {
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.messageError = error.error.message
        //console.error('Error:', error);
      }
    });
  }
}
