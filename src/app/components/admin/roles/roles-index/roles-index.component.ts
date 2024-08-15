import { Component } from '@angular/core';
import { FooterComponent } from '../../../footer/footer.component';
import { Router, RouterLink } from '@angular/router';
import {  FormsModule, Validators, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { RolesService } from '../../../../services/admin/roles/roles.service';

@Component({
  selector: 'app-roles-index',
  standalone: true,
  imports: [RouterLink,FormsModule,HttpClientModule, ReactiveFormsModule,FooterComponent],
  templateUrl: './roles-index.component.html',
  styleUrl: './roles-index.component.css'
})
export class RolesIndexComponent {
  roles: any;
  constructor(private rolesService: RolesService, private router: Router){
   
    this.getRoles();
  }

  getRoles(){
    this.rolesService.getRoles().subscribe((data: any) => {
      this.roles = data.data;
    });
  }

  deleteRole(id: number) {
    Swal.fire({
      title: '¿Estás seguro de eliminar este rol?',
      text: "¡No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.rolesService.deleteRole(id).subscribe(
          (res) => {
            this.roles = this.roles.filter((role: any) => role.id !== id);
            Swal.fire({
              toast: true,
              position: "top-end",
              icon: 'success',
              title: res.message,
              showConfirmButton: false,
              timer: 1500
            });
          },
          (error) => {
            Swal.fire({
              toast: true,
              position: "top-end",
              icon: 'error',
              title: error.error.message,
              showConfirmButton: false,
              timer: 1500
            });
          }
        );
      }
    });
  }

}
