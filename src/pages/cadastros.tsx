import React, { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import { Inter } from "next/font/google";
import {
  DocumentData,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
const inter = Inter({ subsets: ["latin"] });
import { auth, db } from "../pages/firebase/firebase";
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import CreateProducts from "./components/products/Create/createProducts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditProducts from "./components/products/Edit/editProducts";
import DeleteProducts from "./components/products/Delete/deleteProducts";
// import { Container } from './styles';

const Cadastros: React.FC = () => {
  const [products, setProducts] = useState<any>([]);

  const [openCreateProducts, setOpenCreateProducts] = useState(false);
  const [openEditProducts, setOpenEditProducts] = useState(false);
  const [openDeleteProducts, setOpenDeleteProducts] = useState(false);

  const [productId, setProductId] = useState(0);
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [quantidade, setQuantidade] = useState(0);
  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollectionRef = collection(db, "products");

      try {
        const querySnapshot = await getDocs(productsCollectionRef);

        const productsData = querySnapshot.docs.map((doc) => doc.data());
        setProducts(productsData.sort((a: any, b: any) => a.id - b.id));

        // Agora 'products' contém todos os dados dos documentos na coleção 'products'
        console.log(products);
      } catch (error) {
        console.error("Erro ao obter dados do Firestore:", error);
      }
    };

    fetchProducts();
  }, [openCreateProducts, openEditProducts, openDeleteProducts]);
  return (
    <div className={`${inter.className} flex`}>
      <NavBar></NavBar>
      <div className=" bg-gray-600 w-full h-screen flex p-[20px] relative">
        <div className=" flex flex-col w-full bg-white rounded-[10px]">
          <div className="flex   p-[20px] justify-between border-b items-center">
            <div className="font-semibold text-[25px] ">Produtos</div>
            <button
              className="bg-green-600 p-[10px] rounded-[5px] hover:scale-105 duration-500 text-white font-bold"
              onClick={() => {
                setOpenCreateProducts(true);
              }}
            >
              + Novo produto
            </button>
          </div>

          <div className="flex flex-col  m-[20px] rounded-[10px] border h-full overflow-auto">
            <div className="flex text-center  ">
              <div className="w-[7%]   border-b  text-zinc-400 ">Id</div>
              <div className="w-[45%] pl-[5px] border-b border-l text-zinc-400">
                Nome
              </div>
              <div className="w-[22%] pl-[5px] border-b border-l text-zinc-400">
                Tipo
              </div>
              <div className="w-[10%] pl-[5px] border-b border-l text-zinc-400">
                Valor
              </div>
              <div className="w-[8%] pl-[5px] border-b border-l text-zinc-400">
                Qt
              </div>
              <div className="w-[8%] pl-[5px] border-b border-l text-zinc-400">
                Ações
              </div>
            </div>
            <div className="overflow-auto scroll">
              {products.map((product: any, index: any) => (
                <div className="flex h-[50px]   ">
                  <div className="w-[7%]  pl-[5px] border-b flex items-center justify-center">
                    {product.id}
                  </div>
                  <div className="w-[45%] pl-[5px] border-b border-l flex items-center justify-center  ">
                    {product.nome}
                  </div>
                  <div className="w-[22%] pl-[5px] border-b border-l flex items-center justify-center ">
                    {product.tipo}
                  </div>
                  <div className="w-[10%] pl-[5px] border-b border-l flex items-center justify-center">
                    {product.valor}
                  </div>
                  <div className="w-[8%] pl-[5px] border-b border-l flex items-center justify-center">
                    {product.quantidade}
                  </div>
                  <div className="w-[8%] pl-[5px] border-b border-l space-x-[20px] flex items-center justify-center">
                    <button
                      className="bg-blue-600 w-[40px] h-[40px] rounded-[8px] text-white justify-center flex items-center"
                      onClick={() => {
                        setOpenEditProducts(true);
                        setProductId(product.id);
                        setNome(product.nome);
                        setValor(product.valor);
                        setQuantidade(product.quantidade);
                      }}
                    >
                      <FaPen />
                    </button>
                    <button
                      className="bg-red-600 w-[40px] h-[40px] rounded-[8px] text-white justify-center flex items-center"
                      onClick={() => {
                        setOpenDeleteProducts(true);
                        setProductId(product.id);
                        setNome(product.nome);
                      }}
                    >
                      <FaTrash></FaTrash>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {openCreateProducts && (
        <CreateProducts
          setOpenCreateProducts={setOpenCreateProducts}
        ></CreateProducts>
      )}
      {openEditProducts && (
        <EditProducts
          setOpenEditProducts={setOpenEditProducts}
          id={productId}
          productNome={nome}
          productValor={valor}
          productQuantidade={quantidade}
        ></EditProducts>
      )}

      {openDeleteProducts && (
        <DeleteProducts
          setOpenDeleteProducts={setOpenDeleteProducts}
          id={productId}
          productNome={nome}
        ></DeleteProducts>
      )}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Cadastros;
