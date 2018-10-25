import styled from 'styled-components';
import { rgba, rem } from 'polished';

export const Title = styled.h2`
  margin-bottom: 20px;

  font-size: ${ rem('18px') };
  font-weight: 500;
  color: ${ props => props.type ? props.theme.colors.base.white : props.theme.colors.base.dark };
`;

export const Container = styled.div`
  height: calc(100% - 20px);

  margin-bottom: 20px;
  padding: 20px;
  
  background: ${ props => props.type ? props.theme.notifications[props.type] : props.theme.colors.base.white };
  
  border: 1px solid ${ props => rgba(props.theme.colors.base.black, 0.1) };
`;

export const Subes = styled.div`
  margin-bottom: 10px;
`;