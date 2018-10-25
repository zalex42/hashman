import React from 'react';
import { Container, Icon, Content, Text, Title } from "./styles";

export default ({ type, color, icon, title, children }) => (
        <Container type={type} color={color}>
            <Icon>{ icon }</Icon>
            <Content>
                <Text>{ children }</Text>
                <Title>{ title }</Title>
            </Content>
        </Container>
);