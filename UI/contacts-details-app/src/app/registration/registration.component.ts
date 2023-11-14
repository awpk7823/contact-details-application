import { Component, OnInit } from '@angular/core';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { freeApiService } from '../services/freeapi.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  faArrowCircleLeft = faArrowCircleLeft;
  registrationForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    email: new FormControl("", [Validators.required, Validators.pattern("^(?! )[A-Za-z0-9._-]+@[a-z0-9.]+\.[a-z]{2,6}$")]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl("", [Validators.required, Validators.minLength(6)])
  });
  
  constructor(private _freeApiService:freeApiService,  private router: Router) {}

  ngOnInit(): void {}

  registerUser(){
    console.log("In register user method")
    
    if(this.registrationForm.controls['password'].value==this.registrationForm.controls['confirmPassword'].value){
      this._freeApiService.registerUser(this.registrationForm.value).subscribe((res: any) => {
        if(res.status==true){
          alert("Successfully registered!")
          this.router.navigate(["login"]);
        }else{
          document.getElementById("errorAlert")!.innerHTML = "Registration failed! User with email "+ this.registrationForm.controls['email'].value +" already exists!"
          setTimeout(() => {
            document.getElementById("errorAlert")!.innerHTML = "";
          }, 3000);
        }
      })
    }else{
      document.getElementById("errorAlert")!.innerHTML = "Password and Confirm password do not match."
      setTimeout(() => {
        document.getElementById("errorAlert")!.innerHTML = "";
      }, 3000);
    }
  }
}