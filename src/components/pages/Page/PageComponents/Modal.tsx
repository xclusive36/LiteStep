import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonModal, IonSearchbar, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { keypadOutline, listOutline, removeOutline, trashOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import ListItemContainer from '../../../List/ListItemContainer';
import { categorySnapshot, packagesSnapshot, updatePackages } from '../../../../Data/DataServiceComponent';
import './HeaderInput.css';

interface ItemInterface { id: string, name: string, order: number, count: number }
interface PackageInterface { id: string, name: string, order: number, items: ItemInterface[] }
interface ContainerProps { array: ItemInterface[], pageRef: any }

const Modal: React.FC<ContainerProps> = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [item, setObj] = useState({
        id: '',
        name: '',
        order: 0,
        count: 0
    });
    const color: string = 'primary';
    const [hide, setHide] = useState(false);

    const setItem = (obj: ItemInterface) => {
        setShowModal(true);
        setObj(obj);
    }

    const inputPressed = (num: number) => {
        item.count = parseInt(item.count + num.toString());
        // updateItem(listItem);
        update();
    }
  
    const backPressed = () => {
        item.count = parseInt(item.count.toString().slice(0, -1)) || 0;
        update();
    }

    const countOnChange = (num: any) => {
        if(parseInt(num.detail.value) > 0) {item.count = parseInt(num.detail.value)}
        else {item.count = 0}
        setObj({...item})
        update();
    }
  
    const update = () => {
        let categories: PackageInterface[] = packagesSnapshot();
        let category: PackageInterface = categorySnapshot();
        let index = objectPosition(categories, category.id);
        let objIndex = objectPosition(props.array, item.id)
        let newArray = [...props.array];
        newArray[objIndex] = item;
        category.items = newArray;
        categories[index] = category;
        updatePackages(categories);
    }
  
    const countDown = () => {
        if(item.count > 0) {
            item.count--;
            // updateItem(item);
            update();
        }
    }
  
    const countUp = () => {
        item.count++;
        // updateItem(item);
        update();
    }

    // helper function gets index of object in array by searching by id
    const objectPosition = (array: any[], id: string) => {
        return array.findIndex(obj => obj.id === id);
    }
    
    return (
        <div>
            {props.array.map((obj, index) => {
                return (
                    <ListItemContainer key={index}
                        link={false}
                        id={obj.id}
                        icon={listOutline}
                        name={obj.name}
                        count={obj.count}
                        color={false}
                        click={() => setItem(obj)}
                    />
                );
            })}
            
            <IonModal
                isOpen={showModal}
                cssClass='modal'
                swipeToClose={true}
                presentingElement={props.pageRef}
                onDidDismiss={() => {
                    setShowModal(false);
                    setHide(false);
                }}
            >
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
                <IonContent>
                    {/* <IonCardTitle>{item.name}</IonCardTitle> */}
                    <IonList>
                        <IonListHeader>
                            <IonLabel>{item.name}</IonLabel>
                            <IonText>{item.count}</IonText>
                        </IonListHeader>
                        <IonItem>
                            <IonSearchbar
                                searchIcon={keypadOutline}
                                placeholder="Enter quantity"
                                type="number"
                                inputmode="numeric"
                                onIonChange={(e) => countOnChange(e)}
                                onIonFocus={() => setHide(true)}
                                onIonBlur={() => setHide(false)}
                            />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="stacked">Item Name</IonLabel>
                            <IonInput value={item.name} />
                        </IonItem>
                    </IonList>
                    <p className="deleteButton ion-text-center">
                        <IonButton color="danger">
                            <IonIcon slot="icon-only" icon={trashOutline} />
                            Delete {item.name}
                        </IonButton>
                    </p>
                    {/* <IonButton onClick={() => setShowModal(false)}>Close Modal</IonButton> */}
                </IonContent>
                
                {/* <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonButton size="small" onClick={() => {inputPressed(1)}} color={color} expand="block">1</IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton size="small" onClick={() => {inputPressed(2)}} color={color} expand="block">2</IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton size="small" onClick={() => {inputPressed(3)}} color={color} expand="block">3</IonButton>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonButton size="small" onClick={() => {inputPressed(4)}} color={color} expand="block">4</IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton size="small" onClick={() => {inputPressed(5)}} color={color} expand="block">5</IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton size="small" onClick={() => {inputPressed(6)}} color={color} expand="block">6</IonButton>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonButton size="small" onClick={() => {inputPressed(7)}} color={color} expand="block">7</IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton size="small" onClick={() => {inputPressed(8)}} color={color} expand="block">8</IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton size="small" onClick={() => {inputPressed(9)}} color={color} expand="block">9</IonButton>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonButton size="small" onClick={() => backPressed()} color='dark' fill="clear" expand="block">
                                <IonIcon icon={backspaceOutline} />
                            </IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton size="small" onClick={() => {inputPressed(0)}} color={color} expand="block">0</IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton size="large" onClick={() => setShowModal(false)} color='dark' fill="clear" expand="block">
                                <IonIcon icon={checkmarkDoneOutline} />
                            </IonButton>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonButton size="small" onClick={() => countDown()} color="danger" expand="block">-</IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton size="small" onClick={() => countUp()} color='dark' expand="block">+</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid> */}
                
            </IonModal>
        </div>
    );
  };
  
  export default Modal;
  