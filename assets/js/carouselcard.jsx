import React from 'react';
import ReactDOM from 'react-dom';
import Movie_card from "./movie_card";

export default function MyCarouselCard(props) {
    let url = "http://image.tmdb.org/t/p/w300/"+props.addr;
        return (
            <a href={props.tmdb} target="_blank">
                <img width="100%" height="100%"
                    src={url}
                />
            </a>
        );
}
