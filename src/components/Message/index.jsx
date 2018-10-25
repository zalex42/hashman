import React, { Component } from 'react';
import { Wrapper, Message } from "./styles";

type Props = {
    type: string,
    message: string
};

export default class extends Component<Props>
{

    success = (message) => {
        this.setState({ messages: [ ...this.state.messages, { type: 'success', message } ] });
    };

    warning = (message) => {
        this.setState({ messages: [ ...this.state.messages, { type: 'warning', message } ] });
    };

    danger = (message) => {
        this.setState({ messages: [ ...this.state.messages, { type: 'danger', message } ] });
    };

    render()
    {
        const { messages } = this.state;

        return (
            <Wrapper>
                { messages.map((item, index) => (
                    <Message key={index} type={message.type}>{ item.message }</Message>
                )) }
            </Wrapper>
        );
    }
}