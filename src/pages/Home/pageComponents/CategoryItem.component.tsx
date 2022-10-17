/* eslint-disable no-lone-blocks */
import {
    IonBadge,
    IonCardTitle,
    IonItem,
    IonLabel,
    IonText,
} from "@ionic/react";
import { useContext } from "react";
import { CategoriesContext } from "../../../contexts/categories.context";
import { SettingsContext } from "../../../contexts/settings.context";
import { ReduceCount } from "../../../utils/ReduceCount";
import { hapticsImpactLight } from "../../../capacitor/haptics";

import "./CategoryItem.styles.css";
import { objectPosition } from "../../../utils/ObjectPosition";
import { t } from "i18next";

interface ContainerProps {
    categoryID: string;
}

const CategoryItem: React.FC<ContainerProps> = ({ categoryID }) => {
    const { categoriesArray } = useContext(CategoriesContext); // Enable categories context
    const { pickMode, setCategoryID } =
        useContext(SettingsContext); // Enable settings context

    const categoryIndex = objectPosition(categoriesArray, categoryID);
    const count = ReduceCount(categoriesArray[categoryIndex].items); // Reduce count of items in category

    return (
        <IonItem
            className={
                pickMode && count === 0
                    ? "fadeOut"
                    : "animate__animated animate__faster animate__fadeIn"
            }
            onClick={() => {
                setCategoryID(categoryID);
                hapticsImpactLight();
            }}
            routerLink="/items"
            button
        >
            <IonBadge color={count ? "primary" : "medium"} slot="start">
                {count}
            </IonBadge>
            <IonLabel>
                <IonCardTitle className="category-title ion-text-wrap">
                    {categoriesArray[categoryIndex].name}
                </IonCardTitle>
                <IonText color="dark" className="category-subtitle">
                    {categoriesArray[categoryIndex].items.length}{" "}
                    {categoriesArray[categoryIndex].items.length === 1
                        ? t("ITEM")
                        : t("ITEMS")}
                </IonText>
            </IonLabel>
        </IonItem>
    );
};

export default CategoryItem;
