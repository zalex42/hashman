export default (memory) => {
    // const power = ['Bit', '', 'KByte', 'MByte', 'GByte'];

    // let i = 0;

    // if (memory < 8) return `${ memory } ${power[0]}`;

    // memory /= 8;
    // i++;

    // while (memory >= 1024)
    // {
    //     memory /= 1000;
    //     i++;
    // }

    // return (memory === 0) ? 0 : `${parseFloat(memory).toFixed(2)} ${power[i]}`;
    return `${parseFloat(memory / 1024).toFixed(2)} MByte`;
}