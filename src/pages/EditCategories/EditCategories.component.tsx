import {
    IonCardTitle,
    IonContent,
    IonFooter,
    IonHeader,
    IonItem,
    IonList,
    IonPage,
    IonReorder,
    IonReorderGroup,
    IonText,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import { useContext, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import { hapticsImpactLight } from "../../capacitor/haptics";
import { CategoriesContext } from "../../contexts/categories.context";
import EditCategoriesHeader from "./pageComponents/EditCategoriesHeader";

import "./EditCategories.styles.css";
import { reorderCategories } from "../../utils/DoReorder";
import { ReduceCount } from "../../utils/ReduceCount";
import FormButtons from "./pageComponents/FormButtons.component";
import EditCategoriesDeleteButton from "./pageComponents/EditCategoriesDeleteButton.component";
import {
    keyboardWillHide,
    keyboardWillShow,
    removeAllKeyboardListeners,
} from "../../capacitor/keyboard";
import Input from "../../components/Input/Input.component";
import Copyright from "../../components/Copyright/Copyright.component";
import { SettingsContext } from "../../contexts/settings.context";

const EditCategories: React.FC = () => {
    const { t } = useTranslation();
    const { categoriesArrayEditable, setCategoriesArrayEditable } =
        useContext(CategoriesContext); // Enable categories context

    const { setIsCategoriesUpdated } = useContext(SettingsContext);

    const formRef = useRef<any>(null); // Create a reference to the form

    useEffect(() => {
        keyboardWillShow(); // Add keyboard listeners
        keyboardWillHide(); // Add keyboard listeners

        return () => {
            removeAllKeyboardListeners(); // Remove keyboard listeners
        };
    }, []);

    return (
        <IonPage>
            <EditCategoriesHeader />
            <IonContent color="light" fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar color="light">
                        <IonTitle size="large">
                            <IonCardTitle className="header-title">
                                {t("CATEGORYEDIT_TITLE")}
                            </IonCardTitle>
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonList>
                    <form onSubmit={(e) => e.preventDefault()} ref={formRef}>
                        <IonReorderGroup
                            disabled={false}
                            onIonItemReorder={(event) => {
                                reorderCategories(
                                    event,
                                    categoriesArrayEditable,
                                    setCategoriesArrayEditable
                                );
                                setIsCategoriesUpdated(true);
                                hapticsImpactLight();
                            }}
                        >
                            {categoriesArrayEditable.map(
                                ({ id, name, items }, index) => (
                                    <IonItem key={id}>
                                        <EditCategoriesDeleteButton
                                            id={id}
                                            index={index}
                                        />
                                        <Input
                                            className="category-input"
                                            placeholder={name}
                                            onChange={() =>
                                                setIsCategoriesUpdated(true)
                                            }
                                        />
                                        <IonText color="medium" slot="end">
                                            {ReduceCount(items)}
                                        </IonText>
                                        <IonReorder slot="end" />
                                    </IonItem>
                                )
                            )}
                        </IonReorderGroup>
                    </form>
                </IonList>
                <Copyright />
            </IonContent>
            <IonFooter>
                <IonToolbar>
                    <FormButtons formRef={formRef} />
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
};

export default EditCategories;
