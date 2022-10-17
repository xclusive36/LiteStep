import {
    IonBadge,
    IonCardTitle,
    IonCol,
    IonContent,
    IonFabButton,
    IonGrid,
    IonIcon,
    IonItem,
    IonLabel,
    IonPopover,
    IonRow,
} from "@ionic/react";
import { useStorage } from "@capacitor-community/storage-react";
import {
    arrowDownOutline,
    arrowUpOutline,
    backspaceOutline,
    checkmarkOutline,
} from "ionicons/icons";
import { useContext, useRef, useState } from "react";
import { CategoriesContext } from "../../../contexts/categories.context";
import { SettingsContext } from "../../../contexts/settings.context";
import { objectPosition } from "../../../utils/ObjectPosition";
import {
    hapticsImpactLight,
    hapticsNotification,
} from "../../../capacitor/haptics";

import "./Keypad.styles.css";

const Keypad: React.FC = () => {
    const { set } = useStorage();
    const { categoriesArray, setCategoriesArray } =
        useContext(CategoriesContext);
    const { showPopover, setShowPopover, categoryID, itemID } =
        useContext(SettingsContext); // Enable settings context

    const categoryIndex = objectPosition(categoriesArray, categoryID); // Get the index of the category in the categories array
    const itemIndex = objectPosition(
        categoriesArray[categoryIndex].items,
        itemID
    ); // Get the index of the item in the category

    const popover = useRef<HTMLIonPopoverElement>(null);
    const [count, setCount] = useState(0); // Set the count to the count of the item
    const [edited, setEdited] = useState(false); // Set edited to false

    const countUp = () => {
        setCount(count + 1); // Update count
        hapticsImpactLight(); // Haptic feedback
        setEdited(true); // Set edited to true
    };

    const countDown = () => {
        if (count > 0) {
            setCount(count - 1); // Update count
            hapticsImpactLight(); // Haptic feedback
            setEdited(true); // Set edited to true
        }
    };

    const countBackspace = () => {
        const countString = count.toString(); // convert to string
        setCount(
            parseInt(countString.slice(0, countString.length - 1), 10) || 0
        ); // remove last digit
        hapticsImpactLight(); // Haptic feedback
        setEdited(true); // Set edited to true
    };

    const countKeypad = (digit: number) => {
        let countString = count.toString(); // convert to string
        if (!edited) {
            countString = "0"; // convert to string
        } // If not edited, set count to 0
        setCount(parseInt(countString + digit, 10)); // add digit to count
        hapticsImpactLight(); // Haptic feedback
        setEdited(true); // Set edited to true
    };

    return (
        <IonPopover
            onIonPopoverWillDismiss={() => {
                setEdited(false); // Set edited to false
            }}
            onIonPopoverWillPresent={() => {
                setCount(
                    categoriesArray[categoryIndex].items[itemIndex]?.count
                );
            }}
            alignment="center"
            ref={popover}
            className="menu"
            isOpen={showPopover}
            onDidDismiss={() => {
                setShowPopover(false);
            }}
        >
            <IonContent class="ion-padding" scroll-y="false">
                <IonItem lines="none">
                    <IonLabel>
                        <IonCardTitle className="item-title ion-text-wrap">
                            <strong>
                                {
                                    categoriesArray[categoryIndex].items[
                                        itemIndex
                                    ]?.name
                                }
                            </strong>
                        </IonCardTitle>
                    </IonLabel>
                    <IonBadge color={count ? "primary" : "medium"} slot="end">
                        {count}
                    </IonBadge>
                </IonItem>
                <IonGrid>
                    <IonRow>
                        <IonCol size="3">
                            <IonFabButton
                                onClick={() => countKeypad(1)}
                                className="digit"
                            >
                                1
                            </IonFabButton>
                        </IonCol>
                        <IonCol size="3">
                            <IonFabButton
                                onClick={() => countKeypad(2)}
                                className="digit"
                            >
                                2
                            </IonFabButton>
                        </IonCol>
                        <IonCol size="3">
                            <IonFabButton
                                onClick={() => countKeypad(3)}
                                className="digit"
                            >
                                3
                            </IonFabButton>
                        </IonCol>
                        <IonCol size="3">
                            <IonFabButton
                                onClick={countUp}
                                color="primary"
                                className="digit"
                            >
                                <IonIcon icon={arrowUpOutline} />
                            </IonFabButton>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="3">
                            <IonFabButton
                                onClick={() => countKeypad(4)}
                                className="digit"
                            >
                                4
                            </IonFabButton>
                        </IonCol>
                        <IonCol size="3">
                            <IonFabButton
                                onClick={() => countKeypad(5)}
                                className="digit"
                            >
                                5
                            </IonFabButton>
                        </IonCol>
                        <IonCol size="3">
                            <IonFabButton
                                onClick={() => countKeypad(6)}
                                className="digit"
                            >
                                6
                            </IonFabButton>
                        </IonCol>
                        <IonCol size="3">
                            <IonFabButton
                                onClick={countDown}
                                color="danger"
                                className="digit"
                            >
                                <IonIcon icon={arrowDownOutline} />
                            </IonFabButton>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="3">
                            <IonFabButton
                                onClick={() => countKeypad(7)}
                                className="digit"
                            >
                                7
                            </IonFabButton>
                        </IonCol>
                        <IonCol size="3">
                            <IonFabButton
                                onClick={() => countKeypad(8)}
                                className="digit"
                            >
                                8
                            </IonFabButton>
                        </IonCol>
                        <IonCol size="3">
                            <IonFabButton
                                onClick={() => countKeypad(9)}
                                className="digit"
                            >
                                9
                            </IonFabButton>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="3">
                            <IonFabButton
                                onClick={countBackspace}
                                color="danger"
                                className="digit"
                            >
                                <IonIcon icon={backspaceOutline} />
                            </IonFabButton>
                        </IonCol>
                        <IonCol size="3">
                            <IonFabButton
                                onClick={() => countKeypad(0)}
                                className="digit"
                            >
                                0
                            </IonFabButton>
                        </IonCol>
                        <IonCol size="3" offset="3">
                            <IonFabButton
                                onClick={() => {
                                    const newCategories = [...categoriesArray];
                                    newCategories[categoryIndex].items[
                                        itemIndex
                                    ].count = count;
                                    setCategoriesArray(newCategories);
                                    set(
                                        "categories",
                                        JSON.stringify(newCategories)
                                    ); // Update storage
                                    setShowPopover(false);
                                    hapticsNotification("SUCCESS"); // Haptic feedback
                                }}
                                color="success"
                                className="digit"
                            >
                                <IonIcon icon={checkmarkOutline} />
                            </IonFabButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPopover>
    );
};

export default Keypad;
