import { db } from "@/pages/firebase/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { parse } from "path";
import React, { useEffect, useRef, useState } from "react";

// import { Container } from './styles';
import { FaArrowLeftLong } from "react-icons/fa6";
import { toast } from "react-toastify";

interface Props {
  id: number;
  productNome: String;
  setOpenDeleteProducts: (value: boolean) => void;
}

const DeleteProducts: React.FC<Props> = ({
  id,
  productNome,
  setOpenDeleteProducts,
}) => {
  const [name, setName] = useState(productNome);
  const [lastUID, setLastUID] = useState(0);

  const modalRef = useRef<any>();

  useEffect(() => {
    const handleKeyPress = (e: any) => {
      if (e.key === "Escape") {
        setOpenDeleteProducts(false);
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

    try {
      await deleteDoc(userDocRef)
        .then((e: any) => {
          toast.success(`Produto excluido com sucesso!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setOpenDeleteProducts(false);
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
      <div className=" flex  w-[30%]   h-[230px] overflow-hidden flex-col opacity-100  rounded-[15px]  bg-white ">
        <div className="p-[20px] border-b border-zinc-300 flex space-x-[20px] items-center ">
          <div>
            <FaArrowLeftLong
              className="text-[20px] hover:cursor-pointer"
              onClick={() => {
                setOpenDeleteProducts(false);
              }}
            ></FaArrowLeftLong>
          </div>
          <div className="font-semibold ">Deletar Produto</div>
        </div>
        <div className="pt-[50px] pb-[50px] pl-[20px] pr-[20px]">
          <div>
            Deseja deletar o produto <b> {name}</b>?
          </div>
          <div className="w-full mt-[30px] flex justify-between space-x-[250px]">
            <button
              className="w-full h-[40px] bg-zinc-400 text-white rounded-[5px] "
              onClick={() => {
                setOpenDeleteProducts(false);
              }}
            >
              Cancelar
            </button>
            <button
              className="w-full h-[40px] bg-red-600 text-white rounded-[5px] "
              onClick={fetchProducts}
            >
              Deletar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProducts;
