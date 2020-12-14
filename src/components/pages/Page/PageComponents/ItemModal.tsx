import { IonAlert, IonButton, IonButtons, IonCardTitle, IonContent, IonFooter, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonTitle, IonToolbar } from '@ionic/react';
import { removeOutline, trashOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { itemSnapshot } from '../../../../Data/DataServiceComponent';
import './ItemModal.css';

interface ContainerProps { showModal: boolean, pageRef: any, updateName(event: any): any, delete: any }

const ItemModal: React.FC<ContainerProps> = (props) => {

    const [showModal, setShowModal] = useState(false);
    const [item, setItem] = useState(itemSnapshot());
    const [showAlert, setShowAlert] = useState(false);
    let inputRef: any; // Ref for quantity

    useEffect(() => {
        if(props.showModal) {
            setShowModal(true);
            setItem(itemSnapshot());
        }
        setTimeout(() => {
            inputRef?.setFocus();
          }, 600);
    }, [inputRef, props.showModal]);
    
    const [hide, setHide] = useState(false);

    return (
        <IonModal
            isOpen={showModal}
            cssClass='modal'
            swipeToClose={true}
            presentingElement={props.pageRef}
            onDidDismiss={() => {
                setShowModal(false);
                setHide(false);
            }}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton onClick={() => setShowModal(false)}>Close</IonButton>
                    </IonButtons>
                    <IonTitle size="large" className="ion-text-center">
                        <IonIcon icon={removeOutline} />
                    </IonTitle>
                    <IonButtons className={ !hide ? 'ion-hide' : '' } slot="end">
                        <IonButton>Done</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonList>
                    <IonItem lines="none">
                        <IonLabel className="ion-text-center">
                            <IonCardTitle>{item.name}</IonCardTitle>
                        </IonLabel>
                    </IonItem>
                    <IonItem>
                        {/* <IonIcon className="modal" slot="start" icon={pencilOutline} /> */}
                        <IonLabel position="stacked">Rename Item:</IonLabel>
                        <IonInput
                            placeholder={item.name}
                            onIonChange={(event) => props.updateName(event)}
                        />
                    </IonItem>
                </IonList>
            </IonContent>
            <IonFooter>
                <IonToolbar>
                    <IonButton onClick={() => setShowAlert(true)} expand="block" color="danger">
                        <IonIcon slot="icon-only" icon={trashOutline} />
                        Delete {item.name}
                    </IonButton>
                </IonToolbar>
            </IonFooter>
            
            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                cssClass='my-custom-class'
                header={item.name}
                subHeader={'Delete item?'}
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
                          props.delete();
                          setShowModal(false);
                        }
                    }
                  ]}
            />
        </IonModal>
    );
}

export default ItemModal;