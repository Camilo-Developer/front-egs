import { Component } from '@angular/core';

import { Router, RouterLink } from '@angular/router';
import {  FormsModule, Validators, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { FooterComponent } from '../../footer/footer.component';
import { ProductsService } from '../../../services/admin/products/products.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink,FormsModule,HttpClientModule, ReactiveFormsModule,FooterComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  productForm: FormGroup;
  errorMessage: string = '';
  products:any;
  isEditMode: boolean = false;
  editProductId: number | null = null;

  constructor(private productsService: ProductsService, private router: Router){
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      version: new FormControl('', [Validators.required]),
    });
    this.getProducts();
  }

  getProducts(){
    this.productsService.getProducts().subscribe((data: any) => {
      this.products = data.data;
    });
  }

  openModal(){
    const modalDiv = document.getElementById('updateCreate');
    if(modalDiv != null){
      modalDiv.style.display = 'block';
      modalDiv.style.background = '#9191917a';
      document.body.style.overflow = 'hidden';
    }
  }
  closeModal(){
    const modalDiv = document.getElementById('updateCreate');
    if(modalDiv != null){
      modalDiv.style.display = 'none';
      document.body.style.overflowX = 'hidden';
      document.body.style.overflowY = 'scroll';
      this.errorMessage = '';
      this.productForm.reset();
      this.isEditMode = false;
      this.editProductId = null;
    }
  }





  createProduct() {
    if (this.productForm.valid) {
      const stateData = this.productForm.value;
      if (this.isEditMode && this.editProductId !== null) {
        this.updateProduct(this.editProductId, stateData);
      } else {
        this.productsService.createProduct(stateData).subscribe(
          (res) => {
            this.products.push(res.data);
            Swal.fire({
              toast: true,
              position: "top-end",
              icon: 'success',
              title: res.message,
              showConfirmButton: false,
              timer: 1500
            });
            this.closeModal();
            this.productForm.reset();
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

  deleteProduct(id: number) {
    Swal.fire({
      title: '¿Estás seguro de eliminar este producto?',
      text: "¡No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productsService.deleteProduct(id).subscribe(
          (res) => {
            this.products = this.products.filter((product: any) => product.id !== id);
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


  editProduct(state: any) {
    this.isEditMode = true;
    this.editProductId = state.id;
    this.productForm.patchValue({
      name: state.name,
      version: state.version
    });
    this.openModal();
  }

  updateProduct(id: number, stateData: any) {
    this.productsService.updateProduct(id, stateData).subscribe(
      (res) => {
        const index = this.products.findIndex((state: any) => state.id === id);
        if (index !== -1) {
          this.products[index] = res.data;
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
        this.productForm.reset();
        this.isEditMode = false;
        this.editProductId = null;
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
