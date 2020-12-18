import { IonActionSheet } from '@ionic/react';
import React from 'react';
import { hapticsImpactLight, hapticsNotification } from '../../../capacitor/haptics';
import './HeaderActionSheet.css';

interface ContainerProps { show: boolean, action: any, setShowAlert: any, search: any, reorder: any }


const HeaderActionSheet: React.FC<ContainerProps> = (props) => {
    
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
            props.reorder();
          }
        }, {
            text: 'Search',
            handler: () => {
              hapticsImpactLight();
              props.search();
            }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            hapticsImpactLight();
            // console.log('Cancel clicked');
          }
        }]}
      >
      </IonActionSheet>
    );
  };
  
  export default HeaderActionSheet;
  