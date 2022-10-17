import {
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    useIonAlert,
} from "@ionic/react";
import { useStorage } from "@capacitor-community/storage-react";
import { useContext, useRef } from "react";
import { useTranslation } from "react-i18next";

import EmptyState from "../../../components/EmptyState/EmptyState.component";
import {
    CategoriesContext,
    CategoryInterface,
} from "../../../contexts/categories.context";
import { SettingsContext } from "../../../contexts/settings.context";
import { filterItems } from "../../../utils/FilterArray";
import CategoryItem from "./CategoryItem.component";
import { hapticsNotification } from "../../../capacitor/haptics";

const CategoryList: React.FC = () => {
    const { t } = useTranslation();
    const { set } = useStorage();
    const { categoriesArray, setCategoriesArray, totalCount } =
        useContext(CategoriesContext); // Enable categories context
    const { pickMode, categorySearchTerm } = useContext(SettingsContext); // Enable settings context
    const [presentAlert] = useIonAlert(); // Enable ionic alert component

    let sliding = useRef<any>(null); //: any;

    const ResetCategoryCount = (category: CategoryInterface) => {
        presentAlert({
            header: t("RESET_HEADER"),
            subHeader: t("RESET_SUBHEADER"),
            message: t("CATEGORY_RESET_MESSAGE"),
            buttons: [
                {
                    text: t("CANCEL"),
                    role: "cancel",
                },
                {
                    text: t("CONFIRM"),
                    role: "confirm",
                    handler: () => {
                        const categoryIndex = categoriesArray.findIndex(
                            (cat) => cat.id === category.id
                        );
                        const newCategories = [...categoriesArray];

                        let success: boolean = false;

                        newCategories[categoryIndex].items.forEach((item) => {
                            if (item.count > 0) {
                                success = true;
                                item.count = 0;
                            }
                        });
                        if (success) {
                            setCategoriesArray(newCategories);
                            set("categories", JSON.stringify(newCategories)); // Update storage
                            hapticsNotification("SUCCESS"); // Haptic feedback
                        }
                    },
                },
            ],
        });
    };

    return (
        <>
            {filterItems(categorySearchTerm, categoriesArray).map(
                (category: CategoryInterface) => (
                    <IonItemSliding ref={sliding} key={category.id}>
                        <CategoryItem categoryID={category.id} />
                        <IonItemOptions
                            side="end"
                            onIonSwipe={() => {
                                sliding.current.closeOpened();
                                ResetCategoryCount(category);
                            }}
                        >
                            <IonItemOption
                                color="danger"
                                onClick={() => {
                                    sliding.current.closeOpened();
                                    ResetCategoryCount(category);
                                }}
                                expandable
                            >
                                {t("CLEAR")}
                            </IonItemOption>
                        </IonItemOptions>
                    </IonItemSliding>
                )
            )}
            {filterItems(categorySearchTerm, categoriesArray).length === 0 &&
            categorySearchTerm.length > 0 ? (
                <>
                    <EmptyState title="search" text={t("EMPTY_SEARCH")} />
                </>
            ) : pickMode && totalCount === 0 ? (
                <>
                    <EmptyState
                        title="category-pick"
                        text={t("EMPTY_CATEGORY_PICK")}
                    />
                </>
            ) : (
                <></>
            )}
        </>
    );
};

export default CategoryList;
