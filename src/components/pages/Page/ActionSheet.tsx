import { IonActionSheet } from '@ionic/react';
import React from 'react';
import { hapticsImpactLight, hapticsNotification } from '../../../capacitor/haptics';
import './ActionSheet.css';

interface ContainerProps { show: boolean, action: any, setShowAlert: any }


const ActionSheet: React.FC<ContainerProps> = (props) => {
    
    return (
        <IonActionSheet
        isOpen={props.show}
        onDidDismiss={() => props.action(false)}
        cssClass='my-custom-class'
        header='Options'
        buttons={[{
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            hapticsNotification('WARNING');
            props.setShowAlert(true);
          }
        }, {
          text: 'Reorder',
          handler: () => {
            hapticsImpactLight();
            console.log('Reorder clicked');
          }
        }, {
            text: 'Search',
            handler: () => {
              hapticsImpactLight();
              console.log('Search clicked');
            }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            hapticsImpactLight();
            console.log('Cancel clicked');
          }
        }]}
      >
      </IonActionSheet>
    );
  };
  
  export default ActionSheet;
  