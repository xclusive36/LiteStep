import { useCallback, useContext, useEffect, useRef } from "react";
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
import { useTranslation } from "react-i18next";

import EmptyState from "../../components/EmptyState/EmptyState.component";
import Footer from "../../components/Footer/Footer.component";
import AddNewCategory from "./pageComponents/AddNewCategory.component";

import { CategoriesContext } from "../../contexts/categories.context";

import "./Home.styles.css";
import HomeHeader from "./pageComponents/HomeHeader.component";
import CategoryList from "./pageComponents/CategoryList.component";
import { SettingsContext } from "../../contexts/settings.context";
import { hapticsImpactLight } from "../../capacitor/haptics";

import Copyright from "../../components/Copyright/Copyright.component";
import {
    hideKeyboard,
    keyboardWillHide,
    keyboardWillShow,
    removeAllKeyboardListeners,
} from "../../capacitor/keyboard";
import { useStorage } from "@capacitor-community/storage-react";

const Home: React.FC = () => {
    const { t } = useTranslation();

    const { categoriesArray, setCategoriesArray } =
        useContext(CategoriesContext); // Enable categories context
    const { categorySearchTerm, setCategorySearchTerm, setShowFooter } =
        useContext(SettingsContext); // Enable settings context
    const homeContentRef = useRef(null); // Set the home content ref as null

    const { get } = useStorage();
    // // const { get, set, remove, getKeys, clear } = useStorage();

    const getStorage = useCallback(async () => {
        const getCategoriesFromStorage = await get("categories"); // get from storage
        if (getCategoriesFromStorage) {
            setCategoriesArray(JSON.parse(getCategoriesFromStorage)); // set categories context
        }
    }, [get, setCategoriesArray]);

    useEffect(() => {
        getStorage().catch((error) => console.error(error));
    }, [getStorage, setCategoriesArray]);

    useEffect(() => {
        keyboardWillShow(); // Add keyboard will show listener
        keyboardWillHide(); // Add keyboard will hide listener

        return () => {
            removeAllKeyboardListeners(); // Remove all keyboard listeners
        };
    }, []);

    return (
        <IonPage>
            <HomeHeader />
            <IonContent color="light" ref={homeContentRef} fullscreen>
                <div className="content-container">
                    <div className="top">
                        <IonHeader collapse="condense">
                            <IonToolbar color="light">
                                <IonTitle size="large">
                                    <IonCardTitle>
                                        {t("CATEGORY_TITLE")}
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
                                value={categorySearchTerm}
                                onIonChange={(e) => {
                                    hapticsImpactLight(); // Haptic feedback
                                    setCategorySearchTerm(e.detail.value!); // Set the search term
                                }}
                            />
                        </form>
                        <IonList lines="inset">
                            {categoriesArray.length ? (
                                <CategoryList />
                            ) : (
                                <EmptyState
                                    title="categories"
                                    text={t("EMPTY_CATEGORY")}
                                />
                            )}
                        </IonList>

                        <AddNewCategory contentRef={homeContentRef} />
                    </div>
                    <Copyright />
                </div>
            </IonContent>
            <Footer />
        </IonPage>
    );
};

export default Home;
