import { IonButton, IonIcon } from "@ionic/react";
import { removeCircle } from "ionicons/icons";
import { useContext } from "react";
import { hapticsNotification } from "../../../capacitor/haptics";
import { CategoriesContext } from "../../../contexts/categories.context";
import { SettingsContext } from "../../../contexts/settings.context";

interface ContainerProps {
    id: string;
    index: number;
}

const EditCategoriesDeleteButton: React.FC<ContainerProps> = ({
    id,
    index,
}) => {
    const { categoriesArrayEditable, setCategoriesArrayEditable } =
        useContext(CategoriesContext); // Enable categories context

    const { setIsCategoriesUpdated } = useContext(SettingsContext); // Enable categories context

    const deleteCategory = (
        categoryEditableID: string,
        categoryIndex: number
    ) => {
        const newCategories = [...categoriesArrayEditable]; // Create a duplicate of the categories array.
        newCategories.splice(categoryIndex, 1); // remove category from array

        setCategoriesArrayEditable(newCategories); // update Categories array
        hapticsNotification("WARNING"); // Haptic feedback
    };

    return (
        <IonButton
            onClick={() => {
                deleteCategory(id, index);
                setIsCategoriesUpdated(true);
            }}
            fill="clear"
            color="danger"
            slot="start"
        >
            <IonIcon slot="icon-only" icon={removeCircle} />
        </IonButton>
    );
};

export default EditCategoriesDeleteButton;
