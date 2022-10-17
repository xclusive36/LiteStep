import {
    IonButton,
    IonButtons,
    IonHeader,
    IonIcon,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import { useTranslation } from "react-i18next";

import { chevronBackOutline } from "ionicons/icons";
import { useContext } from "react";
import { CategoriesContext } from "../../../contexts/categories.context";
import { hapticsImpactLight } from "../../../capacitor/haptics";
import { SettingsContext } from "../../../contexts/settings.context";

const EditCategoriesHeader: React.FC = () => {
    const { t } = useTranslation();
    const { categoriesArray, setCategoriesArrayEditable } =
        useContext(CategoriesContext); // Enable categories context
    const { setShowFooter, setIsCategoriesUpdated } =
        useContext(SettingsContext); // Enable categories context

    return (
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonButton
                        routerLink="/home"
                        routerDirection="back"
                        onClick={() => {
                            setShowFooter(true);
                            setCategoriesArrayEditable(categoriesArray);
                            setIsCategoriesUpdated(false);
                            hapticsImpactLight(); // Haptic feedback
                        }}
                    >
                        <IonIcon icon={chevronBackOutline} slot="start" />
                        {t("BACK")}
                    </IonButton>
                </IonButtons>
                <IonTitle>{t("CATEGORYEDIT_TITLE")}</IonTitle>
            </IonToolbar>
        </IonHeader>
    );
};

export default EditCategoriesHeader;
