import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

export const set = async (key: string, value: any): Promise<void> => {
    await Storage.set({
        key: key,
        value: JSON.stringify(value)
    });
}

export const get = async (key: string): Promise<any> => {
    const item = await Storage.get({ key: key });
    if(item.value) return JSON.parse(item.value);
}

export const remove = async (): Promise<void> => {
    await Storage.remove({ key: 'name' });
}

export const keys = async (): Promise<any> => {
    const { keys } = await Storage.keys();
    return keys;
}

export const clear = async (): Promise<void> => {
    await Storage.clear();
}