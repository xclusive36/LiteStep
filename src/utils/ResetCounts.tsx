import { CategoryInterface } from "../contexts/categories.context";

export const ResetAllCounts = (
    categoriesArray: CategoryInterface[],
    setCategoriesArray: (data: CategoryInterface[]) => void
) => {
    const newCategories = { ...categoriesArray };
    let success: boolean = false;

    if (newCategories.length > 0) {
        newCategories.forEach((category) => {
            category.items.forEach((item) => {
                if (item.count > 0) {
                    item.count = 0;
                    if (!success) success = true;
                }
            });
        });
    }

    if (success) setCategoriesArray(newCategories);
};
