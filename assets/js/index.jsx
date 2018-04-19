import React from 'react';
import ReactDOM from 'react-dom';

import {Layout} from "element-react";

import Movie_card from "./movie_card";
import Nav from "./nav";
import PosterCarousel from "./postercarousel";
import ListPosts from "./listposts";
import PageBar from "./pagebar";

export default function Index() {
    return (
        <div>
            <Layout.Row type="flex" justify="center">
                <Layout.Col span="10" xs="24" sm="16" lg="10">
                    <PosterCarousel/>
                </Layout.Col>
            </Layout.Row>
            <Layout.Row type="flex" justify="center">
                <Layout.Col span="16" xs="24">
                    <ListPosts/>
                </Layout.Col>
            </Layout.Row>
            <Layout.Row type="flex" justify="center">
                <Layout.Col span="16" xs="24">
                    <PageBar/>
                </Layout.Col>
            </Layout.Row>
        </div>
    );
}
