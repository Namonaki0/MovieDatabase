import React, { useState } from "react";
import { api_key } from "../apiKey";
import MovieTemplate from "./MovieTemplate";
import CommentModal from "./CommentModal";
import MovieModal from "./MovieModal";
import commentsHandler from "../utils/commentsBodyHandler";

export default function Library() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [user, setUsername] = useState("");
  const [comments, setComments] = useState("");
  const [movieTitle, setMovieTitle] = useState("");
  const [commentWindow, setCommentWindow] = useState(null);
  const [commentMessage, setCommentMessage] = useState("");
  const [commentMessageDisplay, setCommentMessageDisplay] = useState(null);
  const [movieModalInfo, setMovieModalInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalImage, setModalImage] = useState("");
  const [modalOverview, setModalOverview] = useState("");
  const [modalReleaseDate, setModalReleaseDate] = useState("");

  //? MOVIE TITLE SEARCH - API FETCH //
  const submitSearch = async (e) => {
    e.preventDefault();

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${query}&page=1&include_adult=false`;

    try {
      const apiCall = await fetch(url);
      const movies = await apiCall.json();
      setMovies(movies.results);
    } catch (err) {
      setErrorMessage(err);
      console.log(setErrorMessage);
    }
  };

  //? COMMENTS INPUT ------------
  const formSubmit = async (e) => {
    e.preventDefault();

    //? COMMENTS DATE AND TIME ON SUBMIT ---------------
    //? FIREBASE REALTIME DB ------------
    commentsHandler();
  };

  //? GRABS MOVIE TITLE ON CLICK FROM OFFSET-PARENT
  let movieTitleTarget = (e) => {
    setMovieTitle(
      e.target.parentElement.offsetParent.offsetParent.children[2].innerHTML
    );
  };

  //? MOVIE INFO MODAL - TITLE, IMAGE, DESCRIPTION
  let modalImageTarget = (e) => {
    setModalImage(e.target.offsetParent.childNodes[1].currentSrc);
    setModalTitle(e.target.offsetParent.childNodes[2].innerHTML);
    setModalOverview(e.target.offsetParent.childNodes[3].innerHTML);
    setModalReleaseDate(e.target.offsetParent.childNodes[4].innerHTML);
    console.dir(e.target.offsetParent);
  };

  //? //////////////////////////////////////////////

  //? MOVIE TITLE SEARCH RENDER //
  return (
    <>
      <div className="library-outter-wrapper">
        <form onSubmit={submitSearch} className="form">
          <input
            type="text"
            placeholder="movie..."
            value={query}
            name="query"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="submit">
            Search
          </button>
        </form>

        <div className="outter-wrapper">
          {movies && movies.length > 0 ? (
            <div className="movie-template">
              {movies
                .filter((movie) => movie.poster_path)
                .map(
                  (movie) =>
                    movie && (
                      <>
                        <MovieTemplate
                          movie={movie}
                          movieTitleTarget={(e) => movieTitleTarget(e)}
                          setCommentWindow={setCommentWindow}
                          movieModalInfo={movieModalInfo}
                          setMovieModalInfo={setMovieModalInfo}
                          modalImageTarget={modalImageTarget}
                        />
                        <MovieModal
                          movie={movie}
                          movieModalInfo={movieModalInfo}
                          setMovieModalInfo={setMovieModalInfo}
                          setCommentWindow={setCommentWindow}
                          modalImage={modalImage}
                          modalTitle={modalTitle}
                          modalOverview={modalOverview}
                          modalReleaseDate={modalReleaseDate}
                        />
                      </>
                    )
                )}

              <CommentModal
                setComments={(e) => setComments(e)}
                setUsername={(e) => setUsername(e)}
                commentWindow={commentWindow}
                setCommentWindow={setCommentWindow}
                commentMessage={commentMessage}
                setCommentMessage={setCommentMessage}
                commentMessageDisplay={commentMessageDisplay}
                setCommentMessageDisplay={setCommentMessageDisplay}
                movieTitle={movieTitle}
                formSubmit={formSubmit}
              />
            </div>
          ) : (
            <div class="no-movies-message">
              <p>search for movie...</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
