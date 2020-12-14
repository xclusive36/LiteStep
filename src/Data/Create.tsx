import { hapticsNotification } from "../capacitor/haptics";
import { createNewCategory } from "../Functions/CreateNewCategory";
import { objectPosition } from "../Functions/ObjectPosition";
import { categorySnapshot, packagesSnapshot, updateCategory, updateJunk, updateMenuIndex, updateNewItem, updatePackages } from "./DataServiceComponent";

export const createCategory = () => {
    let array = [...packagesSnapshot()];
    updateMenuIndex(array.length);
    let obj = createNewCategory();
    obj.order = array.length;
  
    array.push(obj);
    updatePackages(array);
    updateCategory(obj);
    updateNewItem(true);
    updateJunk([]);
}

export const addItem = (event: any) => {
    if(!event.target[0].value) return;
    
    let array = [...packagesSnapshot()];
    let obj = {...categorySnapshot()};
    if(array.length === 0) array.push(obj);

    obj.items.push({
      id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      name: event.target[0].value,
      order: obj.items.length,
      count: 0
    });

    let index = (objectPosition(array, obj.id));
    array[index] = obj;

    updatePackages(array);
    updateCategory(obj);
    event.target[0].value = '';
    hapticsNotification();
  }