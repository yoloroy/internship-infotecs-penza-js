import List from "./NotesList/List";
import Editor from "./Editor/Editor";
import './Main.css';
import SplitView2 from "./common/SplitView2/SplitView2";
import {useState} from "react";

function Main() {

  // TODO
  const [stubNotes, setStubNotes] = useState([
    { name: "new note", text: "" },
    { name: "new new note", text: "" },
    { name: "new new new note", text: "" },
    { name: "new new new new note", text: "" }
  ]);

  const [currentNoteI, setCurrentNoteI] = useState(0);

  function chooseNote(i: number) {
    setCurrentNoteI(i);
  }

  function updateNote(text: string) {
    const updatedNote = { name: stubNotes[currentNoteI].name, text: text };
    setStubNotes(stubNotes.map((value, index) => index === currentNoteI ? updatedNote : value));
  }

  return (
    <div className="Main">
      <SplitView2 defaultXPos="25vh">
        <List
          headers={stubNotes.map((v) => v.name)}
          chosenI={currentNoteI}
          onChoose={chooseNote}
        />
        <Editor text={stubNotes[currentNoteI].text} updateText={updateNote}/>
      </SplitView2>
    </div>
  );
}

export default Main;
