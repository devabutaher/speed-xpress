"use client";

import PrimaryButton from "@/ui/PrimaryButton";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import ProfileForm from "./ProfileForm";

const UpdateProfileModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <PrimaryButton onClick={onOpen} size="sm">
        Edit Profile
      </PrimaryButton>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        motionProps={{
          variants: {
            enter: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
            exit: { opacity: 0, scale: 0.97, transition: { duration: 0.15 } },
          },
        }}
        classNames={{
          base: "rounded-2xl",
          backdrop: "backdrop-blur-sm",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="border-b border-gray-200 dark:border-gray-800 pb-3">
                <h2 className="text-xl font-semibold">
                  UPDATE <span className="text-primary">PROFILE</span>
                </h2>
              </ModalHeader>
              <ModalBody className="py-2">
                <ProfileForm onClose={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateProfileModal;
