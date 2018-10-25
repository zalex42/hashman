import React from 'react';
import { Wrapper, Text, Sub, Right, SubTitle } from './styles';

export default ({ children, sub, subtitle, right }) => (
    <Wrapper>
        <Text>
            { children }
            { sub ? <Sub type={sub.type}>{ sub.label }</Sub> : null }
            { subtitle ? <SubTitle>{ subtitle }</SubTitle> : null }
        </Text>
        { right ? <Right>{ right }</Right> : null }
    </Wrapper>
);