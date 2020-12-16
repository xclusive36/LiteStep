import { IonSearchbar } from '@ionic/react';
import React from 'react';
// import './Search.css';

interface ContainerProps { searchChange: any, hide: string }

const Search: React.FC<ContainerProps> = (props) => {
    
    return (
        <IonSearchbar className={props.hide} onIonChange={props.searchChange} />
    );
  };
  
  export default Search;
  