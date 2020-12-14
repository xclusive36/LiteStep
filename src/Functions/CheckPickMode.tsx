export const checkPickMode = (count: number, pickMode: boolean) => {
    if(pickMode && count === 0) return 'ion-hide';
    return '';
}