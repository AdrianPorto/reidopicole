import Link from "next/link";
import React from "react";

// import { Container } from './styles';
interface Props {
  nome: string;
  src: string;
  icon: any;
}

const OptionItem: React.FC<Props> = ({ nome, src, icon }) => {
  return (
    <Link href={src}>
      <div className="w-full h-[50px] border-t border-b flex justify-center items-center">
        <div className="flex justify-center items-center space-x-[5px]">
          <div>{icon}</div>
          <div className="text-black">{nome}</div>
        </div>
      </div>
    </Link>
  );
};

export default OptionItem;
