import { updateCategory, updateJunk, updateMenuIndex } from "../Data/DataServiceComponent";
import { PackageInterface } from "../Interfaces/Interfaces";

export const setSelected = (index: number, categories: PackageInterface[]) => {
    updateMenuIndex(index);
    updateCategory(categories[index]);
    updateJunk([]);
}