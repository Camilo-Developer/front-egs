import { Component,OnInit  } from '@angular/core';
import { FooterComponent } from '../../../footer/footer.component';
import { Router, RouterLink,ActivatedRoute } from '@angular/router';
import { FormsModule, Validators, ReactiveFormsModule, FormGroup, FormControl,FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { RolesService } from '../../../../services/admin/roles/roles.service';
import { AuthService } from '../../../../services/auth/auth.service';


@Component({
  selector: 'app-roles-update',
  standalone: true,
  imports: [RouterLink, FormsModule, HttpClientModule, ReactiveFormsModule, FooterComponent, AuthService],
  templateUrl: './roles-update.component.html',
  styleUrl: './roles-update.component.css'
})
export class RolesUpdateComponent implements OnInit {
  roleId: any;
  roleForm: FormGroup;
  permissions: any[] = [];
  permisosId: any[] = [];
  message: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private roleService: RolesService,
    private router: Router,
    private auth: AuthService,
  ) {
    this.roleForm = this.fb.group({
      name: ['', Validators.required],
      permissions: [[], Validators.required]
    });
  }

  ngOnInit(): void {
    this.roleId = this.route.snapshot.params['id'];
    this.roleService.editRole(this.roleId).subscribe(
      (response) => {
        if (response.status) {
          this.roleForm.patchValue({
            name: response.role.name,
          });
          this.permissions = response.data;
          //esta es la encargada de decirme cuales permisos ya deben estar seleccionandos
          this.permisosId = response.permisosId;
          this.roleForm.get('permissions')?.setValue(this.permisosId);
        } else {
          this.message = 'Error al cargar el rol';
        }
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
        this.message = error.error.message;
      }
    );
  }

  onSubmit(): void {
    if (this.roleForm.valid) {
      this.roleService.updateRole(this.roleId, this.roleForm.value).subscribe(
        (response) => {
          if (response.status) {
            Swal.fire({
              icon: 'success',
              title: 'El rol se actualizó correctamente',
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate(['/admin/roles']);
            this.message = 'El rol se actualizó correctamente';

          } else {
            this.message = 'Error al actualizar el rol';
          }
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
          this.message = 'Error al actualizar el rol';
        }
      );
    }
  }

  onPermissionChange(event: any): void {
    const permissionsArray = this.roleForm.get('permissions')?.value ?? [];
    const permissionId = +event.target.value; // Ensure the value is a number

    if (event.target.checked) {
      permissionsArray.push(permissionId);
    } else {
      const index = permissionsArray.indexOf(permissionId);
      if (index > -1) {
        permissionsArray.splice(index, 1);
      }
    }
    this.roleForm.get('permissions')?.setValue(permissionsArray);
  }

  isPermissionChecked(permissionId: number): boolean {
    return this.roleForm.get('permissions')?.value.includes(permissionId);
  }
  
}