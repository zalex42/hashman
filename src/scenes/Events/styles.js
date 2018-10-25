import styled from 'styled-components';

export const Message = styled.div`
  color: ${ props => props.type ? props.theme.notifications[props.type] : props.theme.colors.base.dark };
`;