import { hapticsNotification } from "../capacitor/haptics";
import { createNewCategory } from "../Functions/CreateNewCategory";
import { objectPosition } from "../Functions/ObjectPosition";
import { ItemInterface } from "../Interfaces/Interfaces";
import { categorySnapshot, itemSnapshot, menuIndexSnapshot, packagesSnapshot, updateCategory, updateMenuIndex, updatePackages } from "./DataServiceComponent";

export const deleteCategory = () => {
    hapticsNotification('WARNING')
    
    let packages = [...packagesSnapshot()];
    let obj = {...categorySnapshot()};
    let index = (objectPosition(packages, obj.id));
    packages.splice(index, 1);

    let menuIndex = menuIndexSnapshot();
    if(menuIndex > 0) menuIndex = menuIndex - 1;
    updateMenuIndex(menuIndex);
    
    updatePackages(packages);
    if(packages[menuIndex]) updateCategory(packages[menuIndex]);
    else updateCategory(createNewCategory())
    hapticsNotification('SUCCESS')
  }

  export const deleteItem = (item: ItemInterface = itemSnapshot()) => {
    hapticsNotification('WARNING')
    
    let packages = [...packagesSnapshot()];
    let obj = {...categorySnapshot()};
    let index = (objectPosition(obj.items, item.id));
    let catIndex = (objectPosition(packages, obj.id));
    obj.items.splice(index, 1);
    packages[catIndex] = obj;
    updatePackages(packages);

    hapticsNotification('SUCCESS')
  }