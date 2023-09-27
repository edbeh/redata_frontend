import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  getAssumeAsSessionStorage,
  getRequireAcknowledgementSessionStorage,
} from "utils";

const RequireAcknowledgeFooter = () => {
  const [showFooter, setShowFooter] = useState<boolean>(false);

  //* Effects
  useEffect(() => {
    if (
      getRequireAcknowledgementSessionStorage() === "true" &&
      !getAssumeAsSessionStorage()
    ) {
      setShowFooter(true);
    }
  }, []);

  //* JSX
  if (!showFooter) return <div />;

  return (
    <motion.div
      className="fixed bottom-0 bg-gradient-to-r from-orange-500 to-red-600 w-full p-4 rounded-t-md"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, type: "tween" }}
    >
      <p className="font-semibold text-center text-white">
        If your profile details are correct, please acknowledge the accuracy of
        information.{" "}
        <span
          onClick={() => window.close()}
          className="underline hover:cursor-pointer"
        >
          Click here to acknowledge
        </span>
      </p>
    </motion.div>
  );
};

export default RequireAcknowledgeFooter;
