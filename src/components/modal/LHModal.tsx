import React, { Dispatch, SetStateAction } from "react";
import { Modal } from "antd";

type TLHModalProps = {
  children: React.ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  width?: number;
};

const LHModal = ({ children, open, setOpen, width }: TLHModalProps) => {
  return (
    <Modal
      centered
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      width={width}
      footer
    >
      {children}
    </Modal>
  );
};

export default LHModal;
