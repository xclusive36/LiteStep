import { Device } from "@capacitor/device";
import { Capacitor } from "@capacitor/core";

export const getLanguageCode = async () => {
    if (Capacitor.isNativePlatform()) {
        return await Device.getLanguageCode();
    }
};
