
import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, FormArray} from '@angular/forms';
import { DataService } from '../data.service';

import { CommonModule } from '@angular/common';
import { Users } from '../models/Users';
import { response } from 'express';
import { Router } from '@angular/router';
import { TagInputModule } from 'ngx-chips';

@Component({
  selector: 'app-registration',
  standalone: true,
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  imports:[FormsModule, CommonModule,ReactiveFormsModule,TagInputModule],
  providers: [DataService]
})
export class RegistrationComponent implements OnInit {

  ngOnInit(): void {

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


  
  users: Users = new Users("", "", "", "home", "", "", "", "", "Male", 18, "", "");

  registrationForm: FormGroup|any;
  file: any;
  user:any;
  constructor(private fb: FormBuilder, private dataService: DataService,private router: Router) {
    this.registrationForm = this.fb.group({
      firstname: ['', Validators.required, Validators.pattern(/^[a-zA-Z]{1,20}$/)],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      addresstype: ['home'],
      homeaddress1: [''],
      homeaddress2: [''],
      companyaddress1: [''],
      companyaddress2: [''],
      gender: ['Male'],
      age: [18],
      interests: [[], Validators.required],
      profilePhoto: [null]
    });
  }

 

  populateForm(user: any): void {
    this.registrationForm.patchValue({
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
      profilePhoto: user.profilePhoto
    });

    this.registrationForm.setControl('interests', this.fb.array(user.interests || []));
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.users.profilePhoto = reader.result as string;
      };
      reader.onerror = (error) => {
        console.error('File reading error:', error);
      };
    }
  }

  get interests(): FormArray {
    return this.registrationForm.get('interests') as FormArray;
  }

  addInterest(event: any): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.interests.push(this.fb.control(value.trim()));
    }

    if (input) {
      input.value = '';
    }
  }

  removeInterest(index: number): void {
    this.interests.removeAt(index);
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      this.users.firstname = this.registrationForm.get('firstname').value;
      this.users.lastname = this.registrationForm.get('lastname').value;
      this.users.email = this.registrationForm.get('email').value;
      this.users.addresstype = this.registrationForm.get('addresstype').value;
      this.users.homeaddress1 = this.registrationForm.get('homeaddress1').value;
      this.users.homeaddress2 = this.registrationForm.get('homeaddress2').value;
      this.users.companyaddress1 = this.registrationForm.get('companyaddress1').value;
      this.users.companyaddress2 = this.registrationForm.get('companyaddress2').value;
      this.users.gender = this.registrationForm.get('gender').value;
      this.users.age = this.registrationForm.get('age').value;
      this.users.interests = this.registrationForm.get('interests').value;

      this.dataService.saveRegistration(this.users).subscribe({
        next: (response) => {
          console.log(response);
          alert("Submitted");
          this.router.navigate(['/user-interface'], { state: { user: this.users } });
        
          console.log(this.users);
          this.closePopup();
         
          // this.router.navigate(['/user-interface'], { state: { user: this.users } });
        },
        error: (error) => {
          console.error('There was an error!', error);
          alert(`Error: ${error}`);
        },
        complete: () => {
          console.log("Request complete");
          console.log("User Interface login");
        }
      });
    }
  }
}