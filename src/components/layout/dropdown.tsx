import DropdownNotification from "components/DropdownNotification";
import Link from "next/link";
import { useEffect, useState } from "react";
import { checkNotifications } from "utils/push";
import { useAccount } from "wagmi";

export default function Dropdown() {
  const { address } = useAccount();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (address) {
        checkNotifications(address).then((notifications) => {
          setNotifications(notifications);
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [address]);

  return (
    <>
      <div className="mr-4">
        <img
          className="h-10"
          onClick={() => setIsOpen(!isOpen)}
          style={{ cursor: "pointer" }}
          src="https://s2.loli.net/2022/11/06/Xj5N8JQ7AImOtgh.png"
        />
        {isOpen && (
          <>
            <div className="mt-2 h-96 w-60 absolute bg-[#E9DDD1] border border-2 border-black rounded-xl">
              {isOpen &&
                notifications
                  .slice(1)
                  .map((notification, idx) => (
                    <DropdownNotification
                      notification={notification}
                      key={idx}
                    />
                  ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
