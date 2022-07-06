import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AdminAuthService } from 'src/app/adminServices/admin-auth.service';
import { AccountControllerService } from 'api-docs/api/accountController.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router, private adminSer: AccountControllerService) { }
  // toAdpg() {
  //   this.router.navigate(['admin/books']);
  // }
  loginRequest;
  public admins = [];
  temp;
  adminname: String = "";
  password: String = "";

  // get() {
  //   this.adminSer.login(LoginRequest.)
  //     .subscribe(data => this.admins = data);
  // }

  ngOnInit() {
    // this.get();
  }
  adminSubmit(form: NgForm) {
    this.adminSer
    .login({
      username : "minhdeptrai",
      password : "anhyeuem",
      device: "Chrome 90",
      captchaToken: "capchaToken",
    })
    .subscribe((data) => {
      console.log("-----------------------------");
      console.log(data);
      console.log("-----------------------------");
      if (data._error != null) {
        alert("Invalid password...");
          this.temp = true;
      } else {
        sessionStorage.setItem("adminid", "minhdeptrai");
        this.router.navigate(['admin/books']);
        this.temp = true;
        form.reset();
      }
    });
  }

  //   this.admins.forEach(admin => {
  //     if (admin.amail == this.admin.adminname) {
  //       if (admin.apassword == this.admin.password) {
  //         console.log("Success!!");

  //         console.log(admin.id);

  //         alert("You have been successfully logged in...");

  //         //local storage
  //         sessionStorage.setItem("adminid", admin.id);
  //         this.router.navigate(['admin/books']);
  //         this.temp = true;
  //         form.reset();

  //       }
  //       else {
  //         alert("Invalid password...");
  //         this.temp = true;

  //       }
  //     } else {
  //       form.reset();
  //     }

  //   });
  //   if (this.temp == false) {
  //     alert("Invalid admin id or password...");

  //   }
  // }
}