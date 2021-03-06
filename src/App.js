import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import StoryEditor from "./StoryEditor";
import { DragPreviewBlock } from "slate-react-dnd-plugin";
import { DragDropContainer } from "slate-react-dnd-plugin";
import { DropBlock } from "slate-react-dnd-plugin";

const insertBlockFn = (hoverIndex, item, parent, change) => {
  const result = change.insertNodeByKey(parent.key, hoverIndex, {
    object: "block",
    type: "paragraph",
    nodes: [
      {
        object: "text",
        leaves: [
          {
            text: "A new Block via drag&drop"
          }
        ]
      }
    ]
  });

  item.key = result.value.document.nodes._tail.array[hoverIndex].key;
};

const canDrop = (props, monitor) => {
  return true;
};

const onDrop = (item, parent, change) => {
  change.removeNodeByKey(item.key);
};

const previewBlockStyle = {
  backgroundColor: "white",
  cursor: "move"
};

const renderPreviewBlock = (isDragging, children) => {
  const opacity = isDragging ? 0.5 : 1;
  return <div style={{ ...previewBlockStyle, opacity }}>{children}</div>;
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <DragDropContainer>
          <div className="wrapper">
            <div className="editor">
              <StoryEditor />
            </div>
            <div className="rightMenu">
              <DragPreviewBlock
                className="rightMenu"
                onHover={insertBlockFn}
                renderBlock={renderPreviewBlock}
              >
                <div className="dragItem">
                  <p>Insert paragraph from here.</p>
                </div>
              </DragPreviewBlock>
              <DropBlock canDrop={canDrop} onDrop={onDrop}>
                <div className="dustbin">
                  <p>Drop paragraph here to delete it.</p>
                </div>
              </DropBlock>
            </div>
          </div>
        </DragDropContainer>
      </div>
    );
  }
}

export default App;
