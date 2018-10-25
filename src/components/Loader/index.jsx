import React from 'react';
import { Wrapper, Loader } from "./styles";

export default ({ loading, children, transparent, style }) => (
    <Wrapper style={style}>
        <Loader loading={loading} transparent={transparent} />
        { children }
    </Wrapper>
);