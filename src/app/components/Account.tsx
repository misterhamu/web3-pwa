"use client";
import { Button } from "@nextui-org/react";
import React from "react";
import { useAccount, useDisconnect, useEnsName } from "wagmi";

type Props = {};

export default function Profile({}: Props) {
  const { address, status } = useAccount();
  const { disconnect } = useDisconnect();
  if (status === "connecting" || status === "reconnecting")
    return <p>Loading Address</p>;
  if (status === "disconnected") return <div>Disconnected</div>;
  return (
    <div className="flex justify-between gap-3 items-center">
      <p>{address}</p>
      <Button color="default" onClick={() => disconnect()}>
        Disconnect
      </Button>
    </div>
  );
}
