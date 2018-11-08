import React, { Component } from 'react';
import { Checkbox } from '~/components/Form';
import { Filter, FilterIcon, FilterModal } from './styles';
import enhanceWithClickOutside from 'react-click-outside';

@enhanceWithClickOutside
export default class extends Component
{
    constructor(props, context)
    {
        super(props, context);

        this.state = {
            data: this.props.data,
            opened: false
        };
    }

    componentWillReceiveProps(nextProps)
	{
		this.setState({ data: nextProps.data });
	}

    handleClickOutside = () =>
    {
        this.setState({ opened: false });
    };

    render()
    {
        return (
            <Filter>
                <FilterIcon active={this.props.activeFilter} onClick={() => this.setState({ opened: !this.state.opened })} />
                <FilterModal opened={this.state.opened}>
                    { Object.keys(this.state.data).map((item, index) => (
                        <Checkbox key={index} name={item} onChange={(e) => this.props.change(item, e)}>
                            {item} ({ this.state.data[item] })
                        </Checkbox>
                    )) }
                </FilterModal>
            </Filter>
        );
    }
}