import {Transition} from "@headlessui/react";
import React, {createContext, useEffect, useState} from "react";

type MessageDataType = {
  message: string;
  type: "error" | "success" | "normal";
};

type NotifContextType = {
  setShowNotification: (a: boolean) => void;
  setMessageData: (a: MessageDataType) => void;
  messageData?: MessageDataType;
  showNotification: boolean;
};

export const NotifContext = createContext<NotifContextType>({
  setShowNotification: () => {},
  setMessageData: () => {},
  showNotification: false,
});

const Notification = ({children}) => {
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [messageData, setMessageData] = useState<MessageDataType | undefined>();
  const [timer, setCurrentTimer] = useState();

  const notificationStyleResolver = () => {
    if (messageData) {
      const {type} = messageData;
      switch (type) {
        case "error":
          return "bg-red-200 p-2 text-red-600 rounded border border-red-500";
        case "success":
          return "bg-green-200 p-2 text-green-600 rounded border border-green-500";
        case "normal":
          return "bg-blue-200 p-2 text-blue-600 rounded border border-blue-500";
      }
    }
    return "";
  };

  useEffect(() => {
    if (showNotification && !timer) {
      const timeout = setTimeout(() => {
        setShowNotification(false);
        setCurrentTimer(undefined);
      }, 3000);
      setCurrentTimer(timeout as any);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [showNotification]);

  return (
    <NotifContext.Provider
      value={{
        messageData,
        setMessageData,
        showNotification,
        setShowNotification,
      }}
    >
      <div className="fixed top-5 w-full flex flex-row justify-center">
        <Transition
          show={showNotification}
          leaveTo="opacity-0"
          enterTo="opacity-100"
          enterFrom="opacity-0"
          leaveFrom="opacity-100"
          enter="transition-opacity duration-75"
          leave="transition-opacity duration-150"
        >
          <div className={notificationStyleResolver()}>
            {messageData?.message}
          </div>
        </Transition>
      </div>
      {children}
    </NotifContext.Provider>
  );
};

export default Notification;
