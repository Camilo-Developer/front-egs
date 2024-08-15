import { Component,OnInit  } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';
import { AuthService } from '../../../services/auth/auth.service';
import { FooterComponent } from '../../footer/footer.component';
import { DashboardService } from '../../../services/admin/dashboard/dashboard.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, NavbarComponent,FooterComponent, DashboardService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  userName: any;
  userLastname: any;
  userRole: any;
  userEmail: any;
  userCreate: any;
  role:any;

  constructor(public authService: AuthService, private router: Router, public dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.getdata();
  }

  getdata(){
    this.dashboardService.getDashboard().subscribe(
      (res) => {
        const userData = res.data;
        const userRoleData: Role[] = res.data.roles;
        this.userName = userData.name;
        this.userLastname = userData.lastname;
        this.userEmail = userData.email;
       
        this.userCreate = this.formatDate(userData.created_at);
        if (userRoleData && userRoleData.length > 0) {
          this.userRole = userRoleData.map((role: Role) => role.name).join(', ');
        } else {
          this.userRole = 'No role assigned';
        }
  
      }
    );
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('es-ES', { month: 'long' });
    const year = date.getFullYear();
    
    return `${day} de ${month} del ${year}`;
  }

  // Método para formatear la fecha en el formato deseado
 
  logout() {
    const stringValue = window.sessionStorage.getItem('userToken');
    if (stringValue !== null) {
      const tokenData = JSON.parse(stringValue);
      const token = tokenData.value;
      
      this.authService.logout(token).subscribe({
        next: () => {
          this.router.navigate(['/']);
          sessionStorage.clear();
        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
    } 
  }
}

export interface Role {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot?: {
    model_type: string;
    model_id: number;
    role_id: number;
  };
}