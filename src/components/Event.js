import styled from 'styled-components';
import { rem, transitions } from 'polished';

export default styled.div`
  margin-bottom: 10px;

  font-size: ${ rem('13px') };
  ${ props => transitions(`all ${ props.theme.variables.animation.speed }`)};
  color: ${ props => props.type ? props.theme.notifications[props.type] : props.theme.colors.base.black };
  line-height: 1.4;

  .date {
    color: ${ props => props.theme.colors.base.black };
  }

  &.new {
    background-color: white;
    padding: 5px;
    border-radius: 5px;
  }
`;