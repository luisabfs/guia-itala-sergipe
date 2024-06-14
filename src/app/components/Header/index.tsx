import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <div className="max-w-3xl lg:max-w-4xl xl:max-w-5xl" style={{display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between'}}>
        <div style={{ position:'relative', width: 250, height: 120}}>
            <Image fill objectFit="cover" src="/logos/logo-horizontal-white.png" alt="Logo Guia Itala" />
        </div>
        <nav className="hidden font-sans text-sm items-center gap-4 md:flex lg:text-lg">
            {/* <div className="flex gap-1 items-center">
              <Link href="#portfolio">Portfólio</Link>
              <Image width={18} height={18}  src="/icons/external-light.svg" alt="Ícone do Whatsapp" />
            </div>
            <div className="flex gap-1 items-center">
              <Link href="#tours">Roteiros</Link>
              <Image width={18} height={18}  src="/icons/external-light.svg" alt="Ícone do Whatsapp" />
            </div> */}
            <Link href="https://wa.me/557996411312?text=Oi%2C%20Itala!%20Vim%20pelo%20seu%20site%20e%20gostaria%20de%20planejar%20minha%20viagem%20para%20Sergipe%20com%20voc%C3%AA.%20Poderia%20me%20passar%20mais%20informa%C3%A7%C3%B5es%20sobre%20os%20passeios%20e%20roteiros%20tur%C3%ADsticos?" target="_blank" className="flex gap-2 bg-[#1C4D42] font-bold rounded-full py-1 px-5">
              <Image width={16} height={16}  src="/icons/whatsapp-light.svg" alt="Ícone do Whatsapp" />
              <span>Fale comigo</span>
            </Link>
        </nav>
    </div>
  );
}
