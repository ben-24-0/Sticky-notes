export const setNewOffset = (card, mouseMoveDir = { x: 0, y: 0 }) => {
  const offsetLeft = card.offsetLeft - mouseMoveDir.x;
  const offsetTop = card.offsetTop - mouseMoveDir.y;

  return {
    x: offsetLeft < 0 ? 0 : offsetLeft,
    y: offsetTop < 0 ? 0 : offsetTop,
  };
};

export const autoGrow = (textAreaRef) => {
  const { current } = textAreaRef;
  current.style.height = "auto"; //rESET THE HEIGHT IG;
  current.style.height = current.scrollHeight + "px"; //rESET THE HEIGHT IG;
};

export const setZIndex = (selectedCard) => {
  selectedCard.style.zIndex = 99;

  Array.from(document.getElementsByClassName("card")).forEach((card) => {
    if (card !== selectedCard) {
      card.style.zIndex = selectedCard.style.zIndex - 1;
    }
  });
};


export const bodyParser = (val)=>{
  try{
    return JSON.parse(val)
  }
  catch(err)
  {
    return val
  }
}
