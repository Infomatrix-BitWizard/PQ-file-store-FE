"use client";

import React, { useRef, useState } from "react";
import ModalContainer from "@/app/ui/modalContainer/ModalContainer";
import { Button } from "@mui/material";
import { Modal } from "@/app/ui/modal/Modal";
import { createWorker } from "tesseract.js";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface ITesseractModalModalProps {
  isOpen: boolean;
  onClose: (data: boolean) => void;
}

const TesseractModal = ({ onClose, isOpen }: ITesseractModalModalProps) => {
  const ref = useRef<HTMLInputElement | null>(null);

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (e.target.files.length === 0) return;

    const file = e.target.files[0];
    setImageFile(file);

    if (ref.current) {
      ref.current.value = "";
    }
  };

  const handlerSubmit = async () => {
    try {
      if (!imageFile) {
        return;
      }

      const worker = await createWorker("eng");
      const ret = await worker.recognize(imageFile);
      await worker.terminate();

      const recognizedText = ret.data.text;

      const blob = new Blob([recognizedText], { type: "text/plain" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "recognized_text.txt";
      a.click();

      URL.revokeObjectURL(url);
    } catch (err) {
      console.info(err);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalContainer
        title={"Text recognition from photos"}
        buttons={
          <>
            <Button onClick={handlerSubmit}>Submit</Button>
          </>
        }
      >
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload files
          <input
            ref={ref}
            type="file"
            onChange={handleFileChange}
            // multiple
            style={{
              display: "none",
            }}
          />
        </Button>
      </ModalContainer>
    </Modal>
  );
};

export default TesseractModal;
