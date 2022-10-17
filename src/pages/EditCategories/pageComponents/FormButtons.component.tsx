import {
    IonButton,
    IonCol,
    IonGrid,
    IonRow,
    useIonRouter,
    useIonToast,
} from "@ionic/react";
import { useContext } from "react";
import { useStorage } from "@capacitor-community/storage-react";
import { useTranslation } from "react-i18next";

import { hapticsNotification } from "../../../capacitor/haptics";
import { CategoriesContext } from "../../../contexts/categories.context";
import { Sanitize } from "../../../utils/Sanitize";
import { SettingsContext } from "../../../contexts/settings.context";

interface ContainerProps {
    formRef: any;
}

const FormButtons: React.FC<ContainerProps> = ({ formRef }) => {
    const { t } = useTranslation();
    const { set } = useStorage();
    const {
        categoriesArray,
        categoriesArrayEditable,
        setCategoriesArrayEditable,
        setCategoriesArray,
    } = useContext(CategoriesContext); // Enable categories context

    const { isCategoriesUpdated, setIsCategoriesUpdated } =
        useContext(SettingsContext); // Enable settings context

    const handleReset = () => {
        Array.from(formRef.current).forEach((input: any) => {
            input.value = "";
        });

        setCategoriesArrayEditable(categoriesArray);
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();

        const newCategories = [...categoriesArrayEditable]; // Create a duplicate of the categories array.

        const valueArray = Array.from(formRef.current).map(
            (input: any) => input.value
        ); // Create an array of the values of the form inputs.

        valueArray.forEach((value, index) => {
            if (value !== "") {
                newCategories[index].name = Sanitize(value);
            }
        });

        setCategoriesArrayEditable(newCategories);
        setCategoriesArray(newCategories);
        set("categories", JSON.stringify(categoriesArrayEditable)); // Update storage
        hapticsNotification("SUCCESS");

        Array.from(formRef.current).forEach((input: any) => {
            input.value = "";
        });

        showToast();
        if (categoriesArrayEditable.length === 0) router.goBack(); // If no items, go back to previous page
    };

    //	Initializing our router
    const router = useIonRouter();

    const [present, dismiss] = useIonToast();

    const showToast = () => {
        present({
            color: "dark",
            buttons: [{ text: "hide", handler: () => dismiss() }],
            message: t("TOAST_LISTUPDATED"),
            duration: 2000,
        });
    };

    return (
        <IonGrid>
            <IonRow>
                <IonCol size="8">
                    <IonButton
                        size="small"
                        type="submit"
                        expand="block"
                        onClick={(event) => {
                            handleSubmit(event);
                            setIsCategoriesUpdated(false);
                        }}
                        disabled={!isCategoriesUpdated}
                    >
                        {t("UPDATE_BUTTON")}
                    </IonButton>
                </IonCol>
                <IonCol size="4">
                    <IonButton
                        size="small"
                        type="reset"
                        expand="block"
                        color="danger"
                        onClick={() => {
                            handleReset();
                            setIsCategoriesUpdated(false);
                        }}
                        disabled={!isCategoriesUpdated}
                    >
                        {t("RESET")}
                    </IonButton>
                </IonCol>
            </IonRow>
        </IonGrid>
    );
};

export default FormButtons;
