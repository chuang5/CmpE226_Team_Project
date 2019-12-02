//SJSU CMPE 226 Fall 2019 TEAM4
import React, { Component } from 'react';
import draw from './vis';

export default class ScatterPlot extends Component {

    componentDidMount() {
        draw(this.props);
    }

    componentDidUpdate(preProps) {
        draw(this.props);
    }

    render() {
        return (
            <div className='vis-scatterplot'/>
        )
    }
}
