import { Plugins, Capacitor } from '@capacitor/core';
 
const { Keyboard } = Plugins;

if(Capacitor.isNative) {
    Keyboard.setAccessoryBarVisible({isVisible: true});
}

// Keyboard.addListener('keyboardWillShow', (info: KeyboardInfo) => {
//     console.log('keyboard will show with height', info.keyboardHeight);
// });

// Keyboard.addListener('keyboardWillHide', () => {
//     console.log('keyboard will hide');
// });

export const showBar = () => {
    if(Capacitor.isNative) {
        Keyboard.setAccessoryBarVisible({isVisible: true});
    }
}

export const showKeyboard = () => {
    if(Capacitor.isNative) {
        Keyboard.show();
    }
}

export const hideKeyboard = () => {
    if(Capacitor.isNative) {
        Keyboard.hide();
    }
}