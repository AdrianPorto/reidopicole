import { db } from "@/pages/firebase/firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { parse } from "path";
import React, { useEffect, useRef, useState } from "react";
import InputMask from "react-input-mask";

// import { Container } from './styles';
import { FaArrowLeftLong } from "react-icons/fa6";
import { toast } from "react-toastify";

interface Props {
  setOpenCreateProducts: (value: boolean) => void;
}

const CreateProducts: React.FC<Props> = ({ setOpenCreateProducts }) => {
  const [name, setName] = useState("");
  const [quantidade, setQuantidade] = useState(0);
  const [valor, setValor] = useState("");
  const [ultimoId, setUltimoId] = useState("0");
  const [lastUID, setLastUID] = useState(0);
  const [tipo, setTipo] = useState("Pote 2L");
  const modalRef = useRef<any>();

  useEffect(() => {
    const handleKeyPress = (e: any) => {
      if (e.key === "Escape") {
        setOpenCreateProducts(false);
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

  useEffect(() => {
    const fetchID = async () => {
      const data = collection(db, "products");

      const querySnapshot = await getDocs(data);

      const Prod = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      if (Prod.length != 0) {
        console.log(Prod.sort((a: any, b: any) => a.id - b.id));

        setLastUID(parseInt(Prod[Prod.length - 1].id) + 1);
      } else {
        setLastUID(parseInt(ultimoId));
      }
    };
    fetchID();
  });

  const fetchProducts = async () => {
    const data = collection(db, "products");
    const querySnapshot = await getDocs(data);

    const Prod = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    const userDocRef = doc(db, "products", lastUID.toString());

    const userData = {
      id: lastUID,
      nome: name,
      tipo: tipo,
      quantidade: quantidade,
      valor: valor,
    };

    try {
      await setDoc(userDocRef, userData)
        .then((e: any) => {
          toast.success(`Produto criado com sucesso!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setOpenCreateProducts(false);
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
                setOpenCreateProducts(false);
              }}
            ></FaArrowLeftLong>
          </div>
          <div className="font-semibold">Novo Produto</div>
        </div>
        <div className="p-[20px]">
          <div>
            <div>Nome</div>
            <input
              className="border-zinc-300 border outline-none rounded-[5px] w-full h-[35px] pl-[10px]"
              placeholder="Digite aqui..."
              onChange={(e: any) => {
                setName(e.target.value);
              }}
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
              ></input>
            </div>
          </div>
          <div className="w-full mt-[30px]">
            <button
              className="w-full h-[40px] bg-green-500 text-white rounded-[5px] "
              onClick={fetchProducts}
            >
              Cadastrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProducts;
