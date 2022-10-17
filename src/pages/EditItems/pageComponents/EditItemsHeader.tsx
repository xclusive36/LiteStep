import {
    IonButton,
    IonButtons,
    IonHeader,
    IonIcon,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

import { chevronBackOutline } from "ionicons/icons";
import { CategoriesContext } from "../../../contexts/categories.context";
import { SettingsContext } from "../../../contexts/settings.context";
import { hapticsImpactLight } from "../../../capacitor/haptics";
import { objectPosition } from "../../../utils/ObjectPosition";

const EditItemsHeader: React.FC = () => {
    const { t } = useTranslation();
    const { categoriesArray, setCategoriesArrayEditable } =
        useContext(CategoriesContext); // Enable categories context
    const { setItemsEditMode, categoryID, setShowFooter } =
        useContext(SettingsContext); // Enable settings context

    const categoryIndex = objectPosition(categoriesArray, categoryID); // Get the index of the category

    return (
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonButton
                        routerLink="/items"
                        routerDirection="back"
                        onClick={() => {
                            setShowFooter(true); // Show footer
                            setCategoriesArrayEditable(categoriesArray);
                            setItemsEditMode(false);
                            hapticsImpactLight(); // Haptic feedback
                        }}
                    >
                        <IonIcon icon={chevronBackOutline} slot="start" />
                        {t("BACK")}
                    </IonButton>
                </IonButtons>
                <IonTitle>{categoriesArray[categoryIndex].name}</IonTitle>
            </IonToolbar>
        </IonHeader>
    );
};

export default EditItemsHeader;
