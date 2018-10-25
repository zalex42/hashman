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
                <Loader src="http://haashman.ru/cabinet/dist/img/logo-mini.svg" alt="Hashman" />
            </Container>
        );
    }
}