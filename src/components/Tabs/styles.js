import styled from 'styled-components';
import { rgba, rem, transitions } from 'polished';

export const Tabs = styled.div`
  
`;

export const Navigation = styled.div`
  display: flex;
  position: relative;
  
  overflow-x: auto;
  
  margin-bottom: 20px;
`;

export const NavItem = styled.div`
  position: relative;
  z-index: 2;
  padding: 10px 15px;
  
  font-size: ${ rem('14px') };

  cursor: pointer;
  
  color: ${ props => props.theme.colors.base.dark };
  border: 1px solid ${ props => props.active ? props.color ? props.color : `${props.theme.colors.base.dark} !important` : props.theme.colors.base.white };
  border-bottom-color: ${ props => props.active ? props.theme.colors.base.white : 'transparent' } !important;
  
  ${ props => transitions(`color ${props.theme.variables.animation.speed}`, `border-color ${props.theme.variables.animation.speed}`) };
  
  &:last-child {
    margin-right: 0;
  }
`;

export const Content = styled.div`
  
`;