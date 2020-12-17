import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/core/services/movie.service';
import { Movie } from 'src/app/shared/models/movie';
import { MovieDetailsModel } from 'src/app/shared/models/MovieDetailsModel';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movieId: number ;
  movieDetails : MovieDetailsModel;
  releaseDate:Date;
  constructor(private route: ActivatedRoute, private movieService:MovieService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((p) => {
      this.movieId = +p.get('id');
      console.log(this.movieId);
      // make a call to movie service to get movie details
      this.movieService.getMovieDetails(this.movieId).subscribe((m) => {
        this.movieDetails = m;
        this.releaseDate = this.parseJsonDate( this.movieDetails.releaseDate);
        console.log(this.movieDetails);
      });
    });
  }

  parseJsonDate(jsonDateString:string) : Date{
    return new Date(jsonDateString);
  };
 
}
