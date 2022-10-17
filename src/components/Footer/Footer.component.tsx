import { useHistory, useLocation } from "react-router-dom";
import {
    IonButton,
    IonCol,
    IonFooter,
    IonGrid,
    IonIcon,
    IonRow,
    IonToggle,
    IonToolbar,
    useIonAlert,
} from "@ionic/react";
import { useStorage } from "@capacitor-community/storage-react";
import { useTranslation } from "react-i18next";

import { refreshOutline } from "ionicons/icons";
import { useContext } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import { SettingsContext } from "../../contexts/settings.context";
import {
    hapticsNotification,
    hapticsImpactLight,
} from "../../capacitor/haptics";

import "./Footer.styles.css";

const Footer = () => {
    const { t } = useTranslation();
    const { set } = useStorage();
    const { pickMode, setPickMode } = useContext(SettingsContext); // Enable settings context
    const { categoriesArray, setCategoriesArray } =
        useContext(CategoriesContext); // Enable categories context
    const { showFooter } = useContext(SettingsContext); // Enable settings context
    const [presentAlert] = useIonAlert(); // Enable ionic alert component
    const location = useLocation();
    let history = useHistory();

    const ResetAllCounts = () => {
        const newCategories = [...categoriesArray];
        let success: boolean = false;

        if (newCategories.length > 0) {
            newCategories.forEach((category) => {
                if (category.items.length > 0) {
                    category.items.forEach((item) => {
                        if (item.count > 0) {
                            item.count = 0;
                            if (!success) success = true;
                        }
                    });
                }
            });
        }

        if (success) {
            setCategoriesArray(newCategories);
            set("categories", JSON.stringify(newCategories)); // Update storage
            hapticsNotification("SUCCESS"); // Haptic feedback
        }

        const getLocation = location.pathname;
        if (getLocation === "/items") {
            history.goBack();
        } else if (getLocation === "/category-edit") {
            history.goBack();
        } else if (getLocation === "/items-edit") {
            history.push("/home");
        }
        setPickMode(false);
    };

    return (
        <IonFooter className={!showFooter ? "ion-hide" : ""}>
            <IonToolbar>
                <IonGrid>
                    <IonRow>
                        <IonCol size="3">
                            <IonButton
                                shape="round"
                                size="small"
                                className="footer-button"
                                color="danger"
                                expand="block"
                                onClick={() => {
                                    hapticsImpactLight();
                                    presentAlert({
                                        header: t("RESET_HEADER"),
                                        subHeader: t("RESET_SUBHEADER"),
                                        message: t("FOOTER_RESET_MESSAGE"),
                                        buttons: [
                                            {
                                                text: t("CANCEL"),
                                                role: "cancel",
                                            },
                                            {
                                                text: t("CONFIRM"),
                                                role: "confirm",
                                                handler: () => {
                                                    ResetAllCounts();
                                                },
                                            },
                                        ],
                                    });
                                }}
                            >
                                <IonIcon slot="start" icon={refreshOutline} />
                                {t("RESET")}
                            </IonButton>
                        </IonCol>
                        <IonCol className="ion-text-center copyright"></IonCol>
                        <IonCol size="3" className="ion-text-right">
                            <IonToggle
                                checked={pickMode}
                                onIonChange={(e) => {
                                    setPickMode(e.detail.checked);
                                    hapticsImpactLight();
                                }}
                            />
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonToolbar>
        </IonFooter>
    );
};

export default Footer;
