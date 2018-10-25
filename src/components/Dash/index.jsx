import React from 'react';
import * as Dash from './styles';

type Props = {
    type: string,
    icon: React.Component,
    number: number | string,
    text: string
};

export default ({ type, icon, number, text }: Props) => (
    <Dash.Wrapper type={type}>
        <Dash.Icon type={type}>{ icon }</Dash.Icon>
        <Dash.Content>
            <Dash.Number>{ number }</Dash.Number>
            <Dash.Text>{ text }</Dash.Text>
        </Dash.Content>
    </Dash.Wrapper>
);