import { useEffect, useState } from "react";
import { replaceAddressWithEns } from "utils/ens";

const DropdownNotification = (n: any) => {
  const { notification } = n;
  const [formattedMessage, setFormattedMessage] = useState(
    n.notification.message
  );

  useEffect(() => {
    const formatMessage = async () => {
      const formatted = await replaceAddressWithEns(notification.message);
      setFormattedMessage(formatted);
    };
    formatMessage();
  }, [notification.message]);

  return (
    <>
      <a href={notification.cta}>
        <div className=" mx-2 my-2 border border-2 border-black rounded-xl bg-[#FDBBBB]">
          <div className="mx-2 my-2 ">
            <p>{notification.title}</p>
            <p className="text-ellipsis overflow-hidden">{formattedMessage}</p>
          </div>
        </div>
      </a>
    </>
  );
};

export default DropdownNotification;
