import styled from 'styled-components';
import { rgba, rem, transitions } from 'polished';
import SorterIcon from 'react-icons/lib/fa/sort';
import IconFilter from 'react-icons/lib/fa/filter';

export const Container = styled.div`
  .pagination {
    display: flex;
    justify-content: flex-start;
    
    margin-left: auto;
    
    @media screen and (min-width: ${ props => props.theme.variables.breakpoints.sm }) {
      margin-left: 20px;
    }
    
    list-style: none;
    
    @media screen and (min-width: ${ props => props.theme.variables.breakpoints.md })
    {
      justify-content: flex-end;
    }
    
    li {
      display: none;
      
      @media screen and (min-width: ${ props => props.theme.variables.breakpoints.sm }) {
        display: flex;
      }
    
      margin: 0 5px;
      
      &:first-child {
        margin-left: 0;
      }
      
      &:last-child {
        margin-right: 0;
      }
      
      &.next, &.previous {
        display: flex;
      }
      
      a {
        display: flex;
        justify-content: center;
        align-items: center;
        
        min-width: 30px;
        height: 30px;
        
        font-size: ${ rem('12px') };
        font-weight: 500;
        color: ${ props => rgba(props.theme.colors.base.black, 0.4) };
        
        border-radius: 4px;
        border: 1px solid ${ props => rgba(props.theme.colors.base.black, 0.4) };
        
        outline: none;
        cursor: pointer;
        
        ${ props => transitions(`color ${ props.theme.variables.animation.speed }`, `border-color ${ props.theme.variables.animation.speed }`) }
        
        &:hover {
          color: ${ props => props.theme.notifications.primary };
          border-color: ${ props => props.theme.notifications.primary };
        }
      }
      
      &.active a {
        color: ${ props => props.theme.notifications.primary };
        border-color: ${ props => props.theme.notifications.primary };
      }
      
      &.disabled a {
        color: ${ props => rgba(props.theme.colors.base.black, 0.1) };
        border-color: ${ props => rgba(props.theme.colors.base.black, 0.1) };
      }
      
      &.break a {
        border: 0;
      }
    }
  }
`;

export const TableContainer = styled.div`
  position: relative;
  width: 100%;
  overflow-x: auto;
`;

export const Table = styled.table`
  position: ${ props => props.fixed ? 'absolute' : 'relative' };
  top: ${ props => props.fixed ? props.top : 0 }px;

  width: 100%;
  max-width: 100%;
  
  border-collapse: separate;
  border-spacing: 0;
  word-break: normal;
  
  font-size: ${ rem('13px') };
  
  text-align: left;
  
  z-index: ${ props => props.fixed ? 2 : 1 };;
`;

export const Row = styled.tr`
  word-break: normal;

  ${ props => props.selected ? `background: ${ rgba(props.theme.colors.base.blue, 0.1) } !important` : null };
  ${ props => transitions(`background-color ${ props.theme.variables.animation.speed }`) };
  
  &:hover {
  	cursor: pointer;
    background: ${ props => rgba(props.theme.colors.base.blue, 0.1) };
  }
`;

export const Column = styled.td`
  position: relative;

  padding: 5px;
  
  line-height: 1.5;
  word-break: normal;
  
  font-weight: ${props => props.footer ? 'bold !important' : 'normal'};
  
  border-bottom: 1px solid ${ props => props.theme.table.colors.border };
  
  ${ props => props.styles };
  
  span {
    margin-right: 5px;
  }
`;

export const Header = styled.thead`
  font-weight: 500;

  background: ${ props => props.theme.table.colors.header };
  
  tr, tr:hover {
    background: ${ props => props.theme.table.colors.header };
  }
`;

export const Body = styled.tbody`
  
`;

export const Sorter = styled(SorterIcon)`
  font-size: ${ rem('11px') };
  color: ${ props => props.active === "true" ? props.theme.table.colors.active : rgba(props.theme.colors.base.dark, 0.6) };

  cursor: pointer;
  
  ${ props => transitions(`color ${ props.theme.variables.animation.speed }`) };
  
  &:hover {
    color: ${ props => props.active === "true" ? props.theme.table.colors.active : props.theme.colors.base.dark };
  }
`;

export const Filter = styled.span`
  
`;

export const FilterIcon = styled(IconFilter)`
  color: ${ props => props.active ? props.theme.table.colors.active : rgba(props.theme.colors.base.dark, 0.6) }; 

  cursor: pointer;
`;

export const FilterModal = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  
  width: calc(100% + 20px);
  max-height: 200px;
  
  overflow-y: auto;
  overflow-x: visible;
  
  display: ${ props => props.opened ? 'flex' : 'none' };
  flex-direction: column;
  
  padding: 10px;
  
  background: ${ props => props.theme.colors.base.white };
  
  box-shadow: 0 1px 4px ${ props => rgba(props.theme.colors.base.black, 0.2) };
  
  z-index: 2;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  
  @media screen and (min-width: ${ props => props.theme.variables.breakpoints.sm }) {
    flex-direction: row;
  }
  
  margin-top: 20px;
`;

export const Footer = styled(Header)`
	
`;