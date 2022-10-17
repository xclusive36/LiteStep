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

const TermsHeader: React.FC = () => {
    const { t } = useTranslation();

    return (
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonButton routerLink="/menu" routerDirection="back">
                        <IonIcon icon={chevronBackOutline} slot="start" />
                        {t("BACK")}
                    </IonButton>
                </IonButtons>
                <IonTitle>{t("TERMS_OF_USE")}</IonTitle>
            </IonToolbar>
        </IonHeader>
    );
};

export default TermsHeader;
