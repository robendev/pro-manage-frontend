import { useState } from "react"
import ValidateToken from "../../components/Auth/ValidateToken";
import ResetPassword from "../../components/Auth/ResetPassword";

const RecoverAccountView = () => {
  const [isValidToken, setIsValidToken] = useState(false);
  const [inputs, setInputs] = useState(["", "", "", "", "", ""]);

  return (
    <div className="flex-1 flex flex-row w-full justify-center px-4">
      {
        isValidToken ?
          (<ResetPassword
            isValidToken={isValidToken}
            inputs={inputs}
          />) :
          (<ValidateToken
            setIsValidToken={setIsValidToken}
            inputs={inputs}
            setInputs={setInputs} />)
      }
    </div>
  )
}

export default RecoverAccountView