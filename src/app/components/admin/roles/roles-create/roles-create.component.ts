import { Component,OnInit  } from '@angular/core';
import { FooterComponent } from '../../../footer/footer.component';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, Validators, ReactiveFormsModule, FormGroup, FormControl,FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { RolesService } from '../../../../services/admin/roles/roles.service';

@Component({
  selector: 'app-roles-create',
  standalone: true,
  imports: [RouterLink, FormsModule, HttpClientModule, ReactiveFormsModule, FooterComponent],
  templateUrl: './roles-create.component.html',
  styleUrl: './roles-create.component.css'
})
export class RolesCreateComponent implements OnInit {
  roleForm: FormGroup;
  permissions: any[] = [];
  message: any;

  constructor(private fb: FormBuilder, private roleService: RolesService, private router: Router) {
    this.roleForm = this.fb.group({
      name: ['', Validators.required],
      permissions: [[], Validators.required]
    });
  }

  ngOnInit(): void {
    this.roleService.getRolesCreate().subscribe(
      (response) => {
        if (response.status) {
          this.permissions = response.data;
        } else {
          this.message = 'Error al cargar permisos';
        }
      },
      (error) => {
        this.message = 'Error al cargar permisos';
      }
    );
  }

  onSubmit(): void {
    if (this.roleForm.valid) {
      this.roleService.createRole(this.roleForm.value).subscribe(
        (res) => {
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: res.message,
            showConfirmButton: false,
            timer: 1500
          });
          this.roleForm.reset();
          this.router.navigate(['/admin/roles']); // Redirigir a la lista de roles después de la creación
        },
        (error) => {
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: error.error.message,
            showConfirmButton: false,
            timer: 1500
          });
        }
      );
    }else {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Por favor, completa todos los campos correctamente.',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  onPermissionChange(event: any): void {
    const permissionsArray = this.roleForm.get('permissions')?.value;
    if (event.target.checked) {
      permissionsArray.push(event.target.value);
    } else {
      const index = permissionsArray.indexOf(event.target.value);
      if (index > -1) {
        permissionsArray.splice(index, 1);
      }
    }
    this.roleForm.get('permissions')?.setValue(permissionsArray);
  }
}