import styled, { keyframes } from 'styled-components';
import { transparentize, animation } from 'polished';

const animate = keyframes`
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Wrapper = styled.div`
  position: relative;
  
  height: 100%;
`;

export const Loader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  
  display: ${ props => props.loading ? 'flex' : 'none' };
  justify-content: center;
  align-items: center;
  
  background: ${ props => props.transparent ? transparentize(props.transparent, props.theme.colors.base.white) : props.theme.colors.base.white };
  
  z-index: 10;
  
  &:before {
    content: '';
    
    width: 40px;
    height: 40px;
    
    border-radius: 50%;
    border: 4px solid transparent;
    border-bottom-color: ${ props => props.theme.colors.base.blue };
    
    ${ animation([animate, '1s', 'infinite', 'linear']) };
  }
`;