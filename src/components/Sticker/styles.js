import styled from 'styled-components';
import { rgba, rem } from 'polished';

export const Container = styled.div`
  display: flex;
  
  width: 100%;
  height: calc(100% - 20px);
  
  margin-bottom: 20px;
  
  border-radius: 10px;
  
  overflow: hidden;
  
  background: ${ props => props.color ? props.color : props.type ? props.theme.notifications[props.type] : props.theme.notifications.default };
`;

export const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 79px;
  
  font-size: ${ rem('28px') };
  color: ${ props => props.theme.colors.base.white };
  
  background: ${ props => rgba(props.theme.colors.base.black, 0.05) };
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  
  padding: 20px;
  
  color: ${ props => props.theme.colors.base.white };
`;

export const Text = styled.div`  
  font-size: ${ rem('16px') };
  font-weight: 500;
  line-height: 1.3;
`;

export const Title = styled.h3`
  margin-top: 5px;

  font-size: ${ rem('14px') };
  font-weight: 400;
`;