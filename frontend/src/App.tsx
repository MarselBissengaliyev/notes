import React, { useState } from "react";
import Home from "./pages/Home/Home";
import { Button, Container } from "react-bootstrap";
import AddNoteDialog from "./components/AddNoteDialog/AddNoteDialog";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { fetchNotes } from "./redux/slices/notes";
import stylesUtils from "./styles/utils.module.scss";

function App() {
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const dispatch = useAppDispatch();
  return (
    <Container>
      <Button
        className={`mb-4 ${stylesUtils.blockCenter}`}
        onClick={() => setShowAddNoteDialog(true)}
      >
        Add new note
      </Button>
      <Home />
      {showAddNoteDialog && (
        <AddNoteDialog
          onNoteSaved={() => {
            dispatch(fetchNotes());
            setShowAddNoteDialog(false);
          }}
          onDismiss={() => setShowAddNoteDialog(false)}
        />
      )}
    </Container>
  );
}

export default App;
