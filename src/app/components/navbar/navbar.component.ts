import { Component, OnInit  } from '@angular/core';
import { CanActivateFn, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import {  FormsModule, Validators, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { authGuard } from '../../guards/auth/auth.guard';
import { ProfileService } from '../../services/profile/profile.service';
import { DashboardService } from '../../services/admin/dashboard/dashboard.service';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,AuthService,FormsModule,HttpClientModule, ReactiveFormsModule, ProfileService,DashboardService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  providers: [AuthService],
})
export class NavbarComponent  implements OnInit  {
  logoutForm: FormGroup;
  activeNavbar: any = null;
  nameUser: any;
  lastnameUser: any;
  simpleNameUser: any;

  constructor(public authService: AuthService, private router: Router,public profileService: ProfileService,public dashboardService: DashboardService) { 
    this.logoutForm = new FormGroup({
      token: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit(): void {
    this.getData();
    this.getDataUser();
    this.getDataRefresh();
  }

  
  getData(): void {
    const stringValue = window.sessionStorage.getItem('userToken');
    if (stringValue !== null) {
      const tokenData = JSON.parse(stringValue);
      const token = tokenData.value;
      this.logoutForm.patchValue({
        token: token,
      });
    } 
  }

  getDataUser() {
    this.profileService.getProfile().subscribe(
      (res) => {
        console.log('Profile data received:', res);
        const userData = res.data;
        this.nameUser = userData.name;
        this.lastnameUser = userData.lastname;
        const firstLetterName = this.nameUser.charAt(0).toUpperCase();
        const firstLetterLastname = this.lastnameUser.charAt(0).toUpperCase();
        this.simpleNameUser = `${firstLetterName}${firstLetterLastname}`;
      },
      (error) => {
        console.error('Error fetching profile:', error);
      }
    );
  }

  getDataRefresh(){
     const stringValue = window.sessionStorage.getItem('userToken');
    if (stringValue === null) {
     this.getDataUser();
    }
  }

  logout() {
    // Verificar si el formulario es válido antes de enviar la solicitud
    if (this.logoutForm.valid) {
      this.authService.logout(this.logoutForm.value).subscribe(
        res => {
          this.router.navigate(['/']);
          sessionStorage.clear();
        },
        error => {
          console.error('Error:', error);
        }
      );
    } 
  }
}
