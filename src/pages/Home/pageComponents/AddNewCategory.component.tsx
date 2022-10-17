import { IonItem } from "@ionic/react";
import { useStorage } from "@capacitor-community/storage-react";
import { useContext, useRef } from "react";
import { useTranslation } from "react-i18next";

import { CategoriesContext } from "../../../contexts/categories.context"; // import CategoryInterface from context
import { SettingsContext } from "../../../contexts/settings.context";
import { RandomId } from "../../../utils/RandomId";
import { Sanitize } from "../../../utils/Sanitize";
import { hapticsNotification } from "../../../capacitor/haptics";
import Input from "../../../components/Input/Input.component";

interface ContainerProps {
    contentRef: React.MutableRefObject<any>;
}

const AddNewCategory: React.FC<ContainerProps> = ({ contentRef }) => {
    const { t } = useTranslation();
    const { categoriesArray, setCategoriesArray, setCategoriesArrayEditable } =
        useContext(CategoriesContext); // Enable categories context
    const { pickMode } = useContext(SettingsContext); // Enable settings context
    const newCategories = [...categoriesArray]; // Create a copy of the categories array
    const addCategoryBoxRef = useRef<any>(null); // Set the add box ref as null
    const { set } = useStorage();

    const submitNewCategory = (event: any) => {
        event.preventDefault(); // Prevent default form submit
        let newCategoryName = addCategoryBoxRef.current.value; // Get the category name from the add box
        Sanitize(newCategoryName); // Sanitize the category name

        if (/^\s*$/.test(newCategoryName)) {
            return;
        } // If new name is empty, do nothing

        const newCategoryItem = {
            // Create a new category item
            id: RandomId(), // Generate a random id
            name: newCategoryName, // Set the name to the new search text
            items: [], // Create an empty array of items
        };

        newCategories.push(newCategoryItem); // Add the new category item to the array
        set("categories", JSON.stringify(newCategories));
        setCategoriesArray(newCategories); // Set the new array as the categories
        setCategoriesArrayEditable(newCategories); // Set the new array as the categories
        addCategoryBoxRef.current.value = ""; // Clear the add box
        setTimeout(() => {
            hapticsNotification("SUCCESS"); // Haptic feedback
            // Wait for the new category item to be added to the list
            contentRef.current.scrollToBottom(300); // Scroll to the bottom of the list
        }, 100);
    };

    return (
        <form onSubmit={submitNewCategory}>
            <IonItem
                className={
                    pickMode
                        ? "ion-margin-top animate__animated animate__faster animate__fadeOut"
                        : "ion-margin-top animate__animated animate__faster animate__fadeIn"
                }
                lines="full"
            >
                <Input
                    inputRef={addCategoryBoxRef}
                    placeholder={t("CATEGORY_PLACEHOLDER")}
                />
            </IonItem>
        </form>
    );
};

export default AddNewCategory;
