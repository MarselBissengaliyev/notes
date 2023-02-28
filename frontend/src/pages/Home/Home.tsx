import React from "react";
import { fetchNotes } from "../../redux/slices/notes";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Note from "../../components/Note/Note";
import { Container, Row, Col } from "react-bootstrap";
import styles from './Home.module.scss';

const Home = () => {
  const dispatch = useAppDispatch();
  const notes = useAppSelector((state) => state.note);

  React.useEffect(() => {
    dispatch(fetchNotes());
  }, []);
  return (
    <Container>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes.items.map((n, idx) => {
          return (
            <Col key={n._id}>
              <Note className={styles.note} note={n} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Home;
