import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import LoginModal from "./components/LoginModal";
import NavBar from "./components/NavBar";
import NotesPageLoggedInView from "./components/NotesPageLoggedInView";
import NotesPageLoggedOutView from "./components/NotesPageLoggedOutView";
import SignUpModal from "./components/SignUpModal";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { fetchLoggedInUser, setLoggedInUser } from "./redux/slices/user";
import styles from "./styles/App.module.scss";

function App() {
  const dispatch = useAppDispatch();
  const { loggedInUser, status } = useAppSelector((state) => state.user);

  const [showSignUpModal, setShowSignUpModal] = React.useState(false);
  const [showLoginModal, setShowLoginModal] = React.useState(false);
  useEffect(() => {
    dispatch(fetchLoggedInUser());
  }, []);
  return (
    <>
      <NavBar
        loggedInUser={loggedInUser}
        onLoginClicked={() => setShowLoginModal(true)}
        onSignUpClicked={() => setShowSignUpModal(true)}
        onLogoutSuccessful={() => dispatch(setLoggedInUser(null))}
      />
      <Container className={styles.notesPage}>
        <>
          {loggedInUser ? (
            <NotesPageLoggedInView />
          ) : (
            <NotesPageLoggedOutView />
          )}
        </>
      </Container>
      {showSignUpModal && (
        <SignUpModal
          onDismiss={() => setShowSignUpModal(false)}
          onSignUpSuccessful={(user) => {
            dispatch(setLoggedInUser(user));
            setShowSignUpModal(false);
          }}
        />
      )}
      {showLoginModal && (
        <LoginModal
          onDismiss={() => setShowLoginModal(false)}
          onLoginSucceful={(user) => {
            dispatch(setLoggedInUser(user));
            setShowLoginModal(false);
          }}
        />
      )}
    </>
  );
}

export default App;
