import { FC, useLayoutEffect, useRef } from "react";
import {Typography} from "@components";
import {NotificationType} from "./NotificationsContainer";
import {clsx} from "@utils/etc.ts";
// import * as styles from "./notification.css";

interface Props {
    notification: NotificationType;
    clear: (data: NotificationType) => void;
}

const notificationStyles = {
    success: "border-success-500 bg-success-500/30 text-success-700 dark:text-success-500"
}

const Notification: FC<Props> = ({ notification, clear }) => {
    const restTimeout = useRef<number>(0);
    const timeout = useRef<NodeJS.Timeout>();

    useLayoutEffect(() => {
        restTimeout.current = notification.timeout;
        timeout.current = setTimeout(
            () => clear(notification),
            notification.timeout,
        );

        return () => {
            if (timeout.current) clearInterval(timeout.current);
        };
    }, [notification, clear]);

    return (
        <div className={clsx(
            "border backdrop-blur-sm shadow-md py-1.5 px-5 rounded",
            notificationStyles[notification.variant]
        )}>
            <Typography color={"text"}>{notification.message}</Typography>
        </div>
    );
};

export default Notification;
