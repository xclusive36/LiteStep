import { IonIcon, IonItem, IonLabel, IonBadge, IonFabButton } from '@ionic/react';

import React from 'react';
import './ListItemContainer.css';

interface ContainerProps {
  id: string,
  name: string
  count: any,
  color: boolean,
  click: any,
  icon: any,
  link: boolean
}

const ListItemContainer: React.FC<ContainerProps> = (props) => {
  
  const listColor = () => {
    if(props.color) return 'primary';
    return 'white'
  }

  const iconColor = () => {
    if(props.color) return 'light';
    return 'dark'
  }

  const badgeColor = () => {
    if(props.color) return 'light';
    return 'white'
  }

  if(props.link) {
    return (
      <IonItem detail
        className="itemButton"
        color={listColor()}
        onClick={props.click}
        // routerLink={props.id}
        // detail={false}
        routerDirection="none">
        <IonFabButton size="small" slot="start" color={badgeColor()}>{props.count()}</IonFabButton>
        {/* <ion-fab-button [color]="setPackageColor(count(item?.items))" size="small">
                      {{ count(item?.items) }}
                    </ion-fab-button> */}
        {/* <IonIcon className="menu" color={iconColor()} slot="start" icon={props.icon} /> */}
        <IonLabel>{props.name}</IonLabel>
        {/* <IonBadge slot="end" color={badgeColor()}>{props.count}</IonBadge> */}
      </IonItem>
    );
  }

  return (
    <IonItem className="itemButton" color={listColor()} onClick={props.click} detail={false}>
      <IonIcon color={iconColor()} slot="start" icon={props.icon} />
      <IonLabel>{props.name}</IonLabel>
      <IonBadge slot="end" color={badgeColor()}>{props.count}</IonBadge>
    </IonItem>
  );
};

export default ListItemContainer;
