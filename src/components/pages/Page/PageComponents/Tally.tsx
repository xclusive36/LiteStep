import { IonButton, IonCard, IonCol, IonGrid, IonIcon, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonReorder, IonRow, IonText } from '@ionic/react';
import { addOutline, backspaceOutline, ellipsisVertical, removeOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { updateItem } from '../../../../Data/DataServiceComponent';
import './Tally.css';

interface ItemInterface { id: string, name: string, order: number, count: number }
interface ContainerProps { 
    obj: ItemInterface, focus: any, change: any, down: any, up: any, clear: any, openModal: any, hide: any, blur: any
}

const PageTally: React.FC<ContainerProps> = (props) => {
    let sliding: any;
    const [deleteMe, setDeleteMe] = useState(false);

    const removeItem = () => {
        setDeleteMe(true);
        setTimeout(() => {
            props.clear();
            setDeleteMe(false);
        }, 200)
    }

    return (
        <div className={props.hide()}>
            <IonItemSliding ref={(r) => sliding = r}>
                <IonItemOptions side="start" onIonSwipe={() => {sliding?.closeOpened();updateItem(props.obj);props.openModal()}}>
                    <IonItemOption onClick={() => {sliding.closeOpened();updateItem(props.obj)}} color="primary" expandable>
                    <IonIcon slot="icon-only" icon={ellipsisVertical} />
                    </IonItemOption>
                </IonItemOptions>
                
                <IonItem className={ deleteMe ? 'deleteMe' : '' } lines="none">
                    <IonGrid>
                        <IonRow>
                            <IonCol class="ion-text-center">
                                <IonText className="label">{props.obj.name}</IonText>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonButton tabIndex={1} onClick={props.down} color="pepsired" expand="block" size="default">
                                    <IonIcon slot="icon-only" icon={removeOutline} />
                                </IonButton>
                            </IonCol>
                            <IonCol>
                                <IonCard className="ion-text-center">
                                    <IonInput  tabIndex={2}
                                        className="countinput ion-text-center"
                                        value={props.obj.count}
                                        type="tel"
                                        inputmode="numeric"
                                        maxlength={7}
                                        onIonFocus={props.focus}
                                        onIonChange={props.change}
                                        onIonBlur={props.blur}
                                    />
                                </IonCard>
                            </IonCol>
                            <IonCol>
                                <IonButton tabIndex={1} onClick={(event) => {
                                    props.up();
                                }} expand="block" size="default">
                                    <IonIcon slot="icon-only" icon={addOutline} />
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    <IonReorder slot="end" />
                </IonItem>

                <IonItemOptions side="end" onIonSwipe={() => {sliding.closeOpened();removeItem();}}>
                    <IonItemOption color="danger" onClick={() => {sliding.closeOpened();removeItem();}} expandable>
                        <IonIcon slot="icon-only" icon={backspaceOutline} />
                    </IonItemOption>
                </IonItemOptions>
            </IonItemSliding>
        </div>
    );
};

export default PageTally;
  