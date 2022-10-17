import { ItemReorderEventDetail } from "@ionic/react";
import { CategoryInterface } from "../contexts/categories.context";
import { objectPosition } from "./ObjectPosition";

export const reorderCategories = (
    event: CustomEvent<ItemReorderEventDetail>,
    categoriesArray: CategoryInterface[],
    setCategoriesArray: (data: CategoryInterface[]) => void
) => {
    const array = [...categoriesArray]; // make a separate copy of the array
    const element = array[event.detail.from]; // get the item that was dragged
    array.splice(event.detail.from, 1); // remove it from the array
    array.splice(event.detail.to, 0, element); // add it in the new location
    event.detail.complete(); // let the reorder know we're done reordering
    setCategoriesArray(array); // set new array to context
};

export const reorderItems = (
    event: CustomEvent<ItemReorderEventDetail>,
    categoryID: string,
    categoriesArray: CategoryInterface[],
    setCategoriesArray: (data: CategoryInterface[]) => void
) => {
    const categoryIndex = objectPosition(categoriesArray, categoryID); // get index of category
    const newCategories = JSON.parse(JSON.stringify(categoriesArray)); // make a separate copy of the array
    const element = newCategories[categoryIndex].items[event.detail.from]; // get the item that was dragged
    newCategories[categoryIndex].items.splice(event.detail.from, 1); // remove it from the array
    newCategories[categoryIndex].items.splice(event.detail.to, 0, element); // add it in the new location
    event.detail.complete(); // let the reorder know we're done reordering
    setCategoriesArray(newCategories); // set new array to context
};
