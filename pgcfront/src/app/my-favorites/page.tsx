"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Product } from '../../types/index';
import { MdOutlineFavorite } from "react-icons/md";
import { Header } from "../../components/Header";

const FAVORITES_KEY = "favorites";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar favoritos del localStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem(FAVORITES_KEY) || "[]"
    ) as string[];
    setFavorites(storedFavorites);
  }, []);

  // Cargar productos del JSON
  useEffect(() => {
    fetch("/api/products.json")
      .then((res) => res.json())
      .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center text-white">Cargando favoritos...</p>;
  }

  // Filtrar productos favoritos
  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div
      className="min-h-screen px-6 py-3 pt-[75px]"
      style={{ backgroundColor: "var(--gravastar-background)" }}
    >
      <Header />
      <h1 className="flex items-center justify-center w-full text-3xl font-bold mb-6 text-white">
        <MdOutlineFavorite />
        <span className="ml-2">Mis Favoritos</span>

      </h1>

      {favoriteProducts.length === 0 ? (
        <p className="text-center text-[var(--gravastar-cyan)]">
          No tienes productos en favoritos todavía.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favoriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
