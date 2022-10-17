import { useStorage } from "@capacitor-community/storage-react";
import {
    IonButton,
    IonButtons,
    IonCard,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonToolbar,
    useIonAlert,
} from "@ionic/react";
import { chevronForwardOutline } from "ionicons/icons";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { hapticsImpactLight } from "../../capacitor/haptics";
import Copyright from "../../components/Copyright/Copyright.component";
import { CategoriesContext } from "../../contexts/categories.context";

import "./Menu.styles.css";

const Menu: React.FC = () => {
    const { t } = useTranslation();
    const { setCategoriesArray } = useContext(CategoriesContext); // Enable categories context
    const { set } = useStorage();

    const [presentAlert] = useIonAlert(); // Enable ionic alert component

    const deleteAllData = () => {
        hapticsImpactLight();
        presentAlert({
            header: t("DELETEALL_HEADER"),
            subHeader: t("DELETEALL_SUBHEADER"),
            message: t("FOOTER_DELETEALL_MESSAGE"),
            buttons: [
                {
                    text: t("CANCEL"),
                    role: "cancel",
                },
                {
                    text: t("CONFIRM"),
                    role: "confirm",
                    handler: () => {
                        setCategoriesArray([]);
                        set("categories", JSON.stringify([]));
                    },
                },
            ],
        });
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="end">
                        <IonButton routerLink="/home">
                            {t("CATEGORY_TITLE")}
                            <IonIcon slot="end" icon={chevronForwardOutline} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent color="light">
                <IonCard className="content-container">
                    <IonList lines="none" class="menu">
                        <IonItem lines="inset" routerLink="/privacy">
                            <IonLabel>
                                <IonCardTitle className="category-title ion-text-wrap">
                                    {t("PRIVACY_POLICY")}
                                </IonCardTitle>
                            </IonLabel>
                        </IonItem>
                        <IonItem routerLink="/terms">
                            <IonLabel>
                                <IonCardTitle className="category-title ion-text-wrap">
                                    {t("TERMS_OF_USE")}
                                </IonCardTitle>
                            </IonLabel>
                        </IonItem>
                    </IonList>
                </IonCard>
                <IonCard>
                    <IonList lines="none">
                        <IonItem detail>
                            <IonLabel onClick={deleteAllData}>
                                <IonCardTitle
                                    color="danger"
                                    className="category-title ion-text-wrap"
                                >
                                    {t("REMOVE_ALL_DATA")}
                                </IonCardTitle>
                            </IonLabel>
                        </IonItem>
                    </IonList>
                </IonCard>
                <Copyright />
            </IonContent>
        </IonPage>
    );
};

export default Menu;
