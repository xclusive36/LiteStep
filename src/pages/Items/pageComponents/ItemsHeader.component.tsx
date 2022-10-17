import {
    IonButton,
    IonButtons,
    IonHeader,
    IonIcon,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import { useTranslation } from "react-i18next";

import { chevronBackOutline, chevronForwardOutline } from "ionicons/icons";
import { useContext } from "react";
import { CategoriesContext } from "../../../contexts/categories.context";
import { SettingsContext } from "../../../contexts/settings.context";
import { hapticsImpactLight } from "../../../capacitor/haptics";
import { objectPosition } from "../../../utils/ObjectPosition";

const ItemsHeader: React.FC = () => {
    const { t } = useTranslation();
    const { categoriesArray, setCategoriesArrayEditable } =
        useContext(CategoriesContext); // Enable categories context
    const { categoryID } = useContext(SettingsContext); // Enable settings context

    const categoryIndex = objectPosition(categoriesArray, categoryID); // Get the index of the category

    return (
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonButton
                        routerLink="/home"
                        routerDirection="back"
                        onClick={() => {
                            setCategoriesArrayEditable(categoriesArray);
                            hapticsImpactLight(); // Haptic feedback
                        }}
                    >
                        <IonIcon icon={chevronBackOutline} slot="start" />
                        {t("BACK")}
                    </IonButton>
                </IonButtons>
                <IonTitle>{categoriesArray[categoryIndex].name}</IonTitle>
                <IonButtons slot="end">
                    <IonButton
                        routerLink="/edit-items"
                        disabled={
                            categoriesArray[categoryIndex].items.length === 0
                        }
                        onClick={() => {
                            setCategoriesArrayEditable(categoriesArray);
                            hapticsImpactLight(); // Haptic feedback
                        }}
                    >
                        {t("EDIT")}
                        <IonIcon slot="end" icon={chevronForwardOutline} />
                    </IonButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
    );
};

export default ItemsHeader;
