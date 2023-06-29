import {FC} from "react";
import {ReactComponent as Add} from "@assets/icons/add.svg";
import {ReactComponent as UserIcon} from "@assets/icons/user.svg";
import {ReactComponent as Pencil} from "@assets/icons/pencil.svg";
import {ReactComponent as DoneIcon} from "@assets/icons/done.svg";
import {ReactComponent as CloseIcon} from "@assets/icons/close.svg";
import {ReactComponent as LogoutIcon} from "@assets/icons/logout.svg";
import {ReactComponent as BackIcon} from "@assets/icons/chevron-left.svg";
import {ReactComponent as SettingsIcon} from "@assets/icons/settings.svg";
import {ReactComponent as ArrowDropdown} from "@assets/icons/arrow-dropdown.svg";

import * as styles from "./icon.css";
import {clsx} from "@utils/etc.ts";

export const icons = {
    UserIcon,
    LogoutIcon,
    BackIcon,
    CloseIcon,
    SettingsIcon,
    DoneIcon,
    ArrowDropdown,
    Add,
    Pencil
};

interface Props {
    icon: keyof typeof icons;
    size?: keyof typeof styles.iconSize;
    className?: string
}

const IconComponent: FC<Props> = ({
                                      icon,
                                      size = "normal",
                                      className
                                  }) => (
    <div className={clsx(styles.icon({size}), className)}>
        {icons[icon]({})}
    </div>
);

export default IconComponent;
