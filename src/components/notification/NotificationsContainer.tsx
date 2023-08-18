import {FC, useCallback, useState} from "react";
import Notification from "./Notification";
import {Subject} from "rxjs";
import {v4 as getId} from "uuid";
import {useSubscription} from "observable-hooks";
// import * as styles from "./notification.css";
import {AnimatePresence, motion} from "framer-motion";
// import {sprinkles} from "@styles/sprinkles.css";

export interface NotificationInfo {
    variant: string;
    // variant: string;
    message: string;
}

export interface NotificationType extends NotificationInfo {
    id: string;
    timeout: number;
}

const subject$ = new Subject<NotificationType>();

const makeNotification = (notification: NotificationInfo) =>
    subject$.next({
        ...notification,
        id: getId(),
        timeout: 5000,
    });

export const showMessage = (message: string) =>
    makeNotification({
        variant: "info",
        message,
    });

export const showError = (message: string) =>
    makeNotification({
        variant: "error",
        message,
    });

export const showSuccess = (message: string) =>
    makeNotification({
        variant: "success",
        message,
    });

export const showWarning = (message: string) =>
    makeNotification({
        variant: "warning",
        message,
    });

const NotificationContainer: FC = () => {
    const [notifications, setNotifications] = useState<
        ReadonlyArray<NotificationType>
    >([]);

    const removeNotification = useCallback(
        (notification: NotificationType) =>
            setNotifications((prevState) =>
                prevState.filter((item) => item.id !== notification.id),
            ),
        [],
    );

    useSubscription(subject$, (notification) => {
        setNotifications((notificationsPrev) => [
            ...notificationsPrev,
            notification,
        ]);
    });

    return (
        <div className={"styles.wrap"}>
            <motion.div

                layout
            >
                <AnimatePresence initial={false}>
                    {notifications.map((message) => (
                        <motion.div
                            layout
                            key={message.id}
                            initial={{opacity: 0, x: 50, scale: 0.5}}
                            animate={{opacity: 1, x: 0, scale: 1}}
                            exit={{
                                opacity: 0,
                                scale: 0.8,
                                x: 50,
                                transition: {
                                    duration: 0.3,
                                },
                            }}
                        >
                            <Notification notification={message} clear={removeNotification}/>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default NotificationContainer;
