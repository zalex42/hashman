import React from 'react';
import LoaderContainer from '~/components/Loader';
import { Container, Title, Subes } from "./styles";

export default ({ title, subes, style, type, children, loading, onMouseEnter, onMouseLeave }) => (
    <Container type={type} style={style} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <LoaderContainer loading={loading}>
            { title ? <Title type={type}>{title}</Title> : null }
            { subes ? (
                <Subes>
                    { Array.isArray(subes) ? subes.map((sub, index) => sub) : subes }
                </Subes>
            ) : null }
            { children }
        </LoaderContainer>
    </Container>
);