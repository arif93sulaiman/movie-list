import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from "./moviesList";
import MovieHeading from "./movieHeading";
import SearchBox from "./searchBox";
import AddFavorites from "./addFavourites";
import RemoveFavourite from "./removeFavourites";

function App() {
  const [movies, setMovies] = useState([])
  const [searchValue, setSearchValue] = useState("")
  const [favourites, setFavourites] = useState([])

  const getMovieList = async (searchValue ) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=69ccef59`
    const response = await fetch(url)
    const resJson = await response.json()
    
    if (resJson.Search) {
      setMovies(resJson.Search)  
    }
  }  

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie]
    setFavourites(newFavouriteList)
  }
  const removeFavouritesClick = (movie) => {
    //filter matched
    const filterMovie = favourites.filter((favourite) => favourite.imdbID !== movie.imdbID)
    setFavourites(filterMovie)
  }
  useEffect(() => {
    getMovieList(searchValue)     
  }, [searchValue]);

  

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <SearchBox setSearchValue={setSearchValue} searchValue={searchValue}/>
        <MovieHeading heading="Movies"/>
      </div>
      <div className="row">
        <MovieList 
          movies={movies}
          favouritesComponent={AddFavorites} 
          handleFavouritesClick={addFavouriteMovie}
        />   
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieHeading heading="Favourites"/>
      </div>
      <div className="row">
        <MovieList 
          movies={favourites}
          handleFavouritesClick={removeFavouritesClick}
          favouritesComponent={RemoveFavourite}/>
      </div>
    </div>
  );
}

export default App;
