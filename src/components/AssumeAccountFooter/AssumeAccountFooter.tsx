import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const AssumeAccountFooter = () => {
  const [assumeAs, setAssumeAs] = useState<string>("");

  //* Effects
  useEffect(() => {
    if (sessionStorage.getItem("assume_as")) {
      setAssumeAs(sessionStorage.getItem("assume_as") || "");
    }
  }, []);

  //* JSX
  if (!assumeAs) return <div />;

  return (
    <motion.div
      className="fixed bottom-0 bg-gradient-to-r from-cyan-500 to-primary-600 w-full p-4 rounded-t-md"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, type: "tween" }}
    >
      <p className="font-semibold text-center text-white">
        You are logged in as {assumeAs} and editing this user profile using
        admin privileges.{" "}
        <span
          onClick={() => window.close()}
          className="underline hover:cursor-pointer"
        >
          Click here to exit
        </span>
      </p>
    </motion.div>
  );
};

export default AssumeAccountFooter;
