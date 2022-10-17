import { IonButton, IonIcon } from "@ionic/react";
import { removeCircle } from "ionicons/icons";
import { useContext } from "react";
import { hapticsNotification } from "../../../capacitor/haptics";
import { CategoriesContext } from "../../../contexts/categories.context";
import { SettingsContext } from "../../../contexts/settings.context";

interface ContainerProps {
    id: string;
    categoryIndex: number;
    itemIndex: number;
}

const EditItemsDeleteButton: React.FC<ContainerProps> = ({
    id,
    categoryIndex,
    itemIndex,
}) => {
    const { categoriesArrayEditable, setCategoriesArrayEditable } =
        useContext(CategoriesContext); // Enable categories context

    const { setIsItemsUpdated } = useContext(SettingsContext); // Enable settings context

    const deleteItem = () => {
        const newCategories = JSON.parse(
            JSON.stringify(categoriesArrayEditable)
        ); // Create a duplicate of the categories array.
        newCategories[categoryIndex].items.splice(itemIndex, 1); // remove category from array

        setCategoriesArrayEditable(newCategories); // update Categories array
        hapticsNotification("WARNING"); // Haptic feedback
    };

    return (
        <IonButton
            onClick={() => {
                deleteItem();
                setIsItemsUpdated(true);
            }}
            fill="clear"
            color="danger"
            slot="start"
        >
            <IonIcon slot="icon-only" icon={removeCircle} />
        </IonButton>
    );
};

export default EditItemsDeleteButton;
