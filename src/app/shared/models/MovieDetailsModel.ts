import { Cast } from './cast';
import { Genre } from './genre';

export interface MovieDetailsModel {
    id: number;
    title: string;
    posterUrl: string;
    backdropUrl: string;
    rating?: any;
    overview: string;
    tagline: string;
    budget: number;
    revenue: number;
    imdbUrl: string;
    tmdbUrl: string;
    releaseDate: string;
    runTime: number;
    price: number;
    originalLanguage?: any;
    casts: Cast[];
    genres: Genre[];
  }
  
  