import React, {ReactNode, DragEvent, createRef} from "react";
import "./SplitView2.css";

/**
 * This component receives two children which become
 * [children[0]] => leftChild and [children[1]] => rightChild,
 * split by additional div of the handle.
 * [defaultXPos] is used to set initial x position of the handle,
 * [width] and [height] are used to set whole div size according to usage,
 * they set to "100%" by default.
 *
 * @param props { defaultXPos: any, children: ReactNode[] }
 * @constructor
 */
export default function SplitView2(props: {
  defaultXPos: any,
  children: ReactNode[]
}) {

  console.assert(props.children.length === 2, "bad html");

  const {
    defaultXPos,
    children: [leftChild, rightChild]
  } = props;

  const leftRef = createRef<HTMLDivElement>();
  const rightRef = createRef<HTMLDivElement>();

  function handleDragStart(event: DragEvent) {
    const nothing = document.createElement("img");
    // image does not work in safari, base64 is used instead
    // noinspection SpellCheckingInspection
    nothing.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=";
    event.dataTransfer.setDragImage(nothing, 0, 0);
  }

  function handleDrag(event: DragEvent) {
    if (!leftRef.current) return;
    if (!rightRef.current) return;
    console.log("drag pageX: " + event.pageX);
    leftRef.current.style.width = `${event.pageX}px`;
    rightRef.current.style.width = `calc(100% - ${event.pageX}px)`;
  }

  function handleDragEnd(event: DragEvent) {
    if (!leftRef.current) return;
    if (!rightRef.current) return;
    console.log("drag over pageX: " + event.pageX);
    leftRef.current.style.width = `${event.pageX}px`;
    rightRef.current.style.width = `calc(100% - ${event.pageX}px)`;
  }

  return (
    <div className="SplitView2">
      <div ref={leftRef} style={{width: defaultXPos, height: "100%", minWidth: "48px"}}>
        {leftChild}
      </div>
      <div
        draggable
        className="SplitView2-Handle"
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
      />
      <div ref={rightRef} style={{width: "100%", height: "100%"}}>
        {rightChild}
      </div>
    </div>
  );
}
