"use client";
import React from "react";
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Navbar as NextUINavbar,
} from "@nextui-org/navbar";
import NextLink from "next/link";
import Image from "next/image";
import { ThemeSwitch } from "./Theme-switch";
import { useAccount } from "wagmi";
import Profile from "./Account";
import { WalletOptions } from "./WalletOptions";
import { ConnectKitButton } from "connectkit";

type Props = {};

export default function Navbar({}: Props) {
  function ConnectWallet() {
    const { isConnected } = useAccount();
    if (isConnected) return <Profile />;
    return    <ConnectKitButton />;
  }

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink
            className="flex justify-start items-center gap-2 mt-2 "
            href="/"
          >
            <span className="text-3xl font-semibold">Web3</span>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="basis-1 pl-4" justify="end">
        {/* <ThemeSwitch /> */}
        <ConnectWallet />
      </NavbarContent>
    </NextUINavbar>
  );
}
