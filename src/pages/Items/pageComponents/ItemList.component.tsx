import {
    IonButton,
    IonCard,
    IonCol,
    IonGrid,
    IonIcon,
    IonInput,
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonRow,
    IonText,
} from "@ionic/react";
import { useContext, useRef } from "react";
import { useTranslation } from "react-i18next";

import { useStorage } from "@capacitor-community/storage-react";

import EmptyState from "../../../components/EmptyState/EmptyState.component";
import {
    CategoriesContext,
    ItemInterface,
} from "../../../contexts/categories.context";
import { SettingsContext } from "../../../contexts/settings.context";
import { filterItems } from "../../../utils/FilterArray";
import { ReduceCount } from "../../../utils/ReduceCount";
import {
    hapticsImpactLight,
    hapticsNotification,
} from "../../../capacitor/haptics";
import { objectPosition } from "../../../utils/ObjectPosition";
import { addOutline, removeOutline } from "ionicons/icons";

const ItemList: React.FC = () => {
    const { t } = useTranslation();
    const { set } = useStorage();

    const { categoriesArray, setCategoriesArray } =
        useContext(CategoriesContext); // Enable categories context

    const { pickMode, itemSearchTerm, categoryID, setShowFooter } =
        useContext(SettingsContext); // Enable settings context

    const categoryIndex = objectPosition(categoriesArray, categoryID); // Get the index of the category

    let sliding = useRef<any>(null); //: any;

    const ResetItemCount = (item: ItemInterface) => {
        const itemIndex = objectPosition(
            categoriesArray[categoryIndex].items,
            item.id
        ); // Get the index of the item in the category

        const newCategoriesArray = [...categoriesArray];

        if (newCategoriesArray[categoryIndex].items[itemIndex].count > 0) {
            newCategoriesArray[categoryIndex].items[itemIndex].count = 0;
            setCategoriesArray(newCategoriesArray);
            const newCategories = [...categoriesArray];
            set("categories", JSON.stringify(newCategories)); // Update storage
            hapticsNotification("SUCCESS"); // Haptic feedback
        }
    };

    const updateCountInput = (item: ItemInterface, event: any) => {
        const itemIndex = objectPosition(
            categoriesArray[categoryIndex].items,
            item.id
        ); // Get the index of the item in the category

        const newCategoriesArray = [...categoriesArray];

        if (parseInt(event.target.value) >= 0) {
            newCategoriesArray[categoryIndex].items[itemIndex].count = parseInt(
                event.target.value
            );
        } else {
            newCategoriesArray[categoryIndex].items[itemIndex].count = 0;
        }

        setCategoriesArray(newCategoriesArray);
        set("categories", JSON.stringify(newCategoriesArray)); // Update storage
        hapticsImpactLight(); // Haptic feedback
    };

    const updateCountDown = (item: ItemInterface) => {
        const itemIndex = objectPosition(
            categoriesArray[categoryIndex].items,
            item.id
        ); // Get the index of the item in the category

        const newCategoriesArray = [...categoriesArray];

        if (item.count > 0) {
            newCategoriesArray[categoryIndex].items[itemIndex].count =
                item.count - 1;
        } else {
            newCategoriesArray[categoryIndex].items[itemIndex].count = 0;
        }

        setCategoriesArray(newCategoriesArray);
        set("categories", JSON.stringify(newCategoriesArray)); // Update storage
        hapticsImpactLight(); // Haptic feedback
    };

    const updateCountUp = (item: ItemInterface) => {
        const itemIndex = objectPosition(
            categoriesArray[categoryIndex].items,
            item.id
        ); // Get the index of the item in the category

        const newCategoriesArray = [...categoriesArray];

        newCategoriesArray[categoryIndex].items[itemIndex].count =
            item.count + 1;

        setCategoriesArray(newCategoriesArray);
        set("categories", JSON.stringify(newCategoriesArray)); // Update storage
        hapticsImpactLight(); // Haptic feedback
    };

    return (
        <>
            {filterItems(
                itemSearchTerm,
                categoriesArray[categoryIndex].items
            ).map((item: ItemInterface, index) => (
                <IonItemSliding ref={sliding} key={item.id}>
                    <IonItem
                        className={
                            pickMode &&
                            categoriesArray[categoryIndex].items[index]
                                .count === 0
                                ? "tally-item fadeOut"
                                : "tally-item animate__animated animate__faster animate__fadeIn"
                        }
                        lines="none"
                    >
                        <IonGrid>
                            <IonRow>
                                <IonCol class="ion-text-center">
                                    <IonText className="label">
                                        {item.name}
                                    </IonText>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonButton
                                        tabIndex={1}
                                        onClick={() => {
                                            updateCountDown(item);
                                        }}
                                        color="pepsired"
                                        expand="block"
                                        size="default"
                                    >
                                        <IonIcon
                                            slot="icon-only"
                                            icon={removeOutline}
                                        />
                                    </IonButton>
                                </IonCol>
                                <IonCol>
                                    <IonCard
                                        color="white"
                                        className="ion-text-center item-count"
                                    >
                                        <IonInput
                                            tabIndex={2}
                                            className="countinput ion-text-center"
                                            value={item.count}
                                            type="tel"
                                            inputmode="numeric"
                                            maxlength={7}
                                            onIonFocus={() =>
                                                setShowFooter(false)
                                            }
                                            onIonBlur={() =>
                                                setShowFooter(true)
                                            }
                                            onIonChange={(event) => {
                                                updateCountInput(item, event);
                                            }}
                                        />
                                    </IonCard>
                                </IonCol>
                                <IonCol>
                                    <IonButton
                                        tabIndex={1}
                                        onClick={() => {
                                            updateCountUp(item);
                                        }}
                                        expand="block"
                                        size="default"
                                    >
                                        <IonIcon
                                            slot="icon-only"
                                            icon={addOutline}
                                        />
                                    </IonButton>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>
                    <IonItemOptions
                        side="end"
                        onIonSwipe={() => {
                            sliding.current.closeOpened();
                            ResetItemCount(item);
                        }}
                    >
                        <IonItemOption
                            color="danger"
                            onClick={() => {
                                sliding.current.closeOpened();
                                ResetItemCount(item);
                            }}
                            expandable
                        >
                            {t("CLEAR")}
                        </IonItemOption>
                    </IonItemOptions>
                </IonItemSliding>
            ))}
            {filterItems(itemSearchTerm, categoriesArray[categoryIndex].items)
                .length === 0 && itemSearchTerm.length > 0 ? (
                <>
                    <EmptyState title="item-search" text={t("EMPTY_SEARCH")} />
                </>
            ) : pickMode &&
              ReduceCount(categoriesArray[categoryIndex].items) === 0 ? (
                <EmptyState title="item-pick" text={t("EMPTY_ITEM_PICK")} />
            ) : (
                <></>
            )}
        </>
    );
};

export default ItemList;
