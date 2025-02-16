import Link from "next/link";
import Image from "next/image";
import WhatsappCta from "../WhatsappCta";

export default function Header() {
  return (
    <div className="flex flex-col items-center w-full justify-between md:flex-row max-w-3xl lg:max-w-4xl xl:max-w-5xl">
        <Link href="/" className="relative w-[260px] h-32">
            <Image fill objectFit="cover" src="/logos/logo-horizontal-white.png" alt="Logo Guia Itala" />
        </Link>
        <nav className="flex w-full justify-center md:w-fit items-center gap-4 md:flex lg:text-lg">
            {/* <div className="flex gap-1 items-center">
              <Link href="#portfolio">Portfólio</Link>
              <Image width={18} height={18}  src="/icons/external-light.svg" alt="Ícone do Whatsapp" />
            </div>*/}
            <div className="flex gap-1 items-center">
              <Link href="/roteiros" className="hover:opacity-85" shallow>Roteiros</Link>
            </div> 
            <WhatsappCta />
        </nav>
    </div>
  );
}
