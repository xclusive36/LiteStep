import {Plugins, HapticsImpactStyle, Capacitor} from '@capacitor/core';

const { Haptics } = Plugins;

export const hapticsImpact = (style = HapticsImpactStyle.Heavy) => {
    if(Capacitor.isNative) {
        Haptics.impact({
            style: style
        });
    }
}

export const hapticsImpactMedium = (style = HapticsImpactStyle.Medium) => {
    hapticsImpact(style);
}

export const hapticsImpactLight = (style = HapticsImpactStyle.Light) => {
    hapticsImpact(style);
}

export const hapticsVibrate = () => {
    if(Capacitor.isNative) {
        Haptics.vibrate();
    }
}

export const hapticsSelectionStart = () => {
    if(Capacitor.isNative) {
        Haptics.selectionStart();
    }
}

export const hapticsSelectionChanged = () => {
    if(Capacitor.isNative) {
        Haptics.selectionChanged();
    }
}

export const hapticsSelectionEnd = () => {
    if(Capacitor.isNative) {
        Haptics.selectionEnd();
    }
}

export const hapticsNotification = (style:any = 'SUCCESS') => {
    if(Capacitor.isNative) {
        Haptics.notification(style);
    }
}

  // Interfaces Used
  // HapticsImpactOptions
  // interface HapticsImpactOptions {
  //   style : ;
  // }
  //
  // HapticsNotificationOptions
  // interface HapticsNotificationOptions {
  //   type : ;
  // }
  //
  // HapticsImpactStyle
  // enum HapticsImpactStyle {
  //   Heavy: "HEAVY"
  //   Light: "LIGHT"
  //   Medium: "MEDIUM"
  // }
  //
  // HapticsNotificationType
  // enum HapticsNotificationType {
  //   ERROR: "ERROR"
  //   SUCCESS: "SUCCESS"
  //   WARNING: "WARNING"
  // }