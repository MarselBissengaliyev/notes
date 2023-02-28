import React from "react";
import { Note as NoteModel } from "../../models/note";
import { Card } from "react-bootstrap";
import styles from "./Note.module.scss";
import formatDate from "../../utils/formatDate";

type Props = {
  note: NoteModel;
  className?: string;
};

const Note = ({ note, className }: Props) => {
  let createdUpdatedText: string;
  if (note.updatedAt > note.createdAt) {
    createdUpdatedText = "Updated: " + formatDate(note.updatedAt);
  } else {
    createdUpdatedText = "Created: " + formatDate(note.createdAt);
  }
  return (
    <Card className={`${styles.noteCard} ${className}`}>
      <Card.Body className={styles.cardBody}>
        <Card.Title>{note.title}</Card.Title>
        <Card.Text className={styles.cardText}>{note.text}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">{createdUpdatedText}</Card.Footer>
    </Card>
  );
};

export default Note;
