import { IonAlert, IonButton, IonButtons, IonHeader, IonIcon, IonMenuToggle, IonTitle, IonToolbar } from '@ionic/react';
import { arrowBackOutline, ellipsisVertical } from 'ionicons/icons';
import React, { useState } from 'react';
import { hapticsImpactLight } from '../../../../capacitor/haptics';
import HeaderActionSheet from '../HeaderActionSheet';
import './Header.css';
import Search from './Search';

interface ContainerProps { title: string, delete: any, deleteDisabled: boolean, searchChange: any, reorderOption: any }


const PageHeader: React.FC<ContainerProps> = (props) => {

    const [showAlert, setShowAlert] = useState(false);
    const [showActionSheet, setShowActionSheet] = useState(false);
    const [search, setSearch] = useState(true);
    
    return (
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuToggle>
                        <IonButton onClick={() => hapticsImpactLight()}>
                            <IonIcon slot="icon-only" color="dark" icon={arrowBackOutline} />
                        </IonButton>
                    </IonMenuToggle>
                </IonButtons>
                <IonTitle>{props.title}</IonTitle>
                <IonButtons slot="end">
                    <IonButton onClick={() => {
                        setShowActionSheet(true);
                        hapticsImpactLight();
                    }}>
                        <IonIcon slot="icon-only" color="dark" icon={ellipsisVertical} />
                    </IonButton>
                </IonButtons>
            </IonToolbar>
            <IonToolbar>
                <Search hide={ search ? 'ion-hide' : '' } searchChange={props.searchChange} />
            </IonToolbar>
            {/* <IonToolbar>
                <IonGrid>
                    <IonRow>
                        <IonCol className="ion-hide-md-up">
                            <IonMenuToggle>
                                <IonButton size="small" expand="block">
                                    <IonIcon icon={menuOutline} />
                                </IonButton>
                            </IonMenuToggle>
                        </IonCol>
                        <IonCol>
                            <IonButton onClick={() => setShowAlert(true)} disabled={props.deleteDisabled} size="small" fill="outline" expand="block">
                                <IonIcon slot="icon-only" color="danger" icon={removeCircle} />
                            </IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton onClick={props.delete} disabled={props.deleteDisabled} size="small" color="tertiary" expand="block">
                                <IonIcon icon={reorderThreeOutline} />
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonToolbar> */}
            {/* <IonToolbar>
                <IonTitle>{props.title}</IonTitle>
            </IonToolbar> */}

            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                cssClass='my-custom-class'
                header={props.title}
                subHeader={'Delete entire category?'}
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
                          props.delete()
                        }
                    }
                  ]}
            />

            <HeaderActionSheet
                show={showActionSheet}
                search={() => setSearch(!search)}
                reorder={props.reorderOption}
                action={() => {
                    setShowActionSheet(true)
                    setTimeout(() => {
                        setShowActionSheet(false)
                  }, 100)}
                }
                setShowAlert={() => setShowAlert(true)}
            />

        </IonHeader>
    );
  };
  
  export default PageHeader;
  