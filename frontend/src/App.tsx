import React from "react";
import "./App.css";
import { fetchNotes } from "./redux/slices/notes";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import Note from "./components/Note/Note";
import { Container, Row, Col } from "react-bootstrap";

function App() {
  const dispatch = useAppDispatch();
  const notes = useAppSelector((state) => state.note);

  React.useEffect(() => {
    dispatch(fetchNotes());
  }, []);

  return (
    <Container>
      <Row>
        {notes.items.map((n, idx) => {
          return (
            <Col xs={4}>
              <Note note={n} key={n._id} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default App;
