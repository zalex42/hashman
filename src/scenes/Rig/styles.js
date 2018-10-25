import styled from 'styled-components';
import { rem, transitions } from 'polished';
import DefaultButton from '~/components/Button';
import ZoomIcon from 'react-icons/lib/fa/search-minus';
import { Label as LabelChart } from 'recharts';

export const Buttons = styled.div`
  display: flex;
`;

export const Button = styled(DefaultButton)`
  display: flex;
  align-items: center;
  
  margin-right: 5px;
  
  &:last-child {
    margin-right: 0;
  }

  .icon {
    display: flex;
    
    font-size: ${ rem('20px') };
  }

  @media screen and (min-width: ${ props => props.theme.variables.breakpoints.xs })
  {
    span {
      display: none;
    }
  }
  
  @media screen and (min-width: ${ props => props.theme.variables.breakpoints.bg })
  {
    span {
      display: flex;
    }
    
    .icon {
      margin-right: 4px;
    }
  }
`;

export const ZoomOut = styled(ZoomIcon)`
  position: absolute;
  right: 0;
  top: 0;
  
  font-size: ${ rem('20px') };
  color: ${ props => props.theme.colors.base.dark };
  
  ${ props => transitions(`color ${ props.theme.variables.animation.speed }`) };
  
  cursor: pointer;
  
  &:hover {
    color: ${ props => props.theme.notifications.primary };
  }
`;

export const Label = styled(LabelChart)`
  font-size: ${ rem('12px') };
  color: ${ props => props.theme.colors.base.dark };
`;