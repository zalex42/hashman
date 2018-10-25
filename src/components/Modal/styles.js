import styled from 'styled-components';
import { rgba, rem } from 'polished';

export const Title = styled.h2`
  padding: 20px;
  font-size: ${ rem('20px') };
  font-weight: 500;
  color: ${ props => props.type ? props.theme.colors.base.white : props.theme.colors.base.dark };
`;

export const Modal = styled.div`
	position: relative;
	margin: 50px auto;
	max-width: 55%;
	z-index: 4;
	background: ${ props => props.type ? props.theme.notifications[props.type] : props.theme.colors.base.white };
	animation-duration: 0.8s;
	animation-name: fadein;

	@media screen and (max-width: 767px) {
		max-width: 100%;
		margin-top: 40%;
	}
`;

export const Close = styled.a`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	
	z-index: 2;
	
	cursor: pointer;
`;

export const Container = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	
	z-index: 9999;
	
	overflow-y: auto;
	
	background: ${ props => rgba(props.theme.colors.base.dark, 0.6) };
`;

export const CloseIcon = styled.a`
	position: absolute;
	top: 10px;
	right: 10px;
	cursor: pointer;
`;