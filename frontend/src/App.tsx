import React from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import AddNoteDialog from "./components/AddNoteDialog/AddEditNoteDialog";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import {
  deleteNoteAction,
  editNoteAction,
  fetchNotes,
  pushNoteAction,
} from "./redux/slices/notes";
import stylesUtils from "./styles/utils.module.scss";
import { FaPlus } from "react-icons/fa";
import Note from "./components/Note/Note";
import { Note as NoteModel } from "./models/note";
import * as NotesApi from "./network/notes_api";
import styles from "./styles/App.module.scss";

function App() {
  const dispatch = useAppDispatch();
  const [showAddNoteDialog, setShowAddNoteDialog] = React.useState(false);
  const notes = useAppSelector((state) => state.note);
  const notesLoading = notes.status === "loading";
  const showNotesLoadingError = notes.status === "error";

  const [noteToEdit, setNoteToEdit] = React.useState<NoteModel | null>(null);

  React.useEffect(() => {
    dispatch(fetchNotes());
  }, []);

  async function deleteNote(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      dispatch(deleteNoteAction(note));
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  const noteGrid = (
    <Row xs={1} md={2} xl={3} className={`g-4 ${styles.noteGrid}`}>
      {notes.items.map((n) => {
        return (
          <Col key={n._id}>
            <Note
              className={styles.note}
              note={n}
              onNoteClicked={setNoteToEdit}
              onDeleteNoteClicked={deleteNote}
            />
          </Col>
        );
      })}
    </Row>
  );
  return (
    <Container className={styles.notesPage}>
      <Button
        className={`mb-4 ${stylesUtils.blockCenter} ${stylesUtils.flexCenter}`}
        onClick={() => setShowAddNoteDialog(true)}
      >
        <FaPlus />
        Add new note
      </Button>
      {notesLoading && <Spinner animation="border" variant="primary" />}
      {showNotesLoadingError && (
        <p>Something wen't wrong. Please refresh the page</p>
      )}
      {!notesLoading && !showNotesLoadingError && (
        <>
          {notes.items.length > 0 ? (
            noteGrid
          ) : (
            <p>You don't have any notes yet</p>
          )}
        </>
      )}
      {showAddNoteDialog && (
        <AddNoteDialog
          onNoteSaved={(newNote) => {
            dispatch(pushNoteAction(newNote));
            setShowAddNoteDialog(false);
          }}
          onDismiss={() => setShowAddNoteDialog(false)}
        />
      )}
      {noteToEdit && (
        <AddNoteDialog
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSaved={(updatedNote) => {
            dispatch(editNoteAction(updatedNote));
            setNoteToEdit(null);
          }}
        />
      )}
    </Container>
  );
}

export default App;
