// import React from 'react';
import { BehaviorSubject, Observable } from 'rxjs';
import { PackageInterface } from '../Interfaces/Interfaces';

const obj: PackageInterface = {
    id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    name: 'Untitled list',
    order: 0,
    items: []
}

export const paramsObs = new BehaviorSubject({
    id: '',
    index: 0,
    package: obj
});
export const updateParams = (data: any) => paramsObs.next(data);
export const getParamsObs = (): Observable<any> => paramsObs.asObservable();
export const paramsSnapshot = () => paramsObs.getValue(); // Return Snapshot of BehaviorSubject

export const newItemObs = new BehaviorSubject(false);
export const updateNewItem = (data: any) => newItemObs.next(data);
export const newItemSnapshot = () => newItemObs.getValue(); // Return Snapshot of BehaviorSubject

export const packagesObs = new BehaviorSubject<PackageInterface[]>([] as PackageInterface[]);
export const updatePackages = (data: any) => packagesObs.next(data);
export const getPackagesObs = (): Observable<any> => packagesObs.asObservable();
export const packagesSnapshot = () => packagesObs.getValue(); // Return Snapshot of BehaviorSubject

export const categoryObs = new BehaviorSubject(obj);
export const updateCategory = (data: any) => categoryObs.next(data);
export const getCategoryObs = (): Observable<any> => categoryObs.asObservable();
export const categorySnapshot = () => categoryObs.getValue(); // Return Snapshot of BehaviorSubject

export const itemObs = new BehaviorSubject({
    id: '',
    name: '',
    order: 0,
    count: 0
});
export const updateItem = (data: any) => itemObs.next(data);
// const getItemObs = (): Observable<any> => itemObs.asObservable();
export const itemSnapshot = () => itemObs.getValue(); // Return Snapshot of BehaviorSubject

export const pickmodeObs = new BehaviorSubject(false);
export const getPickModeObs = (): Observable<any> => pickmodeObs.asObservable();
export const pickModeSnapshot = () => pickmodeObs.getValue(); // Return Snapshot of BehaviorSubject
export const pickModeOff = () => pickmodeObs.next(false);
export const pickModeOn = () => pickmodeObs.next(true);
export const pickModeFlip = (value: boolean) => pickmodeObs.next(!value)

export const filterArray = (searchTerm: string, array: any[]) => {
    return array.filter(item => {
      return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
}

export const junkObs = new BehaviorSubject([]);
export const updateJunk = (data: any) => junkObs.next(data);
export const getJunkSnapshot = () => junkObs.getValue();

export const menuIndexObs = new BehaviorSubject(0);
export const updateMenuIndex = (data: any) => menuIndexObs.next(data);
export const menuIndexSnapshot = () => menuIndexObs.getValue(); // Return Snapshot of BehaviorSubject