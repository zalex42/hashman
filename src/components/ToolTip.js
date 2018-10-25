import styled from 'styled-components';
import { rgba, rem } from 'polished';

export const Container = styled.div`
  display: flex;
  
  font-size: ${ rem('14px') };
  color: ${ props => props.theme.colors.base.white };
  
  background: ${ props => rgba(props.theme.colors.base.black, 0.6) };
`;

export const Content = styled.div`

`;

export const Date = styled.div`
  padding: 5px 20px;
  
  font-weight: bold;
`;

export const Item = styled.div`
  display: flex;
  
  padding: 2px 20px;

  color: ${ props => props.color ? props.color : props.theme.colors.base.dark };

  background: ${ props => props.theme.colors.base.white };
`;

export const Name = styled.div`
  margin-right: 5px;

  font-weight: bold;
`;

export const Text = styled.div`
  
`;