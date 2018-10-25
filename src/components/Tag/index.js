import styled from 'styled-components';
import { rem } from 'polished';
import getColorType from '~/utils/getColorType';


export const Group = styled.div`
  display: flex;
  flex-wrap: ${ props => props.inline ? 'nowrap' : 'wrap' }
`;

export default styled.span`
  display: inline-flex;
  margin: 2px 0;
  padding: 4px 7px;

  font-size: ${ rem('12px') };
  font-weight: ${ props => getColorType(props.type) === 'error' ? 'bold' : 300 } !important;
  color: ${ props => {
    if (props.color) {
      return props.color;
    }
    const type = getColorType(props.type); 
    return type ? props.theme.notifications[type] : props.theme.colors.base.black; 
  }};
  
  white-space: nowrap;
`;