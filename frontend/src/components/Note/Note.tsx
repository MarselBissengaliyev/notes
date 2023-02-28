import React from "react";
import { Note as NoteModel } from "../../models/note";
import { Card } from "react-bootstrap";
import stylesUtils from "../../styles/utils.module.scss";
import styles from "./Note.module.scss";
import formatDate from "../../utils/formatDate";
import { MdDelete } from "react-icons/md";

type Props = {
  note: NoteModel;
  onNoteClicked: (note: NoteModel) => void;
  onDeleteNoteClicked: (note: NoteModel) => void;
  className?: string;
};

const Note = ({ note, onNoteClicked, onDeleteNoteClicked, className }: Props) => {
  let createdUpdatedText: string;
  if (note.updatedAt > note.createdAt) {
    createdUpdatedText = "Updated: " + formatDate(note.updatedAt);
  } else {
    createdUpdatedText = "Created: " + formatDate(note.createdAt);
  }
  return (
    <Card 
    className={`${styles.noteCard} ${className}`}
    onClick={() => onNoteClicked(note)}>
      <Card.Body className={styles.cardBody}>
        <Card.Title className={stylesUtils.flexCenter}>
          {note.title}
          <MdDelete
            className="text-muted ms-auto"
            onClick={(e) => {
              onDeleteNoteClicked(note);
              e.stopPropagation();
            }}
          />
        </Card.Title>
        <Card.Text className={styles.cardText}>{note.text}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">{createdUpdatedText}</Card.Footer>
    </Card>
  );
};

export default Note;
