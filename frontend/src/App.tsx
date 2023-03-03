import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginModal from "./components/LoginModal";
import NavBar from "./components/NavBar";
import SignUpModal from "./components/SignUpModal";
import NoteFoundPage from "./pages/NoteFoundPage";
import NotesPage from "./pages/NotesPage";
import PrivacyPage from "./pages/PrivacyPage";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { fetchLoggedInUser, setLoggedInUser } from "./redux/slices/user";
import styles from "./styles/App.module.scss";

function App() {
  const dispatch = useAppDispatch();
  const { loggedInUser } = useAppSelector((state) => state.user);

  const [showSignUpModal, setShowSignUpModal] = React.useState(false);
  const [showLoginModal, setShowLoginModal] = React.useState(false);
  useEffect(() => {
    dispatch(fetchLoggedInUser());
  }, []);

  return (
    <BrowserRouter>
      <NavBar
        loggedInUser={loggedInUser}
        onLoginClicked={() => setShowLoginModal(true)}
        onSignUpClicked={() => setShowSignUpModal(true)}
        onLogoutSuccessful={() => dispatch(setLoggedInUser(null))}
      />
      <Container className={styles.pageContainer}>
        <Routes>
          <Route path="/" element={<NotesPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/*" element={<NoteFoundPage />} />
        </Routes>
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
    </BrowserRouter>
  );
}

export default App;
