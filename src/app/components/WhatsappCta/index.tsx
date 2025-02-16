import Link from "next/link";
import Image from "next/image";

export default function WhatsappCta() {
  return (
    <Link target="_blank" className="flex p-2 text-lg justify-center w-full gap-2 bg-[#1C4D42] font-bold rounded-full md:text-sm md:py-2 md:px-5 hover:opacity-85" href="https://wa.me/557996411312?text=Oi%2C%20Itala!%20Vim%20pelo%20seu%20site%20e%20gostaria%20de%20planejar%20minha%20viagem%20para%20Sergipe%20com%20voc%C3%AA.%20Poderia%20me%20passar%20mais%20informa%C3%A7%C3%B5es%20sobre%20os%20passeios%20e%20roteiros%20tur%C3%ADsticos?">
      <Image width={16} height={16} src="/icons/whatsapp-light.svg" alt="Ícone do Whatsapp" />
      <span className="text-white">Fale comigo</span>
    </Link>
  );
}
