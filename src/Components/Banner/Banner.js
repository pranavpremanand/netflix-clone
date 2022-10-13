import React, { useState } from "react";
import "./Banner.css";
import axios from "../../axios";
import { imgUrl, API_KEY } from "../../constants/constants";
import { useEffect } from "react";
import { trending } from "../../urls";
import YouTube from "react-youtube";
function Banner() {
  const [movie, setMovie] = useState();
  const [url, setUrl] = useState();
  useEffect(() => {
    axios
      .get(trending)
      .then((response) => {
        function random() {
          const num = Math.floor(Math.random() * response.data.results.length);
          return num;
        }
        const num = random();
        setMovie(response.data.results[num]);
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
          setUrl(response.data.results[0]);
        } else {
          alert("No URL");
        }
      });
  };
  return (
    <div
      id="banner"
      className="banner"
      style={{
        backgroundImage: `url(${movie ? imgUrl + movie.backdrop_path : ""})`,
      }}
    >
      <div className="content">
        <h1 className="title">{movie ? movie.title : ""}</h1>
        <div className="banner_buttons">
          <button
            onClick={() => {
              showTrailer(movie.id);
            }}
            className="button"
          >
            Play
          </button>
          <button className="button">My list</button>
        </div>
        {url && <YouTube videoId={url.key} opts={opts} />}
        <h1 className="description">{movie ? movie.overview : ""}</h1>
      </div>
      <div className="fade_bottom"></div>
    </div>
  );
}

export default Banner;
