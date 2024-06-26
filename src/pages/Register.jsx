import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterInput from "../components/RegisterInput";
import { register } from "../utils/network-data";
import LocaleContext from "../contexts/LocaleContext";

function Register() {
  const navigate = useNavigate();
  const { locale } = useContext(LocaleContext);

  async function onRegisterHandler(user) {
    const { error } = await register(user);
    if (!error) {
      navigate("/");
    }
  }

  const registerTitle = locale === "id" ? "Daftar" : "Register";
  const loginText =
    locale === "id" ? "Sudah punya akun?" : "Already have an account?";
  const loginLinkText = locale === "id" ? "Masuk" : "Login";

  return (
    <section className="mx-auto min-h-screen flex items-center justify-center transform transition duration-500 ease-in-out">
      <div className="h-96 flex items-center justify-center">
        <div
          id="form-container"
          className="p-16 rounded-lg border border-gray-200 shadow-2xl w-96"
        >
          <h2 id="form-title" className="text-center text-4xl font-bold mb-10">
            {registerTitle}
          </h2>
          <RegisterInput register={onRegisterHandler} />
          <div className="flex justify-center mt-2">
            <p className="text-sm me-1">{loginText}</p>
            <Link to="/" className="text-blue-500 text-sm">
              {loginLinkText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
