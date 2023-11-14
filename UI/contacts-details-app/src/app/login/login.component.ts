import { Component, OnInit } from '@angular/core';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { freeApiService } from '../services/freeapi.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login', 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  faArrowCircleLeft = faArrowCircleLeft;

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.pattern("^(?! )[A-Za-z0-9._-]+@[a-z0-9.]+\.[a-z]{2,6}$")]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)]),
  });

  constructor(private _freeApiService:freeApiService,  private router: Router) {}

  ngOnInit(): void {}

  loginUser(){
    this._freeApiService.loginUser(this.loginForm.value).subscribe((res: any) => {
      if(res.status){
        localStorage.setItem('userEmail', this.loginForm.controls['email'].value);
        this.router.navigate(["dashboard"]);
      }else{
        document.getElementById("errorAlert")!.innerHTML = res.message;
        setTimeout(() => {
          document.getElementById("errorAlert")!.innerHTML = "";
        }, 3000);
      }
    })
  }
}