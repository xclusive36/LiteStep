export const reduceCount = (array: any[]) => {
    if (!array || !array.length) { return 0; }
    return array.reduce(function (acc, obj) { return acc + obj.count; }, 0);
}