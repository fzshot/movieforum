import React from 'react';
import ReactDOM from 'react-dom';
import Movie_card from "./movie_card";

export default function MyCarouselCard(props) {
    return <CarouselCard addr={props.addr} tmdb={props.tmdb}/>;
}

class CarouselCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            addr: props.addr,
            tmdb: props.tmdb,
        };
    }

    render() {
        let url = "https://image.tmdb.org/t/p/w400/"+this.state.addr;
        return(
            <a href={this.state.tmdb} target="_blank">
                <img className="image" src={url}/>
            </a>
        );
    }
}
