import { IonInput } from "@ionic/react";
import { useContext } from "react";
import { SettingsContext } from "../../contexts/settings.context";

interface ContainerProps {
    className?: string;
    inputRef?: any;
    placeholder: string;
    onChange?: any;
}

const Input: React.FC<ContainerProps> = ({
    inputRef,
    placeholder,
    onChange,
}) => {
    const { setShowFooter } = useContext(SettingsContext); // Enable settings context

    return (
        <IonInput
            onIonFocus={() => setShowFooter(false)}
            onIonBlur={() => setShowFooter(true)}
            ref={inputRef}
            placeholder={placeholder}
            onIonChange={onChange}
        />
    );
};

export default Input;
