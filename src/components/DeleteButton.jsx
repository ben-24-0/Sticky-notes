import Trash from "../icons/Trash";
import { db } from "../appWrite/databases";
import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";
const DeleteButton = ({ noteId }) => {
    const {setNotes} = useContext(NoteContext)
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
