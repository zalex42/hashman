import styled from 'styled-components';
import { rem } from 'polished';

export const Group = styled.div`
  display: flex;
  flex-wrap: ${ props => props.inline ? 'nowrap' : 'wrap' }
`;

export default styled.span`
  display: inline-flex;
  margin: 2px 0;
  padding: 4px 7px;

  font-size: ${ rem('12px') };
  font-weight: ${ props => props.type === 'error' ? 'bold' : 300 } !important;
  color: ${ props => props.type ? props.theme.notifications[props.type] : props.theme.colors.base.black };
  
  white-space: nowrap;
`;