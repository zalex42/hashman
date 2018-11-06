export default function getColorType(type) {
  if (typeof type === 'number')  {
    const codes = [
      'hidden',
      'defaultBl',
      'warning',
      'error'
    ]

    type = codes[+type] || 'error';
  }

  return type;
}

export function getColorClass(type) {
  return `color-${getColorType(type)}`;
}
