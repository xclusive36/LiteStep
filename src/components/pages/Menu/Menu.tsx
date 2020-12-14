import { IonContent, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { getPackagesObs, menuIndexObs, menuIndexSnapshot, packagesSnapshot, updateCategory, updatePackages } from '../../../Data/DataServiceComponent';
import { useStorage } from '@capacitor-community/react-hooks/storage';
import { copyOutline } from 'ionicons/icons';
import ListItemContainer from '../../List/ListItemContainer';
import { reduceCount } from '../../../Functions/ReduceCount';
import { setColor } from '../../../Functions/SetColor';
import { setSelected } from '../../../Functions/SetSelected';
import EmptyData from '../../EmptyState/EmptyData/EmptyData';
import { createCategory } from '../../../Data/Create';
import MenuFooter from './MenuComponents/Footer/MenuFooter';

import './Menu.css';
import { hapticsImpactLight, hapticsNotification } from '../../../capacitor/haptics';

const Menu: React.FC = () => {
    const [menuIndex, setMenuIndex] = useState(menuIndexSnapshot());
    const [categories, setCategories] = useState(packagesSnapshot());
    const { get, set } = useStorage();
  
    useEffect(() => {
        // async function clearStorage() {
            //   return await clear();
        // }
        // clearStorage();
        async function getStorage() {
            let result = await get('LiteStep');
            if(result) {
                let array = [...JSON.parse(result)]
                updatePackages(array);
                if(array[0]) updateCategory(array[0]);
            }
        }

        getStorage();
        const subscription = getPackagesObs().subscribe(async result => {
            setCategories(result);
            await set('LiteStep', JSON.stringify(result));
        });
        const childSubscription = menuIndexObs.subscribe(result => setMenuIndex(result));
        subscription.add(childSubscription);
    
        return () => subscription.unsubscribe();
    }, [get, set]);
  
    return (
        <IonMenu contentId="main" type="overlay">
            <IonContent>
                <IonList className="ion-padding-top" lines="none">
                    <IonListHeader>
                        <IonLabel>Categories</IonLabel>
                    </IonListHeader>
                    {categories.map((category, index) => {
                        return (
                            <IonMenuToggle key={index} autoHide={false}>
                                <ListItemContainer
                                    link={true}
                                    id={category.id}
                                    icon={copyOutline}
                                    name={category.name}
                                    count={() => reduceCount(category.items)}
                                    color={setColor(category.id, categories, menuIndex)}
                                    click={() => {
                                        setSelected(index, categories);
                                        hapticsImpactLight();
                                    }}
                                />
                            </IonMenuToggle>
                        );
                    })}
                    
                    <EmptyData arrayLength={categories.length} displayLength={3} />
                </IonList>
            </IonContent>
            <MenuFooter
                click={() => {
                    createCategory();
                    hapticsNotification('SUCCESS');
                }}
            />
        </IonMenu>
    );
};

export default Menu;
