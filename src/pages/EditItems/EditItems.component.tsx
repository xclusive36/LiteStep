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

import { hapticsImpactLight } from "../../capacitor/haptics";
import { CategoriesContext } from "../../contexts/categories.context";
import { reorderItems } from "../../utils/DoReorder";
import EditItemsHeader from "./pageComponents/EditItemsHeader";
import EditItemsFormButtons from "./pageComponents/EditItemsFormButtons.component";
import { SettingsContext } from "../../contexts/settings.context";
import { objectPosition } from "../../utils/ObjectPosition";
import EditItemsDeleteButton from "./pageComponents/EditItemsDeleteButton.component";

import "./EditItems.styles.css";
import {
    keyboardWillHide,
    keyboardWillShow,
    removeAllKeyboardListeners,
} from "../../capacitor/keyboard";
import Input from "../../components/Input/Input.component";
import Copyright from "../../components/Copyright/Copyright.component";

const EditItems: React.FC = () => {
    const {
        categoriesArray,
        categoriesArrayEditable,
        setCategoriesArrayEditable,
    } = useContext(CategoriesContext); // Enable categories context

    const { categoryID, setIsItemsUpdated } = useContext(SettingsContext); // Enable settings context

    const categoryIndex = objectPosition(categoriesArray, categoryID); // Get the index of the category

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
            <EditItemsHeader />
            <IonContent color="light" fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar color="light">
                        <IonTitle size="large">
                            <IonCardTitle className="header-title">
                                {categoriesArray[categoryIndex].name}
                            </IonCardTitle>
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonList>
                    <form onSubmit={(e) => e.preventDefault()} ref={formRef}>
                        <IonReorderGroup
                            disabled={false}
                            onIonItemReorder={(event) => {
                                reorderItems(
                                    event,
                                    categoryID,
                                    JSON.parse(
                                        JSON.stringify(categoriesArrayEditable)
                                    ),
                                    setCategoriesArrayEditable
                                );
                                setIsItemsUpdated(true);
                                hapticsImpactLight();
                            }}
                        >
                            {categoriesArrayEditable[categoryIndex].items.map(
                                ({ id, name, count }, index) => (
                                    <IonItem key={id}>
                                        <EditItemsDeleteButton
                                            id={id}
                                            categoryIndex={categoryIndex}
                                            itemIndex={index}
                                        />
                                        <Input
                                            className="category-input"
                                            placeholder={name}
                                            onChange={() =>
                                                setIsItemsUpdated(true)
                                            }
                                        />
                                        <IonText color="medium" slot="end">
                                            {
                                                categoriesArrayEditable[
                                                    categoryIndex
                                                ].items[index].count
                                            }
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
                    <EditItemsFormButtons
                        formRef={formRef}
                        categoryIndex={categoryIndex}
                    />
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
};

export default EditItems;
