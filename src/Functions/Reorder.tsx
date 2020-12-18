import { ItemReorderEventDetail } from '@ionic/core';
import { hapticsNotification } from '../capacitor/haptics';
import { categorySnapshot, packagesSnapshot, updatePackages } from '../Data/DataServiceComponent';
import { objectPosition } from './ObjectPosition';

export const ReorderItems = (event: CustomEvent<ItemReorderEventDetail>) => {
    let categories = [...packagesSnapshot()];
    let category = {...categorySnapshot()};

    category.items = event.detail.complete(category.items);
    
    const catIndex= objectPosition(categories, category.id);
    categories[catIndex] = category;
    event.detail.complete();

    updatePackages(categories);
    hapticsNotification('SUCCESS')
}