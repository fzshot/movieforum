import React from 'react';
import ReactDOM from 'react-dom';
//import CommentBlock from "./commentblock";
import Movie_card from "./movie_card";
import Nav from "./nav";
import MyCarousel from "./carousel";

import {BrowserRouter as Router, Route} from "react-router-dom";

export default function tasktracker_init(root) {
  ReactDOM.render(
    <One/>, root);
}

class One extends React.Component {

  render() {
    return (
      <Router>
        <div>
          <Nav/>
          <MyCarousel />
        </div>
      </Router>
    );
  };
}
