import './List.css';
import "./NoteHeader.css";
import {createRef, UIEvent} from "react";

function List(props: { headers: string[], chosenI: number, onChoose: (i: number) => void }) {

  const {headers, chosenI, onChoose} = props;

  const listRef = createRef<HTMLDivElement>()

  function onClickElement(event: UIEvent) {
    const list = listRef.current;
    const target = event.target as Element;
    if (!list || !target) return;
    const i = Array.from(list.children).indexOf(target);
    if (i === -1) return;
    onChoose(i);
  }

  return <div className="List" ref={listRef}>
    {
      headers
        .map((header, i) =>
          <div
            className={`note_header_div${chosenI === i ? "--chosen" : ""}`}
            onClick={onClickElement}
          >
            {header}
          </div>
        )
    }
  </div>;
}

export default List;
