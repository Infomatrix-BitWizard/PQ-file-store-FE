'use client'

import React, { useState } from "react";
import { Button } from "@/app/ui/button/Button";
import { Modal } from "@/app/ui/modal/Modal";
import ModalContainer from "@/app/ui/modalContainer/ModalContainer";

const Example = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(true)}
    >
      <ModalContainer
        title={"Adjustment"}
        buttons={<Button onClick={() => {}}>Submit</Button>}
      >
        <div>
          <div>
            <input
              onChange={() => {}}
              value={''}
            />
          </div>
        </div>
      </ModalContainer>
    </Modal>
  );
};

export default Example;
