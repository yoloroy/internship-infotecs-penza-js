import './Editor.css';
import {ChangeEvent} from "react";

function Editor(props: { text: string, updateText: (text: string) => void }) {

  function handleChange(event: ChangeEvent) {
    props.updateText((event.target as HTMLTextAreaElement).value);
  }

  return (
    <div className="Editor">
      <textarea className="EditorTextArea" onChange={handleChange} value={props.text}/>
    </div>
  );
}

export default Editor;
