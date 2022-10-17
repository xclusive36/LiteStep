import { createContext, useEffect, useState } from "react";
import { ReduceCount } from "../utils/ReduceCount";

export interface ItemInterface {
    id: string;
    name: string;
    count: number;
}

export interface CategoryInterface {
    id: string;
    name: string;
    items: ItemInterface[];
}
const CategoriesArray: CategoryInterface[] = [];
const CategoriesArrayEditable: CategoryInterface[] = [];

const TotalCount: number = 0;

export const CategoriesContext = createContext({
    categoriesArray: CategoriesArray,
    categoriesArrayEditable: CategoriesArrayEditable,
    totalCount: TotalCount,
    setCategoriesArray: (data: CategoryInterface[]) => {},
    setCategoriesArrayEditable: (data: CategoryInterface[]) => {},
    setTotalCount: (data: number) => {},
});

export const CategoriesProvider = ({ children }: any) => {
    const [categoriesArray, setCategoriesArray] = useState(CategoriesArray);
    const [categoriesArrayEditable, setCategoriesArrayEditable] = useState(
        CategoriesArrayEditable
    );
    const [totalCount, setTotalCount] = useState(TotalCount);

    useEffect(() => {
        let newCount = 0;
        return categoriesArray.forEach((obj) => {
            newCount = ReduceCount(obj.items) + newCount;
            setTotalCount(newCount);
        });
    }, [categoriesArray]);

    const value = {
        categoriesArray,
        categoriesArrayEditable,
        totalCount,
        setCategoriesArray,
        setCategoriesArrayEditable,
        setTotalCount,
    };

    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    );
};
