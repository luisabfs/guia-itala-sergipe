'use client';

import Link from "next/link";
import Image from "next/image";
import WhatsappCta from "../WhatsappCta";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  
  return (
    <div className="flex flex-col items-center w-full justify-between md:flex-row max-w-3xl lg:max-w-4xl xl:max-w-5xl">
        <Link href="/" className="relative w-[220px] md:w-[240px] lg:w-[260px] h-28">
          <Image fill objectFit="cover" src="/logos/logo-horizontal-white.png" alt="Logo Guia Itala" />
        </Link>
        <nav className="flex flex-col-reverse px-4 w-full justify-center md:w-fit items-center gap-4 md:flex-row lg:text-lg">
          {/* {pathname !== '/' ? <div className="flex gap-1 items-center">
            <Link href="/" className="hover:opacity-85" shallow>Início</Link>
          </div> : null} */}
          <WhatsappCta />
        </nav>
    </div>
  );
}
