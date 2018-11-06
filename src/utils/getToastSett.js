import { getColorClass } from './getColorType';

export default (type, sett) => {
  const defaultSett = {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 80,
    className: getColorClass(type)
  }

  return Object.assign(defaultSett, sett);
}
