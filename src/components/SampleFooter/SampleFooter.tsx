import { motion } from "framer-motion";

import { signOut } from "utils";

const SampleFooter = () => {
  return (
    <motion.div
      className="fixed bottom-0 bg-gradient-to-r from-cyan-500 to-primary-600 w-full p-4 rounded-t-md"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, type: "tween" }}
    >
      <p className="font-semibold text-center text-white">
        You are viewing a sample profile. <br className="block sm:hidden" />
        <span
          onClick={() => signOut()}
          className="underline hover:cursor-pointer"
        >
          Click here to sign in to your profile
        </span>
        .
      </p>
    </motion.div>
  );
};

export default SampleFooter;
