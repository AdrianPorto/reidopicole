import React from "react";
import OptionItem from "./OptionItem";
import { CgIcecream } from "react-icons/cg";
import Image from "next/image";
import logo from "../../../public/logo.jpg";
// import { Container } from './styles';

const NavBar: React.FC = () => {
  return (
    <div className="border-r w-[250px] h-screen">
      <div className="h-[200px]">
        <div className="p-[40px]">
          <Image src={logo} className="rounded-[10px]" alt=""></Image>
        </div>
      </div>
      <OptionItem
        nome={"Produtos"}
        src={"/cadastros"}
        icon={<CgIcecream className="text-black"></CgIcecream>}
      ></OptionItem>
    </div>
  );
};

export default NavBar;
