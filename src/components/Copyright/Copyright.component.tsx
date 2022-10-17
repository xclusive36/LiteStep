/* eslint-disable jsx-a11y/anchor-is-valid */
import { useTranslation } from "react-i18next";

import "./Copyright.styles.css";

const Copyright: React.FC = () => {
    const { t } = useTranslation();

    return <div className="copyright-container ion-text-center copyright">{t("COPYRIGHT")}</div>;
};

export default Copyright;
