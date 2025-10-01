"use client";
import { useEffect, useState, Suspense } from "react";
import ProductCard from "../components/ProductCard";
import { FaSearch } from 'react-icons/fa';
import { useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "../components/Pagination";
import { Header } from "../components/Header";
import { Product } from '../types/index';

function HomeContent(){
  // Router y parámetros de búsqueda
  const router = useRouter();
  const searchParams = useSearchParams();
  // Estados
  const [products, setProducts] = useState<Product[]>([]);
  //const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState<string>("");
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Cargar datos desde public/api
  useEffect(() => {
    const fetchData = async () => {
      const productsRes = await fetch("/api/products.json");
      const productsData = await productsRes.json();
      setProducts(productsData);

      //const categoriesRes = await fetch("/api/categories.json");
      //const categoriesData = await categoriesRes.json();
      //setCategories(categoriesData);
    };
    fetchData();
  }, []);
  //control de tiempo para busquedade items
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);


  // Filtrar productos por búsqueda
  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  // Calcular paginación
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  //obtener valores de url
  useEffect(() => {
    const query = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const items = parseInt(searchParams.get("items") || "10");

    setSearch(query);
    setCurrentPage(page);
    setItemsPerPage(items);
  }, [searchParams]);

  //actualizar valores de url
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    params.set("page", currentPage.toString());
    params.set("items", itemsPerPage.toString());

    router.push(`/?${params.toString()}`);
  }, [search, currentPage, itemsPerPage, router]);

  return (
    <div className="pt-[75px] px-6 py-3 bg-[var(--gravastar-background)] min-h-screen text-white">
      <Header />

      {/* Barra de búsqueda + combo items por página */}
      <div className="flex items-center gap-4 mb-6 text-white sm:flex-row flex-col">
        <div className="flex jusitfy-center items-center rounded-lg bg-[var(--gravastar-purple)] gap-2">
          <FaSearch color="white" size={20} className="mx-2" />
          <label htmlFor="search-products" className="sr-only">Buscar producto</label>
          <input
            id="search-products"
            type="text"
            placeholder="Buscar producto..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // Resetear a primera página
            }}
            className="px-4 py-2 rounded-lg w-64"
          />
        </div>

        <select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1); // Resetear página
          }}
          className="px-3 py-2 rounded-lg"
        >
          <option value={10}>10 por página</option>
          <option value={15}>15 por página</option>
          <option value={20}>20 por página</option>
        </select>
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedProducts.length === 0 ? (
          <p className="text-center col-span-full">No se encontraron productos.</p>
        ) : (
          <>
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </>
        )
        }
      </div>

      {/* Paginación */}
      <Pagination
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalPages={totalPages}
      />

    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<p className="text-white">Cargando...</p>}>
      <HomeContent />
    </Suspense>
  );
}