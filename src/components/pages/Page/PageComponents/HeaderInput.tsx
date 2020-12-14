import { IonHeader, IonInput, IonToolbar } from '@ionic/react';
import React from 'react';
import './HeaderInput.css';

interface ContainerProps { name: string, submit: any, change: any, focus: any }

const HeaderInput: React.FC<ContainerProps> = (props) => {
    
    return (
        <IonHeader collapse="condense">
            <IonToolbar>
                <form onSubmit={props.submit}>
                    <IonInput className="input" value={props.name}
                        placeholder="Enter Input"
                        onIonChange={props.change} //props.change
                        onIonFocus={props.focus}
                        onIonBlur={props.submit}
                    />
                </form>
            </IonToolbar>
        </IonHeader>
    );
  };
  
  export default HeaderInput;
  