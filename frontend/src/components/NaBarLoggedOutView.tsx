import { Button } from "react-bootstrap";

type Props = {
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
};

const NaBarLoggedOutView = ({ onSignUpClicked, onLoginClicked }: Props) => {
  return (
    <>
      <Button onClick={onSignUpClicked}>Sign Up</Button>
      <Button onClick={onLoginClicked}>Log In</Button>
    </>
  );
};

export default NaBarLoggedOutView;
