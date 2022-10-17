import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home/Home.component";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "animate.css";

import { CategoriesProvider } from "./contexts/categories.context";
import { SettingsProvider } from "./contexts/settings.context";
import Items from "./pages/Items/Items.component";
import EditCategories from "./pages/EditCategories/EditCategories.component";
import EditItems from "./pages/EditItems/EditItems.component";

/* Theme variables */
import "./theme/variables.css";
import Privacy from "./pages/Privacy/Privacy.component";
import Terms from "./pages/Terms/Terms.component";
import Menu from "./pages/Menu/Menu.component";
import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getLanguageCode } from "./capacitor/device";

setupIonicReact();

const patchScrollBlockingListeners = () => {
    // set all touch listeners passive
    let supportsPassive = false;
    const x = document.createElement("x");
    x.addEventListener("cut", () => 1, {
        get passive() {
            supportsPassive = true;
            return !!1;
        },
    });
    x.remove();
    if (supportsPassive) {
        const originalFn = EventTarget.prototype.addEventListener;
        EventTarget.prototype.addEventListener = function (...args) {
            if (
                ["scroll", "touchmove", "touchstart"].includes(args[0]) &&
                (typeof args[2] !== "object" || args[2].passive === undefined)
            ) {
                args[2] = {
                    ...(typeof args[2] === "object" ? args[2] : {}),
                    passive: false,
                };
            }
            originalFn.call(this, ...args);
        };
    }
};
patchScrollBlockingListeners();

const App: React.FC = () => {
    const { i18n } = useTranslation();

    const getLanguage = useCallback(async () => {
        const language = await getLanguageCode(); // returns "en"
        i18n.changeLanguage(language?.value); // changes the language
    }, [i18n]);

    useEffect(() => {
        getLanguage();
    }, [getLanguage]);

    return (
        <IonApp>
            <CategoriesProvider>
                <SettingsProvider>
                    <IonReactRouter>
                        <IonRouterOutlet>
                            <Route exact path="/">
                                <Redirect to="/home" />
                            </Route>
                            <Route exact path="/home">
                                <Home />
                            </Route>
                            <Route exact path="/items">
                                <Items />
                            </Route>
                            <Route exact path="/edit-categories">
                                <EditCategories />
                            </Route>
                            <Route exact path="/edit-items">
                                <EditItems />
                            </Route>
                            <Route exact path="/privacy">
                                <Privacy />
                            </Route>
                            <Route exact path="/terms">
                                <Terms />
                            </Route>
                            <Route exact path="/menu">
                                <Menu />
                            </Route>
                        </IonRouterOutlet>
                    </IonReactRouter>
                </SettingsProvider>
            </CategoriesProvider>
        </IonApp>
    );
};

export default App;
