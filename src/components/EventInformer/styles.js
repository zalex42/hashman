import styled from 'styled-components';
import { rgba } from 'polished';

export const DarkBottom = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 15%;
    background-image: linear-gradient(to top, ${ props => rgba(props.theme.colors.base.dark, 0.6) }, transparent);
`; 