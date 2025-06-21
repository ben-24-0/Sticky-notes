import AddButton from "./AddButton";
import Color from "./Color";
import colors from "../assets/colors.json"


const Controls = () => {
  return (
    <div id ="controls"><AddButton/>
    {colors.map((col)=>(<Color key={col.id} color={col}/>))}
    </div>
  )
}

export default Controls