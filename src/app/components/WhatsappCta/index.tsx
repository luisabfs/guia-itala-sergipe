import Link from "next/link";
import Image from "next/image";

const DEFAULT_MESSAGE = "Oi, Itala! Vim pelo seu site e gostaria de planejar minha viagem para Sergipe com você. Poderia me passar mais informações sobre os passeios e roteiros turísticos?";

export default function WhatsappCta({ title = "Planeje sua viagem", message = DEFAULT_MESSAGE }: { title?: string; message?: string; }) {
  return (
    <Link target="_blank" className="flex p-2 justify-center w-full gap-2 bg-[#1C4D42] rounded-full shadow-lg md:py-2 md:px-5 hover:opacity-85" href={`https://wa.me/557996411312?text=${encodeURIComponent(message)}`}>
      <Image width={16} height={16} src="/icons/whatsapp-light.svg" alt="Ícone do Whatsapp" />
      <span className="text-white font-bold text-md md:text-base">{title}</span>
    </Link>
  );
}
