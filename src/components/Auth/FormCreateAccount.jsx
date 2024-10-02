import React from "react";

const FormCreateAccount = ({ register, errors, watch }) => {
  const password = watch("password");
  return (
    <>
      <div>
        <label htmlFor="username" className="block text-gray-700 sr-only">
          Nombre de usuario
        </label>
        <div className="relative flex items-center gap-2">
          <i className="fa-solid fa-user w-5 text-center"></i>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Nombre de usuario"
            className="w-full px-4 py-1 border shadow-md rounded-lg text-xs"
            {...register("username", {
              required: {
                value: true,
                message: "El nombre de usuario es obligatorio.",
              },
              minLength: {
                value: 3,
                message:
                  "El nombre de usuario debe tener al menos 3 caracteres.",
              },
              pattern: {
                value: /^[a-zA-Z0-9\s\u00C0-\u017F]+$/,
                message:
                  "El username solo puede contener letras, números, espacios y acentos",
              },
            })}
          />
          {errors.username && (
            <i className="absolute top-1/5 right-2 fa-solid fa-circle-exclamation text-center text-red-500"></i>
          )}
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-gray-700 sr-only">
          Email
        </label>
        <div className="relative flex items-center gap-2">
          <i className="fa-solid fa-at w-5 text-center"></i>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-1 border shadow-md rounded-lg text-xs"
            {...register("email", {
              required: {
                value: true,
                message: "El email es obligatorio.",
              },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "El formato del email no es válido",
              },
            })}
          />
          {errors.email && (
            <i className="absolute top-1/5 right-2 fa-solid fa-circle-exclamation text-center text-red-500"></i>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-gray-700 sr-only">
          Contraseña
        </label>
        <div className="relative flex items-center gap-2">
          <i className="fa-solid fa-lock w-5 text-center"></i>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Contraseña"
            className="w-full px-4 py-1 border shadow-md rounded-lg text-xs"
            {...register("password", {
              required: {
                value: true,
                message: "La contraseña es obligatoria.",
              },
              minLength: {
                value: 8,
                message: "La contraseña debe tener al menos 8 caracteres.",
              },
              validate: {
                hasUpperCase: (value) =>
                  /[A-Z]/.test(value) ||
                  "La contraseña debe contener al menos una letra mayúscula.",
                hasLowerCase: (value) =>
                  /[a-z]/.test(value) ||
                  "La contraseña debe contener al menos una letra minúscula.",
                hasNumber: (value) =>
                  /[0-9]/.test(value) ||
                  "La contraseña debe contener al menos un número.",
                hasSpecialChar: (value) =>
                  /[@$!%*?&#]/.test(value) ||
                  "La contraseña debe contener al menos un carácter especial (@, $, !, %, *, ?, &, #).",
              },
            })}
          />
          {errors.password && (
            <i className="absolute top-1/5 right-2 fa-solid fa-circle-exclamation text-center text-red-500"></i>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-gray-700 sr-only"
        >
          Contraseña
        </label>
        <div className="relative flex items-center gap-2">
          <i className="fa-solid fa-unlock w-5 text-center"></i>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirmación de Contraseña"
            className="w-full px-4 py-1 border shadow-md rounded-lg text-xs"
            {...register("confirmPassword", {
              required: {
                value: true,
                message: "La confirmación de la contraseña es obligatoria.",
              },
              validate: (value) =>
                value === password || "Las contraseñas no coinciden.",
            })}
          />
          {errors.confirmPassword && (
            <i className="absolute top-1/5 right-2 fa-solid fa-circle-exclamation text-center text-red-500"></i>
          )}
        </div>
      </div>
    </>
  );
};

export default FormCreateAccount;
