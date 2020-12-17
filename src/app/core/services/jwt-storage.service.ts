import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtStorageService {

  constructor() { }

  getTocken() : string | null {
    return localStorage.getItem('token');
  }

  saveToken(token:string){
    localStorage.setItem('token',token)
  }

  destoryToke(){
    localStorage.removeItem('token');
  }
 
}
