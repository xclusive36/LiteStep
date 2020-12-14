import { PackageInterface } from "../Interfaces/Interfaces";
import { objectPosition } from "./ObjectPosition";

export const setColor = (id: string, array: PackageInterface[], menuIndex: number) => {
    let index = objectPosition(array, id)
    if (index === menuIndex) return true;
    return false;
}