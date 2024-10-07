import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { showToast } from "../../utils/toast";
import { validateOtpTokenForPasswordReset } from "../../api/AuthApi";

const ValidateToken = ({ setIsValidToken, inputs, setInputs }) => {
    const [openModal, setOpenModal] = useState(false);

    const handleInputChange = (event, index) => {
        const value = event.target.value;
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const newInputs = [...inputs];
            newInputs[index] = value;
            setInputs(newInputs);

            // Move focus to the next input if the current one is filled
            if (value.length === 1 && index < inputs.length - 1) {
                document.getElementById(`input${index + 2}`).focus();
            }
        }
    };

    const handlePaste = (event) => {
        event.preventDefault();
        const pasteData = event.clipboardData.getData('text/plain').slice(0, 6); // Obtiene los datos pegados y los limita a 6 caracteres
        const newInputs = pasteData.split('').concat(Array(6 - pasteData.length).fill('')); // Divide los datos en un array de caracteres y asegura que haya 6 elementos
        setInputs(newInputs); // Actualiza el estado con el nuevo array
        document.getElementById(`input${pasteData.length + 1}`).focus(); // Mueve el foco al siguiente input después del último dígito pegado
    };

    const handleKeyDown = (event, index) => {
        if (event.key === 'Backspace' && inputs[index] === '') {
            const newInputs = [...inputs];
            newInputs[index - 1] = '';
            setInputs(newInputs);
            document.getElementById(`input${index}`).focus();
        }
    };

    const handleClickCancelModal = () => {
        setInputs(["", "", "", "", "", ""])
        setOpenModal(false)
    }

    const { mutate } = useMutation({
        mutationFn: validateOtpTokenForPasswordReset,
        onError: (error) => {
            setInputs(["", "", "", "", "", ""])
            showToast("error", error.message)
        },
        onSuccess: (response) => {
            setOpenModal(false)
            setIsValidToken(true)
            showToast("success", response.message)
        }
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        const otpToken6Digits = inputs.join('');
        mutate({ otpToken6Digits })
    }
    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-center font-bold mb-2">Recuperar Cuenta</h1>
            <p>Ingresa el token que te enviamos por correo electrónico para recuperar tu cuenta.</p>
            <button className="shadow-md rounded-lg max-w-max mx-auto bg-gray-800 text-white px-4 py-2 mt-4" onClick={() => setOpenModal(true)}>Ingresar Token</button>
            {openModal && (
                <div className="bg-black/50 fixed inset-0 flex justify-center items-center">
                    <div className="bg-white shadow-md rounded-lg w-full max-w-md p-4">
                        <h1 className="text-center text-2xl mb-4">Ingresar Token de Confirmación</h1>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div onPaste={handlePaste} className="flex justify-evenly border border-slate-200 py-4 rounded-lg">
                                {inputs.map((value, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        name={`input${index + 1}`}
                                        id={`input${index + 1}`}
                                        value={value}
                                        maxLength={1}
                                        onChange={(event) => handleInputChange(event, index)}
                                        onKeyDown={(event) => handleKeyDown(event, index)}
                                        className="border border-gray-200 w-10 h-10 shadow-inner rounded-lg outline-none text-center focus:shadow-gray-800/50"
                                        required
                                    />
                                ))}
                            </div>

                            <div className="flex justify-around">
                                <button type="submit" className="bg-gray-800 text-white px-8 py-1 rounded-lg">Verificar</button>
                                <button onClick={handleClickCancelModal} className="bg-red-500 text-white px-8 py-1 rounded-lg">Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>

    )
}

export default ValidateToken