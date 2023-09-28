import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { imgConfirm } from "assets";
import { useSubmitUserAcknowledge } from "api/hooks";
import Button from "components/Button/Button";
import Modal from "components/Modal/Modal";
import {
  getAssumeAsSessionStorage,
  getRequireAcknowledgementSessionStorage,
  removeRequireAcknowledgementSessionStorage,
} from "utils";

const RequireAcknowledgeFooter = () => {
  const [showFooter, setShowFooter] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  // *Methods
  const handleDisplayModal = () => {
    setShowModal(true);
  };

  const handleDismissModal = () => {
    setShowModal(false);
  };

  const handleMutationSuccess = () => {
    removeRequireAcknowledgementSessionStorage();
    window.location.reload();
  };

  const handleAcknowledge = () => {
    submitUserAcknowledge.mutate();
  };

  // *Queries
  const submitUserAcknowledge = useSubmitUserAcknowledge(handleMutationSuccess);

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
      className="fixed bottom-0 bg-gradient-to-r from-orange-500 to-red-600 w-full p-4 rounded-t-md z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, type: "tween" }}
    >
      <Modal
        content={
          <div className="flex flex-col my-2">
            <img
              className="self-center"
              src={imgConfirm}
              alt="confirm-logout"
              width={200}
              height={200}
            />
            <p className="self-center my-4 text-black">
              I acknowledge that all my profile details are accurate as of
              today.
            </p>
            <div className="w-[220px] self-center">
              <Button
                onClick={handleAcknowledge}
                isLoading={submitUserAcknowledge?.isLoading}
              >
                Confirm
              </Button>
            </div>
          </div>
        }
        isVisible={showModal}
        onDismiss={handleDismissModal}
      />

      <p className="font-semibold text-center text-white">
        If your profile details are correct, please acknowledge the accuracy of
        information.{" "}
        <span
          onClick={handleDisplayModal}
          className="underline hover:cursor-pointer"
        >
          Click here to acknowledge
        </span>
      </p>
    </motion.div>
  );
};

export default RequireAcknowledgeFooter;
