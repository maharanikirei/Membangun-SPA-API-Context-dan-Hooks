import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import useInput from "../../hooks/useInput";
import LocaleContext from "../../contexts/LocaleContext";

function RegisterInput({ register }) {
  const { locale } = useContext(LocaleContext);

  const [name, setName] = useInput("");
  const [email, setEmail] = useInput("");
  const [password, setPassword] = useInput("");
  const [confirmPassword, setConfirmPassword] = useInput("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const placeholders = {
    id: {
      name: "Nama",
      email: "Email",
      password: "Kata Sandi",
      confirmPassword: "Konfirmasi Kata Sandi",
      button: "Daftar",
    },
    en: {
      name: "Name",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      button: "Register",
    },
  };

  const currentPlaceholders = placeholders[locale];

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      register({ name, email, password, confirmPassword });
    } else {
      setPasswordMatchError(true);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="space-y-4">
      <input
        className="form-control"
        type="text"
        placeholder={currentPlaceholders.name}
        value={name}
        onChange={setName}
      />
      <input
        className="form-control"
        type="email"
        placeholder={currentPlaceholders.email}
        value={email}
        onChange={setEmail}
      />
      <input
        className="form-control"
        type="password"
        placeholder={currentPlaceholders.password}
        autoComplete="current-password"
        value={password}
        onChange={setPassword}
      />
      <input
        className="form-control"
        type="password"
        placeholder={currentPlaceholders.confirmPassword}
        autoComplete="new-password"
        value={confirmPassword}
        onChange={setConfirmPassword}
      />
      {passwordMatchError && (
        <p className="text-red-500">Password Tidak Cocok.</p>
      )}
      <button className="w-full h-13 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        {currentPlaceholders.button}
      </button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
