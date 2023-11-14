import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { freeApiService } from '../services/freeapi.service';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  email: any;
  contactsList:any = [];
  cardsMessage = "";

  addContactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl("", [Validators.required, Validators.pattern("^(?! )[A-Za-z0-9._-]+@[a-z0-9.]+\.[a-z]{2,6}$")]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
    type: new FormControl('', Validators.required)
  });

  constructor(
    private _freeApiService:freeApiService,
    private router: Router,
    private dashboardComponent: DashboardComponent
    ) 
    {
    this.email = localStorage.getItem("userEmail");
  }

  ngOnInit(): void {
    this.email = localStorage.getItem("userEmail");
    this._freeApiService.getAllContacts(this.email)
    .subscribe((res: any) => {
      this.contactsList = res;
      if (this.contactsList.length==0) {
        this.cardsMessage = "You don't have contacts!";
      } else {
        this.cardsMessage = "";
      }
    })
  }

  addContact(){
    this._freeApiService.addContact(this.addContactForm.value, this.email).subscribe((res: any) => {
      this.ngOnInit();
      alert("Contact added successfully!")
      this.dashboardComponent.ngOnInit();
      this.addContactForm.markAsPristine();
      this.addContactForm.markAsUntouched();
      this.addContactForm.reset();
    })
  }

}
