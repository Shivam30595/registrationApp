import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {response} from 'express';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  constructor(private userService: UserService) { }
  get userName(): any {
    return this.registrationForm.get('userName');
  }
  get contactNumber(): any {
    return this.registrationForm.get('phoneNumber');
  }
  emailregex = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  phoneNumberPattern = '^(\\+\\d{1,3}[- ]?)?\\d{10}$';
  registrationForm;

  ngOnInit(): void {
    this.createForm();
  }
  createForm(): any {
    this.registrationForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('',  [Validators.required, Validators.pattern(this.emailregex)]),
      phoneNumber: new FormControl('',  [Validators.required, Validators.pattern(this.phoneNumberPattern)]),
      age: new FormControl('', Validators.required),
      dob: new FormControl('',  Validators.required),
      gender: new FormControl('',  Validators.required)
    });
  }

  getErrorMessage(field, length): any {
    if (this.registrationForm.get(field).hasError('required') ) {
      return 'Field is required';
    } else if (this.registrationForm.get(field).hasError('pattern')) {
      if (field === 'phoneNumber') {
        return 'Field must contain ' + `${length}` + ' characters';
      }
      return 'Enter valid details';
    } else if (this.registrationForm.get(field).hasError('minlength')) {
      return 'Field must contain atleast ' + `${length}` + ' characters';
    }
    return ;
  }

  submit(userData): void {
    console.log('data', userData);
    this.userService.checkEmailPhone(userData.email, userData.phoneNumber)
      .subscribe( (data) => {
          if (!data.length) {
            console.log('user Registered Successfullydscsdc', data);
            this.userService.registerUser(userData)
              .subscribe( (data1) => {
                  if (data1) {
                    console.log('User Registered Successfully', data1);
                    alert('User Registered Successfully');
                    this.registrationForm.reset();
                    this.registrationForm.get('userName').clearValidators();
                    this.registrationForm.get('userName').updateValueAndValidity();
                    this.registrationForm.get('email').clearValidators();
                    this.registrationForm.get('email').updateValueAndValidity();
                    this.registrationForm.get('phoneNumber').clearValidators();
                    this.registrationForm.get('phoneNumber').updateValueAndValidity();
                    this.registrationForm.get('age').clearValidators();
                    this.registrationForm.get('age').updateValueAndValidity();
                    this.registrationForm.get('dob').clearValidators();
                    this.registrationForm.get('dob').updateValueAndValidity();
                    this.registrationForm.get('gender').clearValidators();
                    this.registrationForm.get('gender').updateValueAndValidity();
                  }},
                (error) => {
                  console.log(error);
                });
          } else {
            alert('This email and phone is already in use. Please register with different creds.');
          }
          },
        (error) => {
          console.log(error);
          return false;
        });

  }

}
