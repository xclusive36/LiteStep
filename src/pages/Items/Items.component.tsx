import {
    IonCardTitle,
    IonContent,
    IonHeader,
    IonList,
    IonPage,
    IonSearchbar,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import { useContext, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import { SettingsContext } from "../../contexts/settings.context";
import { CategoriesContext } from "../../contexts/categories.context";
import { hapticsImpactLight } from "../../capacitor/haptics";
import { objectPosition } from "../../utils/ObjectPosition";

import EmptyState from "../../components/EmptyState/EmptyState.component";
import AddNewItem from "./pageComponents/AddNewItem.component";
import ItemsHeader from "./pageComponents/ItemsHeader.component";
import ItemList from "./pageComponents/ItemList.component";
import Copyright from "../../components/Copyright/Copyright.component";

import "./Items.styles.css";
import Footer from "../../components/Footer/Footer.component";
import {
    hideKeyboard,
    keyboardWillHide,
    keyboardWillShow,
    removeAllKeyboardListeners,
} from "../../capacitor/keyboard";

const Items: React.FC = () => {
    const { t } = useTranslation();
    const { categoriesArray } = useContext(CategoriesContext); // Enable categories context
    const { itemSearchTerm, setItemSearchTerm, categoryID, setShowFooter } =
        useContext(SettingsContext); // Enable settings context
    const itemsContentRef = useRef(null); // Set the items content ref as null

    const categoryIndex = objectPosition(categoriesArray, categoryID); // Get the index of the category

    useEffect(() => {
        keyboardWillShow(); // Add keyboard listeners
        keyboardWillHide(); // Add keyboard listeners

        return () => {
            removeAllKeyboardListeners(); // Remove keyboard listeners
        };
    }, []);

    return (
        <>
            <IonPage>
            <ItemsHeader />
            <IonContent color="light" ref={itemsContentRef} fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar color="light">
                        <IonTitle size="large">
                            <IonCardTitle className="header-title">
                                {categoriesArray[categoryIndex]?.name}
                            </IonCardTitle>
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        hideKeyboard();
                    }}
                >
                    <IonSearchbar
                        placeholder={t("SEARCH_PLACEHOLDER")}
                        onIonFocus={() => setShowFooter(false)}
                        onIonBlur={() => setShowFooter(true)}
                        value={itemSearchTerm}
                        onIonChange={(e) => {
                            setItemSearchTerm(e.detail.value!);
                            hapticsImpactLight(); // Haptic feedback
                        }}
                    />
                </form>
                <IonList>
                    {categoriesArray[categoryIndex].items.length ? (
                        <ItemList />
                    ) : (
                        <EmptyState title="items" text={t("EMPTY_ITEM")} />
                    )}
                </IonList>

                <AddNewItem contentRef={itemsContentRef} />
                <Copyright />
            </IonContent>
            <Footer />
            </IonPage>
        </>
    );
};

export default Items;
