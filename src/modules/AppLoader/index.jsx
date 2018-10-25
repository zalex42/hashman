import React, { Component } from 'react';
import { Container, Loader } from './styles';

export default class extends Component
{
    state = {
        visible: true
    };

    render()
    {
        return (
            <Container>
                <Loader src="/assets/images/logo.svg" alt="Hashman" />
                <br/>
                <div>Идёт загрузка, пожалуйста, подождите</div>
            </Container>
        );
    }
}