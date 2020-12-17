import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { HomeComponent } from 'src/app/home/home.component';
import { Login } from 'src/app/shared/models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userlogin: Login = {
    email: '',
    password: ''
  };

  invalidLogin: boolean;
  returnUrl : string;

  constructor(private authService:AuthenticationService, private router: Router, private route : ActivatedRoute, private appcompnent : AppComponent) {

   }

  ngOnInit() {
    //this doesn't work
    /*
    this.route.queryParams.subscribe(
      (params) => (this.returnUrl = params.returnUrl || '/')
    );*/
    this.returnUrl = this.appcompnent.rtUrl; 
  }

  login(){
    console.log("login component login here!");
    console.log(this.userlogin.email);
    console.log(this.userlogin.password);

    this.authService.login(this.userlogin).subscribe((response) => {
        if (response) {
          //redirect the home page
          console.log(response);
          console.log('get response!');
          this.router.navigateByUrl(this.returnUrl);
        }
      }
      , (err: any) => {
        this.invalidLogin = true;
      });
 
  }
}
