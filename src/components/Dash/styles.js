import styled from 'styled-components';
import { rgba, rem } from 'polished';

export const Wrapper = styled.div`
    display: flex;
    flex: 1;
    
    min-width: 300px;
    
    color: ${ props => props.theme.colors.base.white };
    
    background: ${ props => props.theme.colors.notifications[props.type] };
    
    &:first-child {
      margin-left: 0;
    }
    
    &:last-child {
      margin-right: 0;
    }
`;

export const Icon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    
    width: 90px;
    
    font-size: ${ rem('30px') };
    
    background: ${ props => rgba(props.theme.colors.base.black, 0.1) };
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    
    padding: 20px;
`;

export const Number = styled.div`
    margin-bottom: 5px;

    font-size: ${ rem('30px') };
    font-weight: 500;
`;

export const Text = styled.div`
    font-size: ${ rem('16px') };
    font-weight: 400;
`;