import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { useRouter } from "next/dist/client/router";
import Modal from "@material-tailwind/react/Modal";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import ModalBody from "@material-tailwind/react/ModalBody";
import { useState } from "react";
import { db } from "../firebase";

const DocumentRow = ({ id, filename, timestamp, session }) => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);

  const handelDelete = (event) => {
    event.stopPropagation();
    setModalOpen(true);
  };
  const deleteDocument = () => {
    db.collection("userDocs")
      .doc(session.user.email)
      .collection("docs")
      .doc(id)
      .delete()
      .then(() => {
        setModalOpen(false);
        router.reload();
      });
  };
  return (
    <div
      onClick={() => {
        router.push(`/doc/${id}`);
      }}
      className="flex items-center justify-between pl-4 pt-4 pb-4 rounded-lg hover:bg-gray-100 text-gray-700 text-sm cursor-pointer"
    >
      <Icon name="article" size="3xl" color="blue" />
      <p className="flex-grow pl-5 w-10 pr-10 truncate">{filename}</p>
      <p className="pr-5 text-sm">{timestamp.toDate().toLocaleDateString()}</p>
      <Button
        color="gray"
        buttonType="outline"
        iconOnly={true}
        rounded={true}
        ripple="dark"
        className="border-0"
        onClick={handelDelete}
      >
        {" "}
        <Icon name="delete" size="3xl" />
      </Button>
      <Modal size="sm" active={modalOpen} toggler={() => setModalOpen(false)}>
        <ModalBody>Are you sure you want to delete ?</ModalBody>
        <ModalFooter>
          <Button
            color="blue"
            buttonType="link"
            onClick={(e) => setModalOpen(false)}
            ripple="dark"
          >
            Cancel
          </Button>{" "}
          <Button
            color="red"
            buttonType="link"
            onClick={deleteDocument}
            ripple="light"
          >
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default DocumentRow;
