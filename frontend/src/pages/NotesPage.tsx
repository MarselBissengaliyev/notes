import { Container } from "react-bootstrap";
import NotesPageLoggedInView from "../components/NotesPageLoggedInView";
import NotesPageLoggedOutView from "../components/NotesPageLoggedOutView";
import { useAppSelector } from "../redux/hooks";
import styles from "../styles/App.module.scss";

type Props = {};

const NotesPage = (props: Props) => {
  const { loggedInUser } = useAppSelector(
    (state) => state.user
  );
  return (
    <Container className={styles.notesPage}>
      <>
        {loggedInUser ? <NotesPageLoggedInView /> : <NotesPageLoggedOutView />}
      </>
    </Container>
  );
};

export default NotesPage;
