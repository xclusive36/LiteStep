import { IonContent, IonFab, IonFabButton, IonIcon, IonList, IonPage, IonReorderGroup } from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';
import { hapticsImpactLight, hapticsNotification } from '../../../capacitor/haptics';
import { showBar } from '../../../capacitor/keyboard';
import { addItem } from '../../../Data/Create';
import { deleteCategory, deleteItem } from '../../../Data/Delete';
import { categoryNameSubmit, setCategoryName, updateItemName } from '../../../Data/edit';
import EmptyData from '../../EmptyState/EmptyData/EmptyData';
import { setEmptyDataLength } from '../../EmptyState/EmptyData/SetLength';
import { countClear, countDown, countUp, updateCount } from '../../../Data/Count';
import { PackageInterface } from '../../../Interfaces/Interfaces';
import './Page.css';
import AddCategory from './PageComponents/AddCategory';
import PageHeader from './PageComponents/Header';
import ItemModal from './PageComponents/ItemModal';
import PageTally from './PageComponents/Tally';
import { categorySnapshot, getCategoryObs, getJunkSnapshot, getPackagesObs, packagesSnapshot, updateJunk } from '../../../Data/DataServiceComponent';
import HeaderInput from './PageComponents/HeaderInput';
import PageFooter from './PageComponents/Footer';
import { addOutline } from 'ionicons/icons';
import { filterItems } from '../../../Functions/FilterArray';
import { ReorderItems } from '../../../Functions/Reorder';

interface HomePageProps { router: HTMLIonRouterOutletElement | null }

const Page: React.FC<HomePageProps> = (props) => {
    const [categories, setCategories] = useState(packagesSnapshot() as PackageInterface[]);
    const [category, setCategory] = useState(categorySnapshot() as PackageInterface);
    const [showModal, setShowModal] = useState(false);
    const [pickMode, setPickMode] = useState(false);
    const [addMode, setAddMode] = useState(false);
    const [reorder, setReorder] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [hideFooter, setHideFooter] = useState(false);
  
    let headerNameBackup: any[] = getJunkSnapshot();
    headerNameBackup.push(category.name);
    updateJunk(headerNameBackup);
  
    let contentRef: any = useRef(null);
  
    useEffect(() => {
        const subscription = getPackagesObs().subscribe(result => setCategories(result));
        const childSubscription = getCategoryObs().subscribe(result => setCategory(result));
        subscription.add(childSubscription);
    
        return () => subscription.unsubscribe();
    });
  
    const checkPickMode = (count: number) => {
        if(pickMode && count === 0) return 'ion-hide';
        return '';
    }
  
    return (
        <IonPage>
            <PageHeader
                title={category.name} delete={() => deleteCategory()}
                deleteDisabled={categories.length === 0}
                searchChange={(ev: any) => setSearchTerm(ev.detail.value?.toString() || '')}
                reorderOption={() => setReorder(!reorder)}
            />
            <IonContent className="ion-padding" ref={contentRef}>
                <HeaderInput
                    name={category.name}
                    submit={(e: any) => {
                        e.preventDefault();
                        categoryNameSubmit(headerNameBackup);
                    }}
                    focus={() => {
                        showBar();
                        hapticsImpactLight();
                    }}
                    change={(e: any) => {
                        setCategoryName(e.detail.value!);
                        hapticsImpactLight();
                    }}
                />
                <IonList lines="none">
                    <IonReorderGroup disabled={reorder} onIonItemReorder={ReorderItems}>
                        {filterItems(searchTerm, category.items).map((obj, index) => {
                            return (
                                <PageTally
                                    obj={obj}
                                    focus={() => {
                                        showBar();
                                        setHideFooter(true);
                                    }}
                                    blur={() => setHideFooter(false)}
                                    hide={() => checkPickMode(obj.count)}
                                    change={(event: any) => updateCount(obj, event)}
                                    down={() => countDown(obj)}
                                    up={() => countUp(obj)}
                                    clear={() => countClear(obj)}
                                    openModal={() => {setShowModal(true);setShowModal(false)}}
                                    key={index}
                                />
                            )
                        })}
                    </IonReorderGroup>
                </IonList>
                
                <ItemModal
                    showModal={showModal}
                    pageRef={props.router || undefined}
                    updateName={(event) => updateItemName(event)}
                    delete={() => deleteItem()}
                />
                <div className="ion-padding">
                    <EmptyData arrayLength={setEmptyDataLength(pickMode, category)} displayLength={3} />
                </div>
                
                <IonFab
                    className={ hideFooter ? 'ion-hide-sm-down' : '' }
                    vertical="bottom"
                    horizontal="center"
                    edge={true}
                    slot="fixed"
                >
                    <IonFabButton
                        color={ addMode ? 'danger' : 'primary' }
                        onClick={() => {
                            setAddMode(!addMode);
                            hapticsImpactLight();
                        }}
                    >
                        <IonIcon icon={addOutline} />
                    </IonFabButton>
                </IonFab>
            </IonContent>
            <AddCategory
                hide={ hideFooter || !addMode ? 'ion-padding-top ion-hide-sm-down' : 'ion-padding-top' }
                formFocus={() => hapticsImpactLight()}
                click={(event: any) => {
                    event.preventDefault();
                    addItem(event);
                    setTimeout(() => {
                        contentRef.current.scrollToBottom(300)
                    }, 100);
                }}
            />
            <PageFooter
                reset={() => hapticsNotification('WARNING')}
                hide={ hideFooter || addMode ? 'ion-hide-sm-down' : '' }
                pickMode={pickMode}
                pickClick={() => {
                    setPickMode(!pickMode);
                    hapticsImpactLight();
                }}
            />
        </IonPage>
    );
};

export default Page;
