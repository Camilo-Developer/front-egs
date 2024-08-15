import { Component  } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {  FormsModule, Validators, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { StatesService } from '../../../services/admin/states/states.service';
import { FooterComponent } from '../../footer/footer.component';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-states',
  standalone: true,
  imports: [RouterLink,FormsModule,HttpClientModule, ReactiveFormsModule,FooterComponent],
  templateUrl: './states.component.html',
  styleUrl: './states.component.css'
})
export class StatesComponent {
  stateForm: FormGroup;
  errorMessage: string = '';
  states:any;
  isEditMode: boolean = false;
  editStateId: number | null = null;

  canAdminStatesIndex: boolean;

  constructor(private statesService: StatesService, private router: Router, private authService: AuthService){
    this.stateForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      type_state: new FormControl('', [Validators.required]),
    });
    this.getStates();

    this.canAdminStatesIndex = this.authService.hasPermission('admin.states.index');

    console.log(this.canAdminStatesIndex);
  }

  getStates(){
    this.statesService.getStates().subscribe((data: any) => {
      this.states = data.data;
    });
  }

  openModal(){
    const modalDiv = document.getElementById('stateCreate');
    if(modalDiv != null){
      modalDiv.style.display = 'block';
      modalDiv.style.background = '#9191917a';
      document.body.style.overflow = 'hidden';
    }
  }
  closeModal(){
    const modalDiv = document.getElementById('stateCreate');
    if(modalDiv != null){
      modalDiv.style.display = 'none';
      document.body.style.overflowX = 'hidden';
      document.body.style.overflowY = 'scroll';
      this.errorMessage = '';
      this.stateForm.reset();
      this.isEditMode = false;
      this.editStateId = null;
    }
  }

  createState() {
    if (this.stateForm.valid) {
      const stateData = this.stateForm.value;
      if (this.isEditMode && this.editStateId !== null) {
        this.updateState(this.editStateId, stateData);
      } else {
        this.statesService.createState(stateData).subscribe(
          (res) => {
            this.states.push(res.data);
            Swal.fire({
              toast: true,
              position: "top-end",
              icon: 'success',
              title: res.message,
              showConfirmButton: false,
              timer: 1500
            });
            this.closeModal();
            this.stateForm.reset();
          },
          (error) => {
            Swal.fire({
              toast: true,
              position: "top-end",
              icon: 'error',
              title: this.errorMessage,
              showConfirmButton: false,
              timer: 1500
            });
            this.errorMessage = error.error.message;
          }
        );
      }
    } else {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: 'error',
        title: 'Por favor, completa todos los campos correctamente.',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  deleteState(id: number) {
    Swal.fire({
      title: '¿Estás seguro de eliminar este estado?',
      text: "¡No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.statesService.deleteState(id).subscribe(
          (res) => {
            this.states = this.states.filter((state: any) => state.id !== id);
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
              title: this.errorMessage,
              showConfirmButton: false,
              timer: 1500
            });
            this.errorMessage = error.error.message;
          }
        );
      }
    });
  }


  editState(state: any) {
    this.isEditMode = true;
    this.editStateId = state.id;
    this.stateForm.patchValue({
      name: state.name,
      type_state: state.type_state
    });
    this.openModal();
  }

  updateState(id: number, stateData: any) {
    this.statesService.updateState(id, stateData).subscribe(
      (res) => {
        const index = this.states.findIndex((state: any) => state.id === id);
        if (index !== -1) {
          this.states[index] = res.data;
        }
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 1500
        });
        this.closeModal();
        this.stateForm.reset();
        this.isEditMode = false;
        this.editStateId = null;
      },
      (error) => {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: 'error',
          title: this.errorMessage,
          showConfirmButton: false,
          timer: 1500
        });
        this.errorMessage = error.error.message;
      }
    );
  }

}
