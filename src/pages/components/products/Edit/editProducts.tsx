import { db } from "@/pages/firebase/firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { parse } from "path";
import React, { useEffect, useRef, useState } from "react";

// import { Container } from './styles';
import { FaArrowLeftLong } from "react-icons/fa6";
import { toast } from "react-toastify";

interface Props {
  id: number;
  productNome: String;
  productValor: String;
  productQuantidade: number;
  setOpenEditProducts: (value: boolean) => void;
}

const EditProducts: React.FC<Props> = ({
  id,
  productNome,
  productValor,
  productQuantidade,
  setOpenEditProducts,
}) => {
  const [name, setName] = useState(productNome);
  const [quantidade, setQuantidade] = useState(productQuantidade);
  const [valor, setValor] = useState(productValor);
  const [ultimoId, setUltimoId] = useState("0");
  const [lastUID, setLastUID] = useState(0);
  const [tipo, setTipo] = useState("Pote 2L");

  const modalRef = useRef<any>();

  useEffect(() => {
    const handleKeyPress = (e: any) => {
      if (e.key === "Escape") {
        setOpenEditProducts(false);
      }
    };

    const modalElement = modalRef.current;

    if (modalElement) {
      modalElement.setAttribute("tabIndex", "0");
      modalElement.addEventListener("keydown", handleKeyPress);
      modalElement.focus();
    }

    return () => {
      if (modalElement) {
        modalElement.removeEventListener("keydown", handleKeyPress);
      }
    };
  }, []);

  const fetchProducts = async () => {
    const data = collection(db, "products");
    const querySnapshot = await getDocs(data);

    const Prod = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    const userDocRef = doc(db, "products", id.toString());

    const userData = {
      id: id,
      nome: name,
      tipo: tipo,
      quantidade: quantidade,
      valor: valor,
    };

    console.log(userData);
    try {
      await setDoc(userDocRef, userData)
        .then((e: any) => {
          toast.success(`Produto editado com sucesso!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setOpenEditProducts(false);
        })
        .catch();
    } catch (error: any) {
      console.error("Erro ao adicionar o documento:", error.message);
    }
  };

  return (
    <div
      className="w-screen h-screen absolute flex flex-1 justify-center   items-center   bg-black bg-opacity-80 "
      ref={modalRef}
    >
      <div className=" flex  w-[30%]   h-[310px] overflow-hidden flex-col opacity-100  rounded-[15px]  bg-white ">
        <div className="p-[20px] border-b border-zinc-300 flex space-x-[20px] items-center ">
          <div>
            <FaArrowLeftLong
              className="text-[20px] hover:cursor-pointer"
              onClick={() => {
                setOpenEditProducts(false);
              }}
            ></FaArrowLeftLong>
          </div>
          <div className="font-semibold">Editar Produto</div>
        </div>
        <div className="p-[20px]">
          <div>
            <div>Nome</div>
            <input
              className="border-zinc-300 border outline-none rounded-[5px] w-full h-[35px] pl-[10px]"
              onChange={(e: any) => {
                setName(e.target.value);
              }}
              defaultValue={name.toString()}
            ></input>
          </div>
          <div className="flex flex-1  space-x-[20px] w-full mt-[15px]">
            <div className="w-full">
              <div>Tipo</div>
              <select
                className="border-zinc-300 border outline-none rounded-[5px] w-full  h-[35px] pl-[10px] pr-[5px]"
                onChange={(e: any) => {
                  setTipo(e.target.value);
                }}
              >
                <option>Pote 2L</option>
                <option>Pote 1L</option>
                <option>Picolé</option>
              </select>
            </div>
            <div className="w-full">
              <div>Valor</div>
              <input
                className="border-zinc-300 border outline-none rounded-[5px] w-full  h-[35px] pl-[10px] pr-[5px]"
                placeholder="R$00,00"
                onFocus={(e: any) => {
                  if (e.target.value.length == 0) {
                    e.target.value = "R$";
                  }
                }}
                onChange={(e: any) => {
                  e.target.value =
                    "R$" + e.target.value.replace(/[^0-9,]/g, "");

                  if (e.target.value.length < 1) {
                    e.target.value = "R$";
                  }
                  setValor(e.target.value);
                }}
              ></input>
            </div>

            <div className="w-full">
              <div>Quantidade</div>
              <input
                className="border-zinc-300 border outline-none rounded-[5px]  w-full  h-[35px] pl-[10px] pr-[5px]"
                type="number"
                onChange={(e: any) => {
                  setQuantidade(e.target.value);
                }}
                defaultValue={quantidade}
              ></input>
            </div>
          </div>
          <div className="w-full mt-[30px]">
            <button
              className="w-full h-[40px] bg-blue-500 text-white rounded-[5px] "
              onClick={fetchProducts}
            >
              Editar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProducts;
