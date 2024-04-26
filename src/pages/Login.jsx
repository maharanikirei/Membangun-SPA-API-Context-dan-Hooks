import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import LoginInput from "../components/LoginInput";
import { login } from "../utils/network-data";
import LocaleContext from "../contexts/LocaleContext";

function Login({ loginSuccess }) {
  const navigate = useNavigate();
  const { locale } = useContext(LocaleContext);

  async function handleLogin({ email, password }) {
    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data);
      navigate("/");
    }
  }

  const loginTitle = locale === "id" ? "Masuk" : "Login";
  const registrationText =
    locale === "id" ? "Belum punya akun?" : "Don't have an account?";
  const registrationLinkText = locale === "id" ? "Daftar" : "Register here";

  return (
    <section className="mx-auto min-h-screen flex items-center justify-center transform transition duration-500 ease-in-out">
      <div className="h-98 flex items-center justify-center">
        <div
          id="form-container"
          className="p-16 rounded-lg border border-gray-50 shadow-2xl w-96"
        >
          <h2 id="form-title" className="text-center text-4xl font-bold mb-12">
            {loginTitle}
          </h2>
          <LoginInput login={handleLogin} />
          <div className="flex justify-center mt-3">
            <p className="text-sm me-1">{registrationText}</p>
            <Link to="/register" className="text-blue-500 text-sm">
              {registrationLinkText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

Login.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default Login;
