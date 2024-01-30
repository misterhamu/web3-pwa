"use client";
import {
  NavbarBrand,
  NavbarContent,
  Navbar as NextUINavbar
} from "@nextui-org/navbar";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import NextLink from "next/link";
import { useAccount } from "wagmi";
import Profile from "./Account";

type Props = {};

export default function Navbar({}: Props) {
  function ConnectWallet() {
    const { isConnected } = useAccount();
    // if (isConnected) return <Profile />;
    return    <ConnectButton chainStatus="name" showBalance={false} />;
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
