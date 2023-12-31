import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}
export default AddCabin;
// export default function AddCabin() {
//   const [isShowModal, setIsShowModal] = useState(false);
//   return (
//     <div>
//       <Button onClick={() => setIsShowModal((show) => !show)}>Create cabin</Button>
//       {isShowModal && <Modal onClose={()=> setIsShowModal(false)}>
//         <CreateCabinForm onCloseModal={()=> setIsShowModal(false)} />
//         </Modal>}
//     </div>
//   );
// }
