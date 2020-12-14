export const createNewCategory = () => {
    return {
        id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        name: 'Untitled list',
        order: 0,
        items: []
      }
}