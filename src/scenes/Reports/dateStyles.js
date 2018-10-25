import { injectGlobal } from 'styled-components';

injectGlobal`
.InputFromTo {
	position: relative;
	z-index: 11;
	margin-bottom: 20px;
}
.InputFromTo .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #f0f8ff !important;
    color: #4a90e2;
  }
  .InputFromTo .DayPicker-Day {
    border-radius: 0 !important;
  }
  .InputFromTo .DayPicker-Day--start {
    border-top-left-radius: 50% !important;
    border-bottom-left-radius: 50% !important;
  }
  .InputFromTo .DayPicker-Day--end {
    border-top-right-radius: 50% !important;
    border-bottom-right-radius: 50% !important;
  }
  .DayPickerInput input {
  	padding: 5px 10px;
  }
  
  .InputFromTo button {
  	margin-top: 20px;
  }
`;