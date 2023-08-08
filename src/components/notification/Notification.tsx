import { FC, useLayoutEffect, useRef } from "react";
import {Typography} from "@components";
import {NotificationType} from "./NotificationsContainer";
import * as styles from "./notification.css";

interface Props {
    notification: NotificationType;
    clear: (data: NotificationType) => void;
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
        <div className={styles.notification({ type: notification.variant })}>
            <Typography color={"text"}>{notification.message}</Typography>
        </div>
    );
};

export default Notification;
