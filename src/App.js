import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from "./moviesList";

function App() {
  const [movies, setMovies] = useState([])

  const getMovieList = async () => {
    const url = "http://www.omdbapi.com/?s=star wars&apikey=69ccef59"
    const response = await fetch(url)
    const resJson = await response.json()
    const listMovies = await resJson.Search

    setMovies(listMovies)
  }  

  useEffect(() => {
    getMovieList()     
  }, []);

  return (
    <div>
      <MovieList movies={movies}/>   
    </div>
  );
}

export default App;
