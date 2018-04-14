import React from 'react';
import ReactDOM from 'react-dom';
import Movie_card from "./movie_card";

// use https://stackoverflow.com/questions/42130822/display-a-overlay-when-input-is-clicked-in-react to do overlay
class MyCarouselCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            style : {
                width : 0
            }
        };
        this.openNav = this.openNav.bind(this);
        this.closeNav = this.closeNav.bind(this);
    }

    componentDidMount() {
        document.addEventListener("click", this.closeNav);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.closeNav);
    }

    openNav() {
        const style = { width : 350 };
        this.setState({ style });
        document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
        document.addEventListener("click", this.closeNav);
    }

    closeNav() {
        document.removeEventListener("click", this.closeNav);
        const style = { width : 0 };
        this.setState({ style });
        document.body.style.backgroundColor = "#F3F3F3";
    }

    render() {
        return (
          <div>

            <span style={{fontSize:30,cursor:"pointer"}} onClick={this.openNav}>
              <img width="100%" height="100%" src="https://ia.media-imdb.com/images/M/MV5BNDA1NjA3ODU3OV5BMl5BanBnXkFtZTgwOTg3MTIwNTM@._V1_SY1000_CR0,0,674,1000_AL_.jpg">
              </img>
            </span>
            <div
                ref       = "snav"
                className = "overlay"
                style     = {this.state.style}
            >
                <div className = "sidenav-container">
                    <div className = "text-center">
                      <h2>Form</h2>
                      <p>This is a sample input form</p>
                    </div>
                    <a
                        href      = "javascript:void(0)"
                        className = "closebtn"
                        onClick   = {this.closeNav}
                    >
                        ×
                    </a>
                    <div className = "list-group">
                      {/*your form component goes here */}
                      {this.props.children}
                    </div>
                </div>
            </div>
          </div>
        );
    }

}

export default MyCarouselCard;
