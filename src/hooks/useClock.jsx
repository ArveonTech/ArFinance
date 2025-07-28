// ClockComponent.jsx
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const useClock = () => {
  const [time, setTime] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs());
    }, 1000); // update tiap 1 detik

    return () => clearInterval(interval); // bersihin interval saat unmount
  }, []);

  return (
    <div style={{ fontFamily: "monospace" }}>
      {time.format("HH:mm:ss")} {/* atau pakai format lain sesuai selera */}
    </div>
  );
};

export default useClock;
