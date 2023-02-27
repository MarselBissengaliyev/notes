import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { fetchNotes } from "./redux/slices/notes";
import { useAppDispatch, useAppSelector } from "./redux/hooks";

function App() {
  const dispatch = useAppDispatch();
  const notes = useAppSelector((state) => state.note)

  React.useEffect(() => {
    dispatch(fetchNotes());
  }, []);

  return (
    <div className="App">
      {notes.items.map(n => <div>{n.title}</div>)}
    </div>
  );
}

export default App;
