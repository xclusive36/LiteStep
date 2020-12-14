import { IonItem, IonLabel, IonList, IonSkeletonText } from '@ionic/react';
import React from 'react';
import './EmptyData.css';

interface ContainerProps {arrayLength: number, displayLength: number}

const EmptyData: React.FC<ContainerProps> = (props) => {
    let array: any[] = [];
    for(let i = 0; i < props.displayLength; i++) array.push(i);
    if(props.arrayLength > 0) {
        for(let i = 0; i < props.arrayLength; i++) array.pop();
    }
  
    return (
        <IonList lines="none" className={ props.arrayLength > props.displayLength ? 'ion-hide' : '' }>
            {array.map((blah, index) => {
                return (
                    <IonItem key={index}>
                        <IonSkeletonText className='icon' slot="start" />
                        <IonLabel>
                            <IonSkeletonText className='title' />
                            <IonSkeletonText className='subtitle' />
                        </IonLabel>
                        <IonSkeletonText className='badge' slot="end" />
                    </IonItem>
                );
            })}
        </IonList>
    );
}

export default EmptyData;
