import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class freeApiService{

    private host: string = "http://localhost:8080";

    constructor(private httpClient:HttpClient){

    }
    registerUser(user:any){
        console.log("In register user service.")
        return this.httpClient.post(`${this.host}/register`, user);
    }

    loginUser(user: any) {
        console.log("In login user service.")
        return this.httpClient.post(`${this.host}/login/${user.email}`, user.password);
    }

    addContact(contact: any, email: any) {
        console.log(JSON.stringify(contact))
        return this.httpClient.put(`${this.host}/addContact/${email}`, contact);
    }

    getAllContacts(email:any){
        return this.httpClient.get(`${this.host}/getAllContacts/${email}`);
    }

    getUser(email: string | null) {
        return this.httpClient.get(`${this.host}/getUser/${email}`);
    }

    deleteContact(userEmail:string, contact:any) {
        return this.httpClient.put(`${this.host}/deleteContact/${userEmail}`, contact);
    }

    editContact(userEmail:string|null, contact:any) {
        return this.httpClient.put(`${this.host}/editContact/${userEmail}`, contact);
    }
}