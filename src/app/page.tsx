"use client";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useAddToHomescreenPrompt } from "./hooks/useAddToHomeScreen";
import PWAInstallerPrompt from "react-pwa-installer-prompt";
import { useNetwork, useSignMessage } from "wagmi";
import { verifyMessage } from "viem";
export default function Home() {
  const { chain } = useNetwork()

  const [prompt, promptToInstall] = useAddToHomescreenPrompt();
  const [isVisible, setVisibleState] = useState(false);

  const hide = () => setVisibleState(false);

  useEffect(() => {
    if (prompt) {
      setVisibleState(true);
    }
  }, [prompt]);

  const { data, error, isLoading, signMessage, isError } = useSignMessage({
		onSuccess(data, variables) {
        alert(data)
		},
		onError(error) {
	
		},
	})
  
  return (
    <>
      <h2>Home</h2>
      {/* {chain.name}
      {chain.unsupported ? "true" : "false"} */}

      <button onClick={()=>{signMessage({message: "signMessage"})}}>Sign mess</button>
      <PWAInstallerPrompt
        render={({ onClick }) => (
          <button type="button" onClick={onClick}>
            Install
          </button>
        )}
        callback={(data) => console.log(data)}
      />
    </>
  );
}
