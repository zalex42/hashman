export default (hashrate) => {
    const power = ['H', 'KH', 'MH', 'GH', 'TH', 'PH'];

    let i = 0;

    if (hashrate === 0) return hashrate;

    while (hashrate >= 1000)
    {
        hashrate /= 1000;
        i++;
    }

    return (hashrate === 0) ? 0 : `${parseFloat(hashrate).toFixed(2)} ${power[i]}/s`;
}