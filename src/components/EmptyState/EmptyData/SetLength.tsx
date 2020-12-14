import { PackageInterface } from "../../../Interfaces/Interfaces";

export const setEmptyDataLength = (pickMode: boolean, category: PackageInterface) => {
    if(pickMode) {
        let count: number = 0;
        category.items.forEach((value) => {
            if(value.count) count++;
        });
        return count;
    }
    return category.items.length;
  }