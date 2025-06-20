import { useForm } from "react-hook-form";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import SignUp from "../views/SignUp";
import type { FormType } from "../views/SignUp";
import { ref, set } from "firebase/database";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormType>();

  const password = watch("password");

  const onSubmit = async (data: FormType) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      await updateProfile(userCredential.user, {
        displayName: data.nickname,
      });

      set(ref(db, `users/${userCredential.user.uid}`), {
        name: userCredential.user.displayName,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SignUp
      {...{
        register,
        handleSubmit,
        errors,
        password,
        onSubmit,
      }}
    />
  );
};

export default Register;
