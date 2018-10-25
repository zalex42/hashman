import styled from 'styled-components';
import { rgba, rem, transitions } from 'polished';
import MenuIcon from 'react-icons/lib/io/android-menu';

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  
  display: flex;
  align-items: center;
  
  padding-right: 20px;
  padding-left: ${ props => !props.hidden ? '260px' : '20px' }
  ${ props => transitions(`padding-left ${props.theme.variables.animation.speed}`) };

  height: 50px;
  
  background: ${ props => props.theme.colors.base.white };
  border-bottom: 1px solid ${ props => rgba(props.theme.colors.base.black, 0.1) };
  
  z-index: 12;
  
  @media screen and (min-width: ${ props => props.theme.variables.breakpoints.sm }) {
    padding-left: ${ props => !props.hidden ? '260px' : '100px' };
  }
`;

export const Toggle = styled(MenuIcon)`
  flex-shrink: 0;
  
  margin-right: 25px;

  font-size: ${ rem('24px') };
  
  cursor: pointer;
`;