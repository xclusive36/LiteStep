import { IonFooter, IonSearchbar, IonToolbar } from '@ionic/react';
import { duplicateOutline } from 'ionicons/icons';
import React from 'react';
import './AddCategory.css';

interface ContainerProps { click: any, formFocus: any, hide: any }

const AddCategory: React.FC<ContainerProps> = (props) => {
    
    return (
        <IonFooter>
            <IonToolbar className={props.hide}>
                <form onSubmit={props.click}>
                    <IonSearchbar
                        placeholder="Add Category"
                        searchIcon={duplicateOutline}
                        className="moveUp"
                        onIonFocus={props.formFocus}
                    />
                </form>
            </IonToolbar>
        </IonFooter>
    );
  };
  
  export default AddCategory;
  