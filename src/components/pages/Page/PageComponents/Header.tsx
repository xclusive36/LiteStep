import { IonAlert, IonButton, IonCol, IonGrid, IonHeader, IonIcon, IonMenuToggle, IonRow, IonToolbar } from '@ionic/react';
import { chevronBack, reorderThreeOutline, searchOutline, trashOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import HeaderActionSheet from '../HeaderActionSheet';
import AnimateFade from './Animate';
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
                <IonGrid>
                    <IonRow>
                        <IonCol className="ion-hide-md-up">
                            <IonMenuToggle>
                                <IonButton size="small" color="danger" expand="block">
                                    <IonIcon slot="icon-only" icon={chevronBack} />
                                </IonButton>
                            </IonMenuToggle>
                        </IonCol>
                        <IonCol>
                            <IonButton onClick={() => setSearch(!search)} size="small" color={search ? 'primary' : 'dark'} expand="block">
                                <IonIcon slot="icon-only" icon={searchOutline} />
                            </IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton onClick={props.reorderOption} size="small" color="danger" expand="block">
                                <IonIcon slot="icon-only" icon={reorderThreeOutline} />
                            </IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton onClick={() => setShowAlert(true)} disabled={props.deleteDisabled} color="secondary" size="small" expand="block">
                                <IonIcon slot="icon-only" icon={trashOutline} />
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonToolbar>
            <AnimateFade expand={search} element={
                <IonToolbar>
                    <Search searchChange={props.searchChange} />
                </IonToolbar>
            } />

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
  