import Trash from "../icons/Trash";
import { db } from "../appWrite/databases";

const DeleteButton = ({ noteId, setNotes }) => {
  const handleDelete = async (e) => {
    db.notes.delete(noteId);
    setNotes((prev) => prev.filter((note) => note.$id !== noteId));
  };
  return (
    <div onClick={handleDelete}>
      <Trash />
    </div>
  );
};

export default DeleteButton;
