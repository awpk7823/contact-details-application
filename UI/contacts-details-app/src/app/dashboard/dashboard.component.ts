import { Component, OnInit } from '@angular/core';
import { faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { freeApiService } from '../services/freeapi.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  faEnvelopeOpen = faEnvelopeOpen
  faPhone = faPhone
  email: any;
  contactsList:any = [];
  cardsMessage = "";
  cardColor:any;
  closeResult = '';

  addContactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required)
  });
  randomItem: any;

  constructor(private _freeApiService:freeApiService,
    private router: Router,
    private modalService: NgbModal)
    {
    this.email = localStorage.getItem("userEmail");
  }

  ngOnInit(): void {

    this.email = localStorage.getItem("userEmail");

    this._freeApiService.getAllContacts(this.email)
    .subscribe((res: any) => {
      this.contactsList = res;
      if (this.contactsList.length==0) {
        this.cardsMessage = "You don't have contacts! Please add a new contact.";
      } else {
        this.cardsMessage = "";
      }
    })
  }

  deleteContact(contact:any){
    console.log("Contact to be deleted = "+contact.email)
    this._freeApiService.deleteContact(this.email, contact).subscribe((res: any) => {
      this.ngOnInit();
      alert("Contact deleted successfully!")
    })
  }
}