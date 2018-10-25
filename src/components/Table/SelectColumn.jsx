import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Column } from './styles';
import { CheckBox } from '~/components/Form';

export default class extends Component
{
    static defaultProps = {

    };

    state = {
		checked: false
	};

    element = null;

    componentDidMount()
    {
		this.setState({ checked: this.props.checked });
    }

    componentWillReceiveProps(nextProps)
	{
		this.setState({ checked: nextProps.checked });
	}

    render()
    {
        return (
            <Column ref={(ref) => this.element = ref}><CheckBox checked={this.state.checked} onChange={(e) => this.props.onChange(this.props.all ? this.state.checked : this.props.RigID) } /></Column>
        );
    }
}