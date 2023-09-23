import { AnimatePresence, motion } from "framer-motion";
import { Dialog } from "@headlessui/react";
import type { PropsWithChildren } from "react";
import type { MotionProps } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ModalProps = PropsWithChildren<{
  open: boolean;
  action?: boolean;
  className?: string;
  modalClassName?: string;
  closePanelOnClick?: boolean;
  onConfirm?: () => void;
  closeModal: () => void;
}>;

export function Modal({
  open,
  action,
  children,
  className = "grid place-items-center",
  modalClassName,
  closePanelOnClick,
  onConfirm,
  closeModal,
}: ModalProps): JSX.Element {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
      closeModal();
    }
  };
  return (
    <AnimatePresence>
      {open ? (
        <Dialog
          className="relative z-50"
          open={open}
          onClose={closeModal}
          static
        >
          <motion.div
            className="fixed inset-0 bg-black/40"
            aria-hidden="true"
            {...backdrop}
          />
          <div className={cn("fixed inset-0 overflow-y-auto p-4", className)}>
            <Dialog.Panel
              className={cn("grid gap-10", modalClassName)}
              as={motion.div}
              onClick={closePanelOnClick ? closeModal : undefined}
              {...modal}
            >
              {children}
              {action ? (
                <div className="flex items-center justify-end gap-3">
                  <Button size="sm" variant="outline" onClick={closeModal}>
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleConfirm}>
                    Save
                  </Button>
                </div>
              ) : null}
            </Dialog.Panel>
          </div>
        </Dialog>
      ) : null}
    </AnimatePresence>
  );
}

const variants: MotionProps[] = [
  {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: {
      duration: 0.1,
    },
  },
  {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1, transition: { duration: 0.15 } },
    transition: {
      type: "spring",
      duration: 0.1,
      bounceDamping: 1,
      ease: [0.0, 0.97, 0.53, 1.0],
    },
  },
];

const [backdrop, modal] = variants;
