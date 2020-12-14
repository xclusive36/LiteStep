// helper function gets index of object in array by searching by id
export const objectPosition = (array: any[], id: string) => {
    return array.findIndex(obj => obj.id === id);
}