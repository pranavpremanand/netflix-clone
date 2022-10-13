import React, { useEffect, useState } from "react";
import "./RowPosts.css";
import axios from "../../axios";
import { API_KEY, imgUrl } from "../../constants/constants";
import YouTube from "react-youtube";

function RowPosts(props) {
  const [movies, setMovies] = useState([]);
  const [videoUrl, setVideoUrl] = useState();
  useEffect(() => {
    axios
      .get(props.url)
      .then((response) => {
        console.log(response.data);
        setMovies(response.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  const showTrailer = (id) => {
    axios
      .get(
        `movie/
    ${id}/videos?api_key=${API_KEY}&language=en-US`
      )
      .then((response) => {
        if (response.data.results.length !== 0) {
          setVideoUrl(response.data.results[0]);
        } else {
          alert("No URL");
        }
      });
  };
  return (
    <div className="row">
      <h2>{props.title}</h2>
      <div className="posters">
        {movies.map((movie) => {
          return (
            <div className="all_posters">
              <img
                onClick={() => {
                  showTrailer(movie.id);
                }}
                className={props.isSmall ? "small_poster" : "poster"}
                src={`${imgUrl + movie.backdrop_path}`}
                alt="poster"
              />
              <h3>{movie.title}</h3>
            </div>
          );
        })}
      </div>
      {videoUrl && <YouTube videoId={videoUrl.key} opts={opts} />}
    </div>
  );
}

export default RowPosts;
