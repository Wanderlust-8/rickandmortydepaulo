const randomGenerator = (max) => {
    const randomId = Math.floor(Math.random() * max) + 1;
    return randomId;
}
export default randomGenerator;