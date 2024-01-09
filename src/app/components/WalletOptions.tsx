"use client";
import { Button } from "@nextui-org/react";
import * as React from "react";
import { useEffect, useState } from "react";
import { Connector, useConnect } from "wagmi";

export function WalletOptions() {
  const { connectors, connect } = useConnect();

  const connector = connectors[0];
  return (
    <WalletOption
      connector={connectors[0]}
      onClick={() => {
        connect({ connector });
      }}
    />
  );
}

function WalletOption({
  connector,
  onClick,
}: {
  connector: Connector;
  onClick: () => void;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <div>
      <Button isDisabled={!ready} onClick={onClick}>
        {connector.name}
      </Button>
    </div>
  );
}
