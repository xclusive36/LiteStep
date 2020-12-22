import React from 'react';
import './Animate.css';

interface ContainerProps { expand: boolean, element: any }


const AnimateFade: React.FC<ContainerProps> = (props) => {

    return (
        <div id="expand-container">
            <div id="expand-contract" className={props.expand ? 'collapsed' : 'expanded'}>
                {props.element}
            </div>
        </div>
    );
  };
  
  export default AnimateFade;
  