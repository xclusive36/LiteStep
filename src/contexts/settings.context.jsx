import { createContext, useState } from "react";

export const SettingsContext = createContext({
    pickMode: false,
    setPickMode: (boolean) => {},
    itemEditMode: false,
    setItemsEditMode: (boolean) => {},
    showFooter: true,
    setShowFooter: (boolean) => {},
    showPopover: false,
    setShowPopover: (boolean) => {},
    categorySearchTerm: "",
    setCategorySearchTerm: (string) => {},
    itemSearchTerm: "",
    setItemSearchTerm: (string) => {},
    deviceLanguage: "en",
    setDeviceLanguage: (string) => {},
    categoryID: "",
    setCategoryID: (string) => {},
    itemID: "",
    setItemID: (string) => {},
    isCategoriesUpdated: false,
    setIsCategoriesUpdated: (boolean) => {},
    isItemsUpdated: false,
    setIsItemsUpdated: (boolean) => {},
});

export const SettingsProvider = ({ children }) => {
    const [pickMode, setPickMode] = useState(false); // true if pickMode is active
    const [itemEditMode, setItemsEditMode] = useState(false); // true if Reorder state is active
    const [showFooter, setShowFooter] = useState(true); // Show footer state
    const [showPopover, setShowPopover] = useState(false); // Show popover state
    const [categorySearchTerm, setCategorySearchTerm] = useState(""); // Category search term
    const [itemSearchTerm, setItemSearchTerm] = useState(""); // Item search term
    const [categoryID, setCategoryID] = useState(""); // Category ID
    const [itemID, setItemID] = useState(""); // Item ID
    const [isCategoriesUpdated, setIsCategoriesUpdated] = useState(false); // Categories updated state
    const [isItemsUpdated, setIsItemsUpdated] = useState(false); // Items updated state

    const value = {
        pickMode,
        setPickMode,
        itemEditMode,
        categorySearchTerm,
        itemSearchTerm,
        categoryID,
        itemID,
        isCategoriesUpdated,
        isItemsUpdated,
        setItemsEditMode,
        showFooter,
        setShowFooter,
        showPopover,
        setShowPopover,
        setCategorySearchTerm,
        setItemSearchTerm,
        setCategoryID,
        setItemID,
        setIsCategoriesUpdated,
        setIsItemsUpdated,
    };

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
};
