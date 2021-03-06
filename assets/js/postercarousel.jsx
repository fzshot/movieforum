import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import {Carousel} from 'element-react';

import store from "./store";
import MyCarouselCard from "./carouselcard"

function PosterCarousel(props) {
    return <PosterClass height={props.height} />;
}

class PosterClass extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            height: props.height,
            img: [],
        };
        this.getImg();
    }

    getImg() {
        let path = "https://api.themoviedb.org/3/movie/now_playing?api_key=864fe4c5e0531ee91e15a17f6704b16a&language=en-US&page=1&region=US";
        let tmdb = "https://www.themoviedb.org/movie/"
        $.ajax(path, {
            method: "get",
            success: (resp) => {
                let data = _.map(resp.results, (poster) => {
                    return {
                        addr: poster.poster_path,
                        tmdb: tmdb+poster.id,
                    };
                });
                this.setState({img: data});
            },
        });
    }

    updateDimensions(){
        let height = $(".image").height();
        let newHeight = height+"px";
        store.dispatch({
            type: "SET_HEIGHT",
            data: newHeight,
        });
        this.setState({height: newHeight});
    }

    componentWillMount() {
        window.addEventListener("load", this.updateDimensions.bind(this));
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("load", this.updateDimensions.bind(this));
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    render() {
        let list = [];
        _.each(this.state.img, (img, index) => {
            list.push(
              <Carousel.Item key={index}>
                  <MyCarouselCard  tmdb={img.tmdb} addr={img.addr}/>
              </Carousel.Item>
            );
        });
        return(
          <Carousel interval="4000" type="card" height={this.state.height}>
              {list}
          </Carousel>
        );
    }
}

function state2props(state) {
    return {
        height: state.height,
    };
}

export default connect(state2props)(PosterCarousel);
