import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { AuthenticationService } from './core/services/authentication.service';


 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'MovieShopSPA Hello world';
  rtUrl : string;
  constructor(private authService : AuthenticationService, private router : Router) {
    
  }

  ngOnInit(): void {
    this.authService.populateLogedInUserInfo();

    this.router.events
    .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
    .subscribe((events: RoutesRecognized[]) => {
      this.rtUrl = events[0].urlAfterRedirects;
      console.log('previous url', events[0].urlAfterRedirects);
      console.log('current url', events[1].urlAfterRedirects);
    });
  }


}
