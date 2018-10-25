import styled, { injectGlobal } from 'styled-components';


export const Dashes = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

injectGlobal`
	.chart-hidden {
		filter: grayscale(100%);;
		
		&:hover {
			filter: grayscale(0);
		}
	}
`;