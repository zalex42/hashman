import styled from 'styled-components';
import { rem } from 'polished';
import { Link as RouterLink } from 'react-router-dom';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  
  width: 100%;
  height: 100vh;
  
  overflow: hidden;
  
  background: #fff;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  max-width: 500px;
  height: 100vh;
  
  padding: 70px 50px;
  
  background: ${ props => props.theme.colors.base.white };
  
  overflow-y: auto;
`;

export const Logo = styled.div`
  margin-bottom: 50px;

  font-size: ${ rem('24px') };
  font-weight: 100;
  color: ${ props => props.theme.colors.base.black };
  
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  
  input {
    margin-bottom: 15px;
  }
`;

export const Inline = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Required = styled.div`
  display: flex;
  align-items: center;
  
  font-size: ${ rem('13px') };
  color: ${ props => props.theme.colors.form.required.color };
  
  &:before {
    content: '*';
    
    margin-right: 5px;
    
    color: ${ props => props.theme.colors.form.required.star };
  }
`;

export const Link = styled(RouterLink)`
	align-self: center;
	text-align: center;
	
	color: ${ props => props.theme.colors.base.blue };
	font-size: ${ rem('14px') };
	margin-top: 20px;
`;