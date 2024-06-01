import React, { ReactNode, forwardRef, useImperativeHandle } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

interface ChildComponentProps {
    children?: ReactNode;
    onClose?: () => void;
    modalTitle?: string;
    action?: string;
    size?: "sm" | "md" | "lg" | "xl";
    backdrop?: "opaque" | "blur" | "transparent";
}

interface ChildComponentHandles {
    onOpen: () => void;
}

// eslint-disable-next-line react/display-name
const NextModal = forwardRef<ChildComponentHandles, ChildComponentProps>(
    ({ children, modalTitle = "", action = "Save", size = "md", backdrop = "opaque" }, ref) => {
        const { isOpen, onOpen, onOpenChange } = useDisclosure();
        useImperativeHandle(ref, () => ({
            onOpen,
        }));

        return (
            <Modal
                backdrop={backdrop}
                size={size}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{modalTitle}</ModalHeader>
                            <ModalBody>{children}</ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    {action}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        );
    }
);

export default NextModal;
