import { Component, OnInit } from '@angular/core';
import { Router ,RouterLink } from '@angular/router';
import {  FormsModule, Validators, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProfileService } from '../../../services/profile/profile.service';
import { PasswordUpdateComponent } from '../password-update/password-update.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink,FormsModule,HttpClientModule, ReactiveFormsModule,PasswordUpdateComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  providers: [ProfileService]

})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  errorMessage: string = '';

  constructor(private profileService: ProfileService, private router: Router) {
    this.profileForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      loginname: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile(): void {
    this.profileService.getProfile().subscribe(
      (response) => {
        const userData = response.data;
        this.profileForm.patchValue({
          name: userData.name,
          lastname: userData.lastname,
          email: userData.email,
          loginname: userData.loginname
        });
      },
      (error) => {
        this.errorMessage =  error.error.message;
      }
    );
  }

  updateProfile(): void {
    const profileData = this.profileForm.value;
    this.profileService.updateProfile(profileData).subscribe(
      (res) => {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: 'success',
          title:  res.message,
          showConfirmButton: false,
          timer: 1500
        });
        location.reload();
      },
      (error) => {
        this.errorMessage = error.error.message;
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: 'error',
          title:  this.errorMessage,
          showConfirmButton: false,
          timer: 1500
        });
      }
    );
  }
  
}
