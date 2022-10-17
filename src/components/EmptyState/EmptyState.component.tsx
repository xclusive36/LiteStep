// import { ReactComponent as CategoriesLogo } from "../../assets/svg/list2-red.svg";
// import { ReactComponent as ItemLogo } from "../../assets/svg/list2-pepsiblue.svg";
// import { ReactComponent as CategoryPickLogo } from "../../assets/svg/donut.svg";
// import { ReactComponent as ItemPickLogo } from "../../assets/svg/balloons.svg";

import "./EmptyState.styles.css";
import {
    IonCol,
    IonGrid,
    IonItem,
    IonLabel,
    IonList,
    IonRow,
    IonSkeletonText,
} from "@ionic/react";

interface ContainerProps {
    title: string;
    text: string;
}

const EmptyState: React.FC<ContainerProps> = ({ title, text }) => {
    return (
        <>
            <IonList>
                <p className="text ion-text-center">{text}</p>
                {title === "items" ||
                title === "item-pick" ||
                title === "item-search" ? (
                    <>
                        {[1, 2, 3].map((blah, index) => (
                            <IonGrid key={index}>
                                <IonRow>
                                    <IonCol className="ion-text-center">
                                        <IonSkeletonText className="title center" />
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol className="ion-text-center">
                                        <IonSkeletonText className="skeleton-button" />
                                    </IonCol>
                                    <IonCol className="ion-text-center">
                                        <IonSkeletonText className="skeleton-button" />
                                    </IonCol>
                                    <IonCol className="ion-text-center">
                                        <IonSkeletonText className="skeleton-button" />
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        ))}
                    </>
                ) : (
                    <>
                        {[1, 2, 3].map((blah, index) => (
                            <IonItem lines="none" key={index}>
                                <IonSkeletonText
                                    className="icon"
                                    slot="start"
                                />
                                <IonLabel>
                                    <IonSkeletonText className="title" />
                                    <IonSkeletonText className="subtitle" />
                                </IonLabel>
                            </IonItem>
                        ))}
                    </>
                )}

                {/* {title === "categories" ? (
                [1, 2, 3].map((blah, index) => (
                    <IonItem key={index}>
                        <IonSkeletonText className="icon" slot="start" />
                        <IonLabel>
                            <IonSkeletonText className="title" />
                            <IonSkeletonText className="subtitle" />
                        </IonLabel>
                    </IonItem>
                ))
            ) : // <CategoriesLogo className="empty-rocket" />
            title === "items" ? (
                <ItemLogo className="empty-rocket" />
            ) : title === "category-pick" ? (
                <CategoryPickLogo className="empty-rocket" />
            ) : title === "item-pick" ? (
                <ItemPickLogo className="empty-rocket" />
            ) : (
                <></>
            )} */}
                {/* {title === "categories" ? (
                <CategoriesLogo className="empty-rocket" />
            ) : title === "items" ? (
                <ItemLogo className="empty-rocket" />
            ) : (
                <></>
            )} */}
            </IonList>
        </>
    );
};

export default EmptyState;
