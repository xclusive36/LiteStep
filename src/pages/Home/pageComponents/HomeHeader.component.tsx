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

import { CategoriesContext } from "../../../contexts/categories.context";
import { hapticsImpactLight } from "../../../capacitor/haptics";
import { chevronForwardOutline, menuOutline } from "ionicons/icons";

const HomeHeader: React.FC = () => {
    const { t } = useTranslation();
    const { categoriesArray, setCategoriesArrayEditable } =
        useContext(CategoriesContext); // Enable categories context

    return (
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonButton routerLink="/menu" routerDirection="back">
                        <IonIcon slot="icon-only" icon={menuOutline} />
                    </IonButton>
                </IonButtons>
                <IonTitle>{t("CATEGORY_TITLE")}</IonTitle>
                <IonButtons slot="end">
                    <IonButton
                        disabled={categoriesArray.length === 0}
                        onClick={() => {
                            setCategoriesArrayEditable(categoriesArray);
                            hapticsImpactLight();
                        }}
                        routerLink="/edit-categories"
                    >
                        {t("EDIT")}
                        <IonIcon slot="end" icon={chevronForwardOutline} />
                    </IonButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
    );
};

export default HomeHeader;
