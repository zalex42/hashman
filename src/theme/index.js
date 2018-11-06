import colors from './colors';
import variables from './variables';
import table from './table';
import stat from './stat';


export default {
    colors,
    variables,
    notifications: {
      default: '#595959',
      defaultBl: '#000',
      primary: '#89a8ff',
      success: '#9dd089',
      warning: '#ffa31b',
      error: '#ff6c41',
      hidden: '#a8a8a8',
      yellow: '#FFEF71'
    },
    charts: [
      '#a8a8a8', // hidden
      '#89a8ff', // primary
      '#9dd089', // success
      '#ffa31b', // warning
      '#ff6c41', // error
      '#FFEF71' // yellow
    ],
    table,
    stat
};