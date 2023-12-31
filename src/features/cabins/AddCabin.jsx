import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

export default function AddCabin() {
  const [isShowModal, setIsShowModal] = useState(false);
  return (
    <div>
      <Button onClick={() => setIsShowModal((show) => !show)}>Create cabin</Button>
      {isShowModal && <Modal onClose={()=> setIsShowModal(false)}>
        <CreateCabinForm onCloseModal={()=> setIsShowModal(false)} />
        </Modal>}
    </div>
  );
}
