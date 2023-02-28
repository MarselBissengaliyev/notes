import React from "react";
import { Note as NoteModel } from "../../models/note";
import { Card } from "react-bootstrap";
import styles from './Note.module.scss';

type Props = {
  note: NoteModel;
};

const Note = ({ note }: Props) => { 
  return (
    <Card className={styles.noteCard}>
      <Card.Body>
        <Card.Title>{note.title}</Card.Title>
        <Card.Text className={styles.cardText}>{note.text}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Note;
