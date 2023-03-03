import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ConflictError } from "../errors/http-errors";
import { User } from "../models/user";
import * as NotesApi from "../network/notes_api";
import { SignUpCredentials } from "../network/notes_api";
import styleUtils from "../styles/utils.module.scss";
import TextInputField from "./form/TextInputField";

type Props = {
  onDismiss: () => void;
  onSignUpSuccessful: (user: User) => void;
};

const SignUpModal = ({ onDismiss, onSignUpSuccessful }: Props) => {
  const [errorText, setErrorText] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpCredentials>();

  async function onSubmit(credentials: SignUpCredentials) {
    try {
      const newUser = await NotesApi.signUp(credentials);
      onSignUpSuccessful(newUser);
    } catch (error) {
      if (error instanceof ConflictError) {
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
        <Modal.Title>Sign Up</Modal.Title>
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
            name="email"
            label="Email"
            type="email"
            placeholder="Email"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.email}
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
            className={styleUtils.width100}
            type="submit"
            disabled={isSubmitting}
          >
            Sign Up
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SignUpModal;
