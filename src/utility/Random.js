export const generateRandomArray = (length, max) => {
     return Array(length).fill().map(() => Math.ceil(Math.random() * max));
}