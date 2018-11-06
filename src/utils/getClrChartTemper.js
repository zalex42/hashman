let dcColors = {};
let lastInd = 1;
import theme from '~/theme';

export function setKeys(keys) {
  keys.forEach(key => {
    if (!dcColors[key]) {
      dcColors[key] = theme.charts[lastInd];
      lastInd++;
    }
  });
}

export default key => {
  if (!key || key === '') {
    return theme.charts[0];
  }

  if (!dcColors[key]) {
    dcColors[key] = theme.charts[lastInd];
    lastInd++;
  }
  return dcColors[key];
}
