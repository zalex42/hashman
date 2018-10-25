import styled from 'styled-components';
import { rgba, transitions, rem } from 'polished';
import { Link as RLink, NavLink } from 'react-router-dom';

export const Wrapper = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  
  display: flex;
  flex-direction: column;
  
  width: ${ props => props.type === 'big' ? '240px' : '0' };
  ${ props => transitions(`width ${props.theme.variables.animation.speed}`) };
    
  background: ${ props => props.theme.colors.sidebar.bg };
  
  z-index: 20;
  
  overflow: hidden;
  
  @media screen and (min-width: ${ props => props.theme.variables.breakpoints.sm }) {
    width: ${ props => props.type === 'big' ? '240px' : '80px' };
  }
`;

export const Logo = styled(RLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  padding: 10px 0 15px;
  
  font-size: ${ rem('21px') };
  font-weight: 300;
  
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 3px;
  
  color: ${ props => props.theme.colors.base.white };
  background-color: ${ props => rgba(props.theme.colors.base.black, 0.3) };
  ${ props => transitions(`background-color ${props.theme.variables.animation.speed}`, `width ${props.theme.variables.animation.speed}`) }
  
  img {
  	margin-bottom: 10px;
  }
  
  &:hover {
    background-color: ${ props => rgba(props.theme.colors.base.black, 0.5) };
  }
`;

export const Content = styled.nav`
  display: flex;
  flex-direction: column;

  flex: 1;
  
  padding: 35px 0;
`;

export const Link = styled(NavLink)`
  display: flex;
  justify-content: ${ props => props.type === 'big' ? 'flex-start' : 'center' };
  align-items: center;

  padding: 12px 24px;
  text-decoration: none;
  
  color: ${ props => props.theme.colors.sidebar.link };
  ${ props => transitions(`color ${props.theme.variables.animation.speed}`, `background-color ${props.theme.variables.animation.speed}`) };
  font-size: 13px;
  
  &:hover, &.active {
    color: ${ props=> props.theme.colors.base.white };
  }
  
  &.active {
    background-color: ${ props => rgba(props.theme.colors.base.black, 0.3) }
  }
`;

export const Icon = styled.span`
  display: flex;
  
  margin-right: ${ props => props.type === 'big' ? '20px' : 0 };
  
  font-size: ${ rem('24px') };
`;

export const Label = styled.span`
  display: ${ props => props.type === 'big' ? 'flex' : 'none' };
`;