import React from 'react';
import ReactDOM from 'react-dom';
import Movie_card from "./movie_card";

export default function MyCarouselCard(props) {
    let url = "https://image.tmdb.org/t/p/w400/"+props.addr;
        return (
            <a href={props.tmdb} target="_blank">
                <img className="image" src={url}/>
            </a>
        );
}
