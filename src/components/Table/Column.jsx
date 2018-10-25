import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Column } from './styles';

export default class extends Component
{
    static defaultProps = {
        render: (value, record) => value,
        compare: (a, b) => a - b
    };

    element = null;

    componentDidMount()
    {
        this.setState({ ...this.props.onRow(this.props.record) });
        this.props.setColumnWidth(this.props.index, findDOMNode(this.element).offsetWidth);

    }

    render()
    {
        return (
            <Column ref={(ref) => this.element = ref} { ...this.props }>{ this.props.render(this.props.record[this.props.index], this.props.record) }</Column>
        );
    }
}