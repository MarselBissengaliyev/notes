import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { UnauthorizedError } from "../errors/http-errors";
import { User } from "../models/user";
import * as NotesApi from "../network/notes_api";
import { LoginCredentials } from "../network/notes_api";
import styleUtils from "../styles/utils.module.scss";
import TextInputField from "./form/TextInputField";

type Props = {
  onDismiss: () => void;
  onLoginSucceful: (user: User) => void;
};

const LoginModal = ({ onDismiss, onLoginSucceful }: Props) => {
  const [errorText, setErrorText] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>();

  async function onSubmit(credentials: LoginCredentials) {
    try {
      const newUser = await NotesApi.login(credentials);
      console.log(newUser);
      onLoginSucceful(newUser);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        setErrorText(error.message);
      } else {
        alert(error);
      }
      console.error(error);
    }
  }
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Log In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorText && <Alert variant="danger">{errorText}</Alert>}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="username"
            label="Username"
            type="text"
            placeholder="Username"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.username}
          />
          <TextInputField
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.password}
          />
          <Button
            type="submit"
            className={styleUtils.width100}
            disabled={isSubmitting}
          >
            Log In
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
