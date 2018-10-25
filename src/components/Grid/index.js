import styled from 'styled-components';

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  
  margin: 0 -10px;
`;

export const Col = styled.div`
  padding: 0 10px;
  
  @media screen and (min-width: ${ props => props.theme.variables.breakpoints.xs })
  {
    width: calc(100% / 12 * ${ props => props.xs });
  }
  
  @media screen and (min-width: ${ props => props.theme.variables.breakpoints.sm })
  {
    width: calc(100% / 12 * ${ props => props.sm });
  }
  
  @media screen and (min-width: ${ props => props.theme.variables.breakpoints.md })
  {
    width: calc(100% / 12 * ${ props => props.md });
  }
  
  @media screen and (min-width: ${ props => props.theme.variables.breakpoints.bg })
  {
    width: calc(100% / 12 * ${ props => props.bg });
  }
  
  @media screen and (min-width: ${ props => props.theme.variables.breakpoints.lg })
  {
    width: calc(100% / 12 * ${ props => props.lg });
  }
`;