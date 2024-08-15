import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthService } from './services/auth/auth.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Actualización de Organizaciones';

  auth: boolean;
  constructor(private authService: AuthService, private router: Router){

    if(this.authService.isAuthenticated()){
      this.auth = true;
    }else{
      this.auth = false;
    }
  }



}
