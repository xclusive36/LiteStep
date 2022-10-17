import { IonItem } from "@ionic/react";
import { useStorage } from "@capacitor-community/storage-react";
import { useContext, useRef } from "react";
import { useTranslation } from "react-i18next";

import { CategoriesContext } from "../../../contexts/categories.context"; // import CategoryInterface from context
import { SettingsContext } from "../../../contexts/settings.context";
import { objectPosition } from "../../../utils/ObjectPosition";
import { RandomId } from "../../../utils/RandomId";
import { Sanitize } from "../../../utils/Sanitize";
import { hapticsNotification } from "../../../capacitor/haptics";
import Input from "../../../components/Input/Input.component";

interface ContainerProps {
    contentRef: React.MutableRefObject<any>;
}

const AddNewItem: React.FC<ContainerProps> = ({ contentRef }) => {
    const { t } = useTranslation();
    const { set } = useStorage();
    const { categoriesArray, setCategoriesArray, setCategoriesArrayEditable } =
        useContext(CategoriesContext); // Enable categories context
    const { categoryID } = useContext(SettingsContext); // Enable settings context
    const { pickMode } = useContext(SettingsContext); // Enable settings context
    const newCategories = [...categoriesArray]; // Create a copy of the categories array
    const addItemBoxRef = useRef<any>(null); // Set the add box ref as null

    const submitNewItem = (event: any) => {
        event.preventDefault(); // Prevent the page from refreshing
        let newItemName = addItemBoxRef.current.value; // Get the category name from the add box
        Sanitize(newItemName); // Sanitize the category name

        if (/^\s*$/.test(newItemName)) {
            return;
        } // If new name is empty, do nothing

        const newItem = {
            // Create a new category item
            id: RandomId(), // Generate a random id
            name: newItemName, // Set the name to the new search text
            count: 0, // Set the count to 0
        };

        const categoryIndex = objectPosition(newCategories, categoryID); // Get the index of the category in the categories array

        newCategories[categoryIndex].items.push(newItem); // Push the new item to the categories array
        setCategoriesArray(newCategories); // Set the new array as the categories
        set("categories", JSON.stringify(newCategories)); // Update storage
        setCategoriesArrayEditable(newCategories); // Set the new array as the categories
        addItemBoxRef.current.value = ""; // Clear the add box
        setTimeout(() => {
            // Wait for the new category item to be added to the list
            hapticsNotification("SUCCESS"); // Haptic feedback
            contentRef.current.scrollToBottom(300); // Scroll to the bottom of the list
        }, 100);
    };

    return (
        <form onSubmit={submitNewItem}>
            <IonItem
                className={
                    pickMode
                        ? "ion-margin-top animate__animated animate__faster animate__fadeOut"
                        : "ion-margin-top animate__animated animate__faster animate__fadeIn"
                }
                lines="full"
            >
                <Input
                    inputRef={addItemBoxRef}
                    placeholder={t("ITEM_PLACEHOLDER")}
                />
            </IonItem>
        </form>
    );
};

export default AddNewItem;
