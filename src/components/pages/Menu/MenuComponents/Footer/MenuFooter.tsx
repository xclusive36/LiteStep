import { IonButton, IonFooter, IonIcon, IonMenuToggle, IonToolbar } from '@ionic/react';
import { duplicateOutline } from 'ionicons/icons';
import React from 'react';
import './MenuFooter.css';

interface ContainerProps {click: any}

const MenuFooter: React.FC<ContainerProps> = (props) => {
    
    return (
        <IonFooter>
            <IonToolbar>
                <IonMenuToggle autoHide={false}>
                    <IonButton color="primary" expand="full" onClick={props.click} routerDirection="none">
                        <IonIcon slot="start" icon={duplicateOutline} />
                        Add Category
                    </IonButton>
                </IonMenuToggle>
            </IonToolbar>
        </IonFooter>
    );
  };
  
  export default MenuFooter;
  