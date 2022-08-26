import { motion } from "framer-motion";

interface ProgressBarProps {
  initial?: string; // accepts 0% to 100%
  progress: string; // accepts 0% to 100%
  showProgressInText?: boolean;
}

const ProgressBar = ({
  initial = "0%",
  progress,
  showProgressInText = false,
}: ProgressBarProps) => {
  console.log("progress", progress);
  return (
    <div className="w-full">
      <div className="h-2 rounded-lg bg-slate-300">
        <motion.div
          className={`rounded-lg h-full bg-primary-500`}
          initial={{ width: initial || "0%" }}
          animate={{ width: progress }}
          transition={{ duration: 1.5 }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
