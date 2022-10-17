import DOMPurify from 'dompurify';

export const Sanitize = (dirty: string) => {
    let clean = DOMPurify.sanitize(dirty); // Sanitize the dirty string
    clean.replace(/[^a-z0-9áéíóúñü \\.,_-]/gim, ""); // Remove all special characters
    clean.trim(); // Remove leading and trailing spaces
    return clean; // Return the clean string
};
