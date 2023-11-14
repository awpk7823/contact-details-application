import { Component } from '@angular/core';
import { freeApiService } from './services/freeapi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'contacts-details-app';
  userName:any;

  constructor(private _freeApiService:freeApiService,){
   
    //Get email from local storage and hence username usign service
    var email = localStorage.getItem("userEmail");

    this._freeApiService.getUser(email)
    .subscribe((res: any) => {
      this.userName = res.name;
    })

  }
}
