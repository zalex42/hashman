import styled from 'styled-components';
import { rgba } from 'polished';

export const Modal = styled.div`
	position: relative;
	
	margin: 50px auto;
	
	max-width: 500px;
	
	z-index: 4;
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