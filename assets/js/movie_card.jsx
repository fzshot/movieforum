import React from 'react';
import ReactDOM from 'react-dom';


export default function Movie_card(props) {
  return (
    <div className="ui card" width="100%" height="100%">
      <div className="image">
        <img src="https://ia.media-imdb.com/images/M/MV5BNDA1NjA3ODU3OV5BMl5BanBnXkFtZTgwOTg3MTIwNTM@._V1_SY1000_CR0,0,674,1000_AL_.jpg">
        </img>
      </div>

      <div className="content">
        <a className="header">Rampage</a>
        <div className="meta">
          <span className="date">Released on April 13, 2018</span>
        </div>
        <div className="description">
          Rampage is a 2018 American science fiction monster film directed by Brad Peyton.
        </div>
      </div>
      
      <div className="extra content">
        <span className="right floated">
          <i className="heart outline like icon"></i>
          17 likes
        </span>
      </div>
    </div>
  );
}
