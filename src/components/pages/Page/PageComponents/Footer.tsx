import { IonAlert, IonButton, IonCol, IonFooter, IonGrid, IonIcon, IonRow, IonToast, IonToolbar } from '@ionic/react';
import { grid, gridOutline, refreshOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { resetCount } from '../../../../Data/Count';
import './Footer.css';

interface ContainerProps {pickMode: boolean, pickClick: any, hide: string, reset: any}

const PageFooter: React.FC<ContainerProps> = (props) => {

    const [showAlert, setShowAlert] = useState(false);
    const [showToast, setShowToast] = useState(false);
    
    return (
        <IonFooter>
            <IonToolbar className={props.hide}>
                <IonGrid>
                    <IonRow>
                        <IonCol size="5">
                            <IonButton onClick={() => {
                                setShowAlert(true);
                                props.reset();
                            }} color="danger" expand="block">
                                <IonIcon slot="icon-only" icon={refreshOutline}></IonIcon>
                            </IonButton>
                        </IonCol>
                        <IonCol size="5" offset="2">
                            <IonButton
                                onClick={props.pickClick}
                                color="danger"
                                className={ !props.pickMode ? 'ion-hide' : '' }
                                // fill="clear"
                                expand="block">
                                <IonIcon slot="icon-only" icon={grid}></IonIcon>
                            </IonButton>
                            <IonButton
                                onClick={props.pickClick}
                                className={ props.pickMode ? 'ion-hide' : '' }
                                // fill="clear"
                                expand="block">
                                <IonIcon slot="icon-only" icon={gridOutline}></IonIcon>
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>

                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    cssClass='my-custom-class'
                    header='Reset Counts?'
                    subHeader='Reset All counts back to 0?'
                    message={'This action cannot be undone'}
                    buttons={[
                        {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary'
                        },
                        {
                        text: 'Okay',
                        handler: () => {
                            resetCount();
                            if(props.pickMode) {props.pickClick()}
                            setShowToast(true);
                            }
                        }
                    ]}
                />

                <IonToast
                    isOpen={showToast}
                    color='dark'
                    onDidDismiss={() => setShowToast(false)}
                    message={'Reset Complete'}
                    duration={200}
                />
            </IonToolbar>
        </IonFooter>
    );
};

export default PageFooter;
  