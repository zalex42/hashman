import styled from "styled-components";
import FlashIcon from "react-icons/lib/io/flash";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  width: 100%;
  height: 100vh;
  
  background: ${ props => props.theme.colors.base.white };
  
  z-index: 100;
`;

export const Loader = styled.img`
  width: 200px;
`;