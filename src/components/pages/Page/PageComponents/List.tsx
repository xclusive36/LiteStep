import { IonLabel, IonMenuToggle, IonSegment, IonSegmentButton, IonToolbar } from '@ionic/react';
import { listOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import ListItemContainer from '../../../List/ListItemContainer';
import { updateCategory, updateJunk } from '../../../../Data/DataServiceComponent';
import './List.css';

interface ContainerProps { array: any[] }

const List: React.FC<ContainerProps> = (props) => {
    const [selected_index, setSelected_index] = useState(0);

    const count = (array: any[]) => {
      if (!array || !array.length) { return 0; }
      return array.reduce(function (acc, obj) { return acc + obj.count; }, 0);
    }
  
    const setColor = (id: string) => {
      let index = objectPosition(props.array, id)
      if (index === selected_index) return true;
      return false;
    }
    
    // helper function gets index of object in array by searching by id
    const objectPosition = (array: any[], id: string) => {
      return array.findIndex(obj => obj.id === id);
    }
  
    const setSelected = (index: number) => {
      setSelected_index(index);
      updateCategory(props.array[index]);
      updateJunk([]);
    }
    
    return (
        <div>
            {props.array.map((category, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <ListItemContainer
                  link={true}
                  id={category.id}
                  icon={listOutline}
                  name={category.name}
                  count={count(category.items)}
                  color={setColor(category.id)}
                  click={() => setSelected(index)} />
              </IonMenuToggle>
            );
          })}
        </div>
    );
  };
  
  export default List;
  