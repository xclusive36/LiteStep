export const RandomId = () => {
    return Math.random() // Generate a random id
        .toString(36) // Convert to a string
        .replace(/[^a-z]+/g, ""); // Remove all non-alphanumeric characters
        // .substr(2, 10), // Get the first 10 characters
};
