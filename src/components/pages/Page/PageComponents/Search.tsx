import { IonSearchbar } from '@ionic/react';
import React from 'react';
// import './Search.css';

interface ContainerProps { searchChange: any }

const Search: React.FC<ContainerProps> = (props) => {
    
    return (
        <IonSearchbar onIonChange={props.searchChange} />
    );
  };
  
  export default Search;
  