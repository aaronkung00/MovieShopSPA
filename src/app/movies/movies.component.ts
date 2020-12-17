import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../core/services/movie.service';
import { Movie } from '../shared/models/movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  moviesByGenre : Movie[] = [];
  genreId : number;

  constructor(private route : ActivatedRoute ,private movieService : MovieService) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe( p => {
        this.genreId = +p.get('id');
        this.movieService.getMoviesByGenre(this.genreId).subscribe( (m) =>{
          this.moviesByGenre = m;
          console.log(this.moviesByGenre);
        });

    });


  }

}
