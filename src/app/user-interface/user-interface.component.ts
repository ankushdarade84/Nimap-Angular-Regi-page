import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppRoutingModule } from '../app.routes';
import { DataService } from '../data.service';
import { TagInputModule } from 'ngx-chips';
import { response } from 'express';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-user-interface',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, AppRoutingModule, TagInputModule, NgSelectModule],
  templateUrl: './user-interface.component.html',
  styleUrl: './user-interface.component.css',
  providers: [DataService]
})

export class UserInterfaceComponent implements OnInit {
  user: any;
  registrationForm: FormGroup | any;
  userId: any;

  selectedFile: String | null = null;


  constructor(private fb: FormBuilder,
    private router: Router,
    private dataService: DataService,) {

    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state && 'id' in navigation.extras.state) {
      this.userId = navigation.extras.state['id'];
    } else {
      this.userId = "";
    }


    this.registrationForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{1,20}$/)]],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      addresstype: ['home'],
      homeaddress1: [''],
      homeaddress2: [''],
      companyaddress1: [''],
      companyaddress2: [''],
      gender: ['Male'],
      age: [18],
      interests: [[]],
      profilePhoto: [null]
    });


  }




  populateForm(user: any): void {
    this.registrationForm = this.fb.group({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      addresstype: user.addresstype,
      homeaddress1: user.homeaddress1,
      homeaddress2: user.homeaddress2,
      companyaddress1: user.companyaddress1,
      companyaddress2: user.companyaddress2,
      gender: user.gender,
      age: user.age,
      profilePhoto: user.profilePhoto,
      interests: [user.interests]

      // interests:user.interests

    });


    console.log(user.interests);


  }

  ngOnInit(): void {

    this.dataService.getUserId();
    if (this.userId) {
      console.log('Received userId:', this.userId);  // Debug log
      this.userId = this.userId;
      this.getUserDetails(this.userId);
      console.log(this.getUserDetails(this.userId));
    } else {
      console.error('No userId found');


    };

  }

  getUserDetails(userId: string): void {
    this.dataService.getUserById(userId).subscribe({
      next: (response) => {
        this.user = response;
        console.log(this.user);
      },
      error: (err) => {
        console.error('Error fetching user details', err);
      }
    });
  }


  editProfile(): void {
    if (this.user) {
      this.populateForm(this.user); 
      this.openPopup(); 
    }
  }


  logout(): void {
    this.user = null;
    this.router.navigate(['/']);
  }


  openPopup(): void {
    const modal = document.getElementById('registrationModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closePopup(): void {
    const modal = document.getElementById('registrationModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }


  get interests(): FormArray {
    return this.registrationForm.get('interests') as FormArray;

  }




  onSubmit(): void {
    if (this.registrationForm.valid) {

      const userId = this.userId; 
      const updatedUserData = this.registrationForm.value;
      this.dataService.updateUser(userId, updatedUserData).subscribe(
        response => {
          console.log('User updated successfully', response);
          alert("Profile Updated")
          this.closePopup();
          this.getUserDetails(this.userId);
          this.ngOnInit()

        },
        error => {
          console.error('Error updating user', error);
        }
      );

    }
  }



  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.registrationForm.patchValue({ profilePhoto: reader.result as string });
      };
      reader.onerror = (error) => {
        console.error('File reading error:', error);
      };
    }
  }


  onlyFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
      this.selectedFile=reader.result as string;
      };
      reader.onerror = (error) => {
        console.error('File reading error:', error);
      };
    }
  }

  editPhoto(): void {
    if (this.registrationForm.valid) {

      const userId = this.userId; 
      const updatedUserData = this.registrationForm.value;
      this.dataService.updateUser(userId, updatedUserData).subscribe(
        response => {
          console.log('User updated successfully', response);
          alert("Profile Updated")
          this.closePopup();
          this.getUserDetails(this.userId);
          this.ngOnInit()

        },
        error => {
          console.error('Error updating user', error);
        }
      );

    }

  }
    //   this.dataService.updateProfilePhoto(this.userId, this.selectedFile).subscribe({
    //     next: (response) => {
    //       console.log('Profile photo updated successfully', response);
    //       alert('Profile Photo Updated');
    //       this.closePopup();
    //       this.ngOnInit();
    //     },
    //     error: (error) => {
    //       console.error('Error updating profile photo', error);
    //     }
    //   });
    // } else {
    //   alert('Please select a photo to upload.');
    // }
    // }


  openEditPhotoModal(): void {
    const modal = document.getElementById('editPhotoModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeEditPhotoModal(): void {
    const modal = document.getElementById('editPhotoModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }


}
