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
import TermsHeader from "./pageComponents/TermsHeader";

const Terms: React.FC = () => {
    const { t } = useTranslation();

    return (
        <IonPage>
            <TermsHeader />
            <IonContent color="light" fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar color="light">
                        <IonTitle size="large">
                            <IonCardTitle className="header-title">
                                {t("TERMS_OF_USE")}
                            </IonCardTitle>
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle className="privacy-title">
                            {t("TERMS_1")}
                        </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent className="privacy-content">
                        {t("TERMS_2")}
                        <br />
                        <br />
                        {t("TERMS_3")}
                    </IonCardContent>
                    <IonCardHeader>
                        <IonCardTitle className="privacy-title">
                            {t("TERMS_4")}
                        </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent className="privacy-content">
                        {t("TERMS_5")}
                        <br />
                        <br />
                        {t("TERMS_6")}
                        <br />
                        <br />
                        {t("TERMS_7")}
                        <br />
                        <br />
                        {t("TERMS_8")}
                        <br />
                        <br />
                        {t("TERMS_9")}
                        <br />
                        <br />
                        {t("TERMS_10")}
                    </IonCardContent>
                    <IonCardHeader>
                        <IonCardTitle className="privacy-title">
                            {t("TERMS_11")}
                        </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent className="privacy-content">
                        {t("TERMS_12")}
                        <br />
                        <br />
                        {t("TERMS_13")}
                    </IonCardContent>
                    <IonCardHeader>
                        <IonCardTitle className="privacy-title">
                            {t("TERMS_14")}
                        </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent className="privacy-content">
                        {t("TERMS_15")}
                        <br />
                        <br />
                        {t("TERMS_16")}
                    </IonCardContent>
                    <IonCardHeader>
                        <IonCardTitle className="privacy-title">
                            {t("TERMS_17")}
                        </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent className="privacy-content">
                        {t("TERMS_18")}
                        <br />
                        <br />
                        {t("TERMS_19")}
                        <br />
                        <br />
                        {t("TERMS_20")}
                    </IonCardContent>
                    <IonCardHeader>
                        <IonCardTitle className="privacy-title">
                            {t("TERMS_21")}
                        </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent className="privacy-content">
                        {t("TERMS_22")}
                        <br />
                        <br />
                        {t("TERMS_23")}
                    </IonCardContent>
                    <IonCardHeader>
                        <IonCardTitle className="privacy-title">
                            {t("TERMS_24")}
                        </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent className="privacy-content">
                        {t("TERMS_25")}
                        <br />
                        <br />
                        {t("TERMS_26")}
                        <br />
                        <br />
                        {t("TERMS_27")}
                    </IonCardContent>
                    <IonCardHeader>
                        <IonCardTitle className="privacy-title">
                            {t("TERMS_28")}
                        </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent className="privacy-content">
                        {t("TERMS_29")}
                        <br />
                        <br />
                        <div className="ion-text-uppercase">
                            {t("TERMS_30")}
                            <br />
                            <br />
                            {t("TERMS_31")}
                        </div>
                    </IonCardContent>
                    <IonCardHeader>
                        <IonCardTitle className="privacy-title">
                            {t("TERMS_32")}
                        </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent className="privacy-content">
                        <div className="ion-text-uppercase">
                            {t("TERMS_33")}
                            <br />
                            <br />
                            {t("TERMS_34")}
                            <br />
                            <br />
                            {t("TERMS_35")}
                        </div>
                    </IonCardContent>
                    <IonCardHeader>
                        <IonCardTitle className="privacy-title">
                            {t("TERMS_36")}
                        </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent className="privacy-content">
                        {t("TERMS_37")}
                    </IonCardContent>
                    <IonCardHeader>
                        <IonCardTitle className="privacy-title">
                            {t("TERMS_38")}
                        </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent className="privacy-content">
                        {t("TERMS_39")}
                        <br />
                        <br />
                        {t("TERMS_40")}
                        <br />
                        <br />
                        {t("TERMS_41")}
                        <br />
                        <br />
                        {t("TERMS_42")}
                        <br />
                        <br />
                        {t("TERMS_43")}
                        <br />
                        <br />
                        {t("TERMS_44")}
                    </IonCardContent>
                </IonCard>
                <Copyright />
            </IonContent>
        </IonPage>
    );
};

export default Terms;
