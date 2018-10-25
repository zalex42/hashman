import styled from 'styled-components';
import { rem, lighten, transitions } from 'polished';

export default styled.button`
  display: flex;
  padding: 8px 25px;
  font-weight: 500;
  border-radius: 4px;
  font-size: ${ rem('14px') };
  color: ${ props => props.theme.colors.base.white };
  border: 1px solid ${ props => props.theme.colors.notifications.border };
  background: ${ props => props.type ? props.theme.notifications[props.type] : props.theme.notifications.default };
  cursor: ${ props => props.disabled ? 'default' : 'pointer' };
  opacity: ${ props => props.disabled ? 0.5 : 1 };
  ${ props => transitions(`border-color ${ props.theme.variables.animation.speed }`, `color ${ props.theme.variables.animation.speed }`) };
  
  &:hover {
    color: ${ props => props.theme.colors.base.white };
    background: ${ props => lighten(0.05, props.type ? props.theme.notifications[props.type] : props.theme.notifications.default) };
    border-color: ${ props => lighten(0.05, props.type ? props.theme.notifications[props.type] : props.theme.notifications.default) };
  }
`;