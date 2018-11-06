export default (number) => {
    const types = { 0: 'default', 1: 'success', 2: 'warning', 3: 'error', 4: 'primary' };
    return types[number];
}