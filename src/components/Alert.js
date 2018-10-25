import styled from 'styled-components';
import { rem } from 'polished';

export default styled.div`
  margin-bottom: 20px;
  padding: 13px 10px;
  
  font-size: ${ rem('14px') };
  color: ${ props => props.theme.colors.base.white };
  
  border-radius: 4px;
  
  background: ${ props => props.type ? props.theme.notifications[props.type] : props.theme.notifications.default };
`;