import styled from 'styled-components';
import { rem } from 'polished';
import LogoutIcon from 'react-icons/lib/fa/sign-out';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  
  flex-shrink: 0;
  
  margin-left: auto;
`;

export const Username = styled.div`
  
`;

export const Logout = styled(LogoutIcon)`
  font-size: ${ rem('24px') }
  
  margin-left: 15px;
  
  cursor: pointer;
`;