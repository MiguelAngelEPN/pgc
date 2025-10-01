"use client";
import React, { useEffect, useState } from "react";
import "./ProductCard.css";
import { MdOutlineFavorite } from "react-icons/md";
import { ProductCardProps } from '../types/index';
import ProductModal from "../modals/ProductModal";
import { IoOpen } from "react-icons/io5";
import Image from "next/image";

const FAVORITES_KEY = "favorites";
const Cart_KEY = "shoppingcart";

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [shoppingCart, setShoppingCart] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);

  //---- Leer favoritos desde localStorage al cargar
  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem(FAVORITES_KEY) || "[]"
    ) as string[];
    setIsFavorite(storedFavorites.includes(product.id));
  }, [product.id]);

  // Alternar favorito
  const toggleFavorite = () => {
    const storedFavorites = JSON.parse(
      localStorage.getItem(FAVORITES_KEY) || "[]"
    ) as string[];

    let updatedFavorites: string[];

    if (isFavorite) {// Si ya está, lo quitamos
      updatedFavorites = storedFavorites.filter((id) => id !== product.id);
    } else {// Si no está, lo agregamos
      updatedFavorites = [...storedFavorites, product.id];
    }

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  //---- Leer carrito de compras de localStorage al cargar
  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem(Cart_KEY) || "[]"
    ) as string[];
    setShoppingCart(storedFavorites.includes(product.id));
  }, [product.id]);

  // Alternar favorito
  const toggleShoppingCart = () => {
    const storedFavorites = JSON.parse(
      localStorage.getItem(Cart_KEY) || "[]"
    ) as string[];

    let updatedFavorites: string[];

    if (shoppingCart) {// Si ya está, lo quitamos
      updatedFavorites = storedFavorites.filter((id) => id !== product.id);
    } else {// Si no está, lo agregamos
      updatedFavorites = [...storedFavorites, product.id];
    }

    localStorage.setItem(Cart_KEY, JSON.stringify(updatedFavorites));
    setShoppingCart(!shoppingCart);
    window.dispatchEvent(new CustomEvent('cart-changed'));
  };

  return (
    <>
      <div
        className="product-card"
      >
        <div className="modal-container">
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={200}
            height={200}
            className="product-img "
          />
          <button
            className="absolute top-3 right-3 text-[var(--gravastar-magenta)] hover:text-[var(--gravastar-purple)] bg-white rounded-full p-1 cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            <IoOpen color="black" />
          </button>
        </div>

        <h2 className="product-title">{product.title}</h2>

        <div className="flex justify-evenly items-center w-full">
          <button onClick={toggleFavorite} aria-label="Marcar como favorito">
            <MdOutlineFavorite
              size={25}
              className={`cursor-pointer ${isFavorite ? "text-[var(--gravastar-magenta)]" : "text-white"}`}
            />
          </button>
          <p className="product-price">${product.price.toFixed(2)}</p>
        </div>

        <p className="product-rating">⭐ {product.rating} / 5</p>
        <p className="product-stock">
          {product.stock > 0 ? `Stock: ${product.stock}` : "Agotado"}
        </p>

        <button className="add-to-cart" onClick={() => toggleShoppingCart()}>Agregar al carrito</button>
      </div>


    </>
  );
};

export default ProductCard;
