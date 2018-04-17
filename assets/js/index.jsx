import React from 'react';
import ReactDOM from 'react-dom';

import {Layout} from "element-react";

import Movie_card from "./movie_card";
import Nav from "./nav";
import PosterCarousel from "./postercarousel";

export default function Index() {
    return (
        <Layout.Row type="flex" justify="center">
            <Layout.Col span="20" xs="24">
                <PosterCarousel/>
            </Layout.Col>
        </Layout.Row>
    );
}
