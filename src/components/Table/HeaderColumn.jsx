import React, { Component } from 'react';
import _ from 'lodash';
import { Column, Sorter } from './styles';
import Filter from './Filter';

export default class extends Component
{
    static defaultProps = {
        sorter: false,
        filtered: false
    };

    constructor(props, context)
    {
        super(props, context);
    }

    element = React.createRef();

    change = (item, e) => {
        if (e.target.checked)
            this.props.addFilter({ column: this.props.index, filter: item, filterFunc: (record) => record[this.props.index].includes(item) });
        else
            this.props.removeFilter({ column: this.props.index, id: item });
    };

    render()
    {
        const { label, sorter, filtered, index, activeFilter, compare, compareBy, sorterColumn, source } = this.props;

        return (
            <Column ref={(ref) => this.element = ref} style={{ width: this.props.width }}>
                <span>{ label }</span>
                { sorter ? <Sorter active={(sorterColumn === index).toString()} onClick={() => compareBy(index, compare)} /> : null }
                { filtered ? <Filter activeFilter={activeFilter} data={_.countBy(source, index)} change={this.change} /> : null }
            </Column>
        );
    }
}