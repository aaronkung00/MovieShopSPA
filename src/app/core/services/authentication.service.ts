import { Injectable } from '@angular/core';
import { Observable , BehaviorSubject} from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { Login } from 'src/app/shared/models/login';
import { ApiService } from './api.service';
import { JwtStorageService } from './jwt-storage.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { User } from 'src/app/shared/models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private user : User;

  private currentLogedInUserSubject = new BehaviorSubject<User>( {} as User );
  public currentLogedInUser = this.currentLogedInUserSubject.asObservable();
  private isUserAuthenticatedSubject = new BehaviorSubject<boolean> (false);
  public isUserAuthenticated = this.isUserAuthenticatedSubject.asObservable();

  constructor(private apiService:ApiService,private jwtStorageService: JwtStorageService) { }

  // login component will call this one
  login(userLogin: Login): Observable<boolean> {
    return this.apiService.create('account/login', userLogin).pipe(
      map((response) => {
        if (response) {
          console.log(response);
          // once we get the JWT token from API,  Angular will save that token in local storage
          this.jwtStorageService.saveToken(response.token);
          // then decode that token and fill up User object
          //this.decodeJWT();
          this.populateLogedInUserInfo();
          return true;
        }
        console.log('outside if block');
        console.log(response);
        return false;
      })
    );
  }
 
  private decodeJWT(): User | null{
    // get the token from storage
    const token = this.jwtStorageService.getTocken();
    // check token is not null and is not expired
    if(!token || new JwtHelperService().isTokenExpired(token)){
      return null;
    }
    // decode the token and create user object
    const decodedToken =  new JwtHelperService().decodeToken(token);
    console.log(decodedToken);
    this.user = decodedToken;
    return this.user;
  }

  populateLogedInUserInfo(){
    if(this.jwtStorageService.getTocken()){
      
      const token = this.jwtStorageService.getTocken();
      const decodedToken = this.decodeJWT();
     
      this.currentLogedInUserSubject.next(decodedToken as User);
      this.isUserAuthenticatedSubject.next(true);
    }
  }

  register(){}
  
  logout(){
    // remove token from storage 
    this.jwtStorageService.destoryToke();
    this.currentLogedInUserSubject.next({} as User);
    this.isUserAuthenticatedSubject.next(false);

  }
  
}
