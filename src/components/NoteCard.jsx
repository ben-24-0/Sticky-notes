import { useRef, useEffect, useState } from "react";
// import Trash from "../icons/Trash.jsx";
import DeleteButton from "./DeleteButton.jsx";
import Spinner from "../icons/Spinner.jsx";
import { setNewOffset, autoGrow, setZIndex, bodyParser } from "../utils.js";
import { db } from "../appWrite/databases.js";
// import {setNotes} from ""

const NoteCard = ({ note, setNotes }) => {
  const colors = JSON.parse(note.colors);
  const body = bodyParser(note.body);
  {
    /*Because there is not predetermined height for each card,
     we will auto adjust the card size based on the contents within the text area.
      By using a ref we will access the textarea 
      and auto grow the height when the card is rendered, 
      by calling this inside of the useEffect hook.*/
  }
  const textAreaRef = useRef(null);

  //curent val of textarea

  useEffect(() => {
    autoGrow(textAreaRef);
  }, []);
  //to change position state
  const [position, setPosition] = useState(JSON.parse(note.position));

  let mouseStartPos = { x: 0, y: 0 };
  const cardRef = useRef(null);

  const mouseDown = (e) => {
    if (e.target.className === "card-header") {
      mouseStartPos.x = e.clientX;
      mouseStartPos.y = e.clientY;
      setZIndex(cardRef.current);
      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseup", mouseUp);
    }
  };

  const mouseUp = () => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);

    const newPosition = setNewOffset(cardRef.current); //refresh wont change pos now
    saveData("position", newPosition);
    // db.notes.update(note.$id,{position:JSON.stringify(newPosition)})
  };

  const saveData = async (key, value) => {
    const payload = { [key]: JSON.stringify(value) };
    try {
      await db.notes.update(note.$id, payload);
    } catch (error) {
      console.error(error);
    }
    setSaving(false);
  };
  const mouseMove = (e) => {
    let mouseMoveDir = {
      x: mouseStartPos.x - e.clientX,
      y: mouseStartPos.y - e.clientY,
    };
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;
    // x: cardRef.current.offsetLeft - mouseMoveDir.x,
    //   y: cardRef.current.offsetTop - mouseMoveDir.y,
    const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
    setPosition(newPosition);
  };
  const [saving, setSaving] = useState(false);
  const keyUpTimer = useRef(null);
  const handleKeyUp = async () => {
    //1 - Initiate "saving" state
    setSaving(true);

    //2 - If we have a timer id, clear it so we can add another two seconds
    if (keyUpTimer.current) {
      clearTimeout(keyUpTimer.current);
    }

    //3 - Set timer to trigger save in 2 seconds
    keyUpTimer.current = setTimeout(() => {
      saveData("body", textAreaRef.current.value);
    }, 2000);
  };

  return (
    <div
      className="card"
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      ref={cardRef}
    >
      <div
        className="card-header"
        onMouseDown={mouseDown}
        style={{ backgroundColor: colors.colorHeader }}
      >
       
         <DeleteButton noteId={note.$id} setNotes={setNotes} />
        {saving && (
          <div className="card-saving">
            <Spinner color={colors.colorText} />
            <span style={{ color: colors.colorText }}>Saving...</span>
          </div>
        )}
      </div>
      <div className="card-body">
        <textarea
          ref={textAreaRef}
          onKeyUp={handleKeyUp}
          name=""
          defaultValue={body}
          style={{ color: colors.colorText }}
          onInput={() => {
            autoGrow(textAreaRef);
          }}
          onFocus={() => {
            setZIndex(cardRef.current);
          }}
          //to get rid of the scroll bar when inputing we add this
        ></textarea>
      </div>
    </div>
  );
};

export default NoteCard;
