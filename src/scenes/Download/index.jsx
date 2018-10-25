import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Title from '~/components/Title';
import Paper from '~/components/Paper';
import Tabs from '~/components/Tabs';

import InstrGPU from './InstrGPU';
import InstrASIC from './InstrASIC';

@hot(module)
export default class extends Component {
    getItems = () => {
        return [
            {
                label: 'GPU',
                index: 0,
                content: <Paper><InstrGPU /></Paper>
            },
            {
                label: 'ASIC',
                index: 1,
                content: <Paper> <InstrASIC /></Paper>
            },
        ]
    };

    render() {
        return (
            <div>
                <Title>Загрузки</Title>
                <Tabs
                    tabType='tab'
                    color='#89a8ff'
                    style={{
                        backgroundColor: 'white'
                    }}
                    items={this.getItems()}
                    activeItem={0} />
            </div>
        );
    }
}
