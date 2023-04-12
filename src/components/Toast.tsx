import { motion } from "framer-motion";
import { BsCheckCircleFill } from "react-icons/bs";
import { BsXCircleFill } from "react-icons/bs";

interface ToastProps {
  title: string;
  message: string;
  type?: "success" | "error";
}

const variants = {
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      delay: i * 0.12,
    },
  }),
  hidden: { opacity: 0 },
};

export default function Toast({ title, message, type }: ToastProps) {
  return (
    <motion.div initial="hidden" animate="visible" variants={variants}>
      <div className="flex flex-row items-center gap-1 rounded-lg border border-white/5 bg-white/5 p-5 backdrop-blur">
        {type === "success" && <BsCheckCircleFill className="text-green-500" />}
        {type === "error" && <BsXCircleFill className="text-rose-500" />}

        <div className="mx-2 flex-col text-white">
          <h3 className="text-[0.75rem] font-semibold opacity-90">{title}</h3>
          <p className="break-words text-xs font-medium opacity-50">
            {message}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
