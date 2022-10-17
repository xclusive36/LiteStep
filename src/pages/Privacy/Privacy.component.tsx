import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import { useTranslation } from "react-i18next";
import Copyright from "../../components/Copyright/Copyright.component";
import PrivacyHeader from "./pageComponents/PrivacyHeader";

import "./Privacy.styles.css";

const Privacy: React.FC = () => {
    const { t } = useTranslation();

    return (
        <IonPage>
            <PrivacyHeader />
            <IonContent color="light" fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar color="light">
                        <IonTitle size="large">
                            <IonCardTitle className="header-title">
                                {t("PRIVACY_POLICY")}
                            </IonCardTitle>
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle className="privacy-title ion-text-uppercase">
                            LITESTEP {t("PRIVACY_POLICY")}
                        </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent className="privacy-content">
                        {t("PRIVACY_POLICY_TEXT_1")}
                    </IonCardContent>
                    <IonCardHeader>
                        <IonCardTitle className="privacy-title">
                            {t("PRIVACY_POLICY_TEXT_2")}
                        </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent className="privacy-content">
                        {t("PRIVACY_POLICY_TEXT_3")}
                    </IonCardContent>
                    <IonCardHeader>
                        <IonCardTitle className="privacy-title">
                            {t("PRIVACY_POLICY_TEXT_4")}
                        </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent className="privacy-content">
                        {t("PRIVACY_POLICY_TEXT_5")}
                        <br />
                        <br />
                        {t("PRIVACY_POLICY_TEXT_6")}
                    </IonCardContent>
                    <IonCardHeader>
                        <IonCardTitle className="privacy-title">
                            {t("PRIVACY_POLICY_TEXT_7")}
                        </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent className="privacy-content">
                        {t("PRIVACY_POLICY_TEXT_8")}
                        <br />
                        <br />
                        {t("PRIVACY_POLICY_TEXT_9")}
                    </IonCardContent>
                    <IonCardHeader>
                        <IonCardTitle className="privacy-title">
                            {t("PRIVACY_POLICY_TEXT_10")}
                        </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent className="privacy-content">
                        {t("PRIVACY_POLICY_TEXT_11")}
                        <br />
                        <br />
                        {t("PRIVACY_POLICY_TEXT_12")}
                        <br />
                        <br />
                        {t("PRIVACY_POLICY_TEXT_13")}
                        <br />
                        <br />
                        {t("PRIVACY_POLICY_TEXT_14")}
                    </IonCardContent>
                </IonCard>
                <Copyright />
            </IonContent>
        </IonPage>
    );
};

export default Privacy;
