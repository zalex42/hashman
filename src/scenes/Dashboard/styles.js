import styled from 'styled-components';
import { transitions } from 'polished';

export const Container = styled.div`
    display: flex;
    
    min-width: 320px;
    min-height: 100vh;

    padding-top: 50px;
    margin-left: ${ props => !props.hidden ? '80' : '0' };
    
    ${ props => transitions(`margin-left ${ props.theme.variables.animation.speed }`) };

    background: ${ props => props.theme.colors.base.bg };
    
    @media screen and (min-width: ${ props => props.theme.variables.breakpoints.sm }) {
        margin-left: ${ props => props.hidden ? '80px' : '240px' };
    }
    
    a {
      color: ${ props => props.theme.notifications.primary };
      text-decoration: none;
    }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  
  width: 100%;
  
  padding: 20px;
`;