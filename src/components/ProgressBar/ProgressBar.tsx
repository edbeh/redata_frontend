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
  return (
    <div className="flex items-center w-full space-x-2">
      <div className="w-full h-2 rounded-lg shadow-md bg-slate-300">
        <motion.div
          className={`rounded-lg h-full  bg-gradient-to-r from-cyan-500 to-primary-500`}
          initial={{ width: initial || "0%" }}
          animate={{ width: progress }}
          transition={{ duration: 0.5 }}
        />
      </div>
      {showProgressInText && (
        <p className="text-xs text-slate-400 whitespace-nowrap">
          {progress} complete
        </p>
      )}
    </div>
  );
};

export default ProgressBar;
