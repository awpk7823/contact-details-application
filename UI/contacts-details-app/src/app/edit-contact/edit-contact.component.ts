import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { freeApiService } from '../services/freeapi.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  editContactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl({value: '', disabled: true}, Validators.required),
    phone: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required)
  });
  email: string | null;

  constructor( private _freeApiService:freeApiService,private route: ActivatedRoute, private router: Router,private dashboardComponent: DashboardComponent  ) {
    this.email = localStorage.getItem("userEmail");

    this.route.params.subscribe(params => {
      console.log("PARAMS = "+JSON.stringify(params)); 
      console.log("PArams name = "+params.name) 
      this.editContactForm.patchValue({
        name:params.name,
        phone:params.phone,
        type:params.type,
        email:params.email
      })
    });
   }

   

  ngOnInit(): void {
    this.email = localStorage.getItem("userEmail");
  }

  editContact(){
    console.log("In edit contact!!")
    let contactToBeEdited = this.editContactForm.getRawValue();
    this._freeApiService.editContact(this.email, contactToBeEdited).subscribe((res: any) => {
      console.log("Response of edit contact = "+res)
      this.dashboardComponent.ngOnInit();
      this.editContactForm.reset();
      alert("Contact edited successfully!")
      this.router.navigateByUrl('/dashboard/addContact');
    })
  }

  discard(){
    console.log("In discard method!")
    this.router.navigateByUrl('/dashboard/addContact');
  }
}
