import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { MovieDetailsComponent } from './movies/movie-details/movie-details.component';
import { MoviesComponent } from './movies/movies.component';

const routes: Routes = [

  {
    path : "",
    component: HomeComponent
  },
  {
    path: "login",
    component : LoginComponent
  },
  {
    path: "register",
    component: SignUpComponent
  },
  {
    path: "movies/:id",
    component: MovieDetailsComponent
  },
  {
    path:"movies/genre/:id", component: MoviesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
