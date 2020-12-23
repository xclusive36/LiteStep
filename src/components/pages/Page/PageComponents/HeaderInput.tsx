import { IonButton, IonCard, IonCardSubtitle, IonCol, IonGrid, IonHeader, IonIcon, IonInput, IonRow, IonToolbar } from '@ionic/react';
import { checkmarkOutline } from 'ionicons/icons';
import React from 'react';
import './HeaderInput.css';

interface ContainerProps { name: string, submit: any, change: any, focus: any }

const HeaderInput: React.FC<ContainerProps> = (props) => {
    
    return (
        <IonHeader collapse="condense">
            <IonToolbar>
                <form onSubmit={props.submit}>
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonCardSubtitle>Category</IonCardSubtitle>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonCard className="ion-padding-start">
                                    <IonInput className="input" value={props.name}
                                        placeholder="Enter Input"
                                        onIonChange={props.change} //props.change
                                        onIonFocus={props.focus}
                                        onIonBlur={props.submit}
                                    />
                                </IonCard>
                            </IonCol>
                            <IonCol size="3">
                                <IonButton type="submit" expand="block" size="small">
                                    <IonIcon className="submit" slot="icon-only" icon={checkmarkOutline} />
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </form>
            </IonToolbar>
        </IonHeader>
    );
  };
  
  export default HeaderInput;
  