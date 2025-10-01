"use client";
import React, { useEffect, useRef } from "react";
import { MdClose } from "react-icons/md";
import { ProductCardProps } from "../types/index";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ProductModalProps {
    product: ProductCardProps["product"];
    onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        // Enfocar el botón de cerrar al abrir
        closeButtonRef.current?.focus();

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }

            if (e.key === "Tab" && modalRef.current) {
                const focusableEls = modalRef.current.querySelectorAll<HTMLElement>(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                const focusable = Array.from(focusableEls);
                const firstEl = focusable[0];
                const lastEl = focusable[focusable.length - 1];

                if (!e.shiftKey && document.activeElement === lastEl) {
                    e.preventDefault();
                    firstEl.focus();
                }

                if (e.shiftKey && document.activeElement === firstEl) {
                    e.preventDefault();
                    lastEl.focus();
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    //if (!product) return null;

    return (
        <AnimatePresence>
            {product && (
                <motion.div
                    key="overlay"
                    className="fixed inset-0 flex items-center justify-center z-50 bg-black/70"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                    ref={modalRef}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        key="modal"
                        className="relative max-w-lg w-full p-6 rounded-2xl shadow-xl"
                        style={{
                            backgroundColor: "var(--gravastar-background)",
                            border: "2px solid var(--gravastar-blue)",
                        }}
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        {/* Botón cerrar */}
                        <button
                            ref={closeButtonRef}
                            onClick={onClose}
                            aria-label="Cerrar modal"
                            className="absolute top-3 right-3 text-[var(--gravastar-magenta)] hover:text-[var(--gravastar-purple)] bg-white rounded-full p-1 cursor-pointer"
                        >
                            <MdClose size={28} />
                        </button>

                        {/* Imagen */}
                        <Image
                            src={product.thumbnail}
                            alt={product.title}
                            width={400}
                            height={256}
                            loading="lazy"
                            className="w-full h-64 object-cover rounded-xl border border-[var(--gravastar-blue)] mb-4"
                        />

                        {/* Info */}
                        <h2 className="text-2xl font-bold text-white mb-2">
                            {product.title}
                        </h2>
                        <p className="text-[var(--gravastar-cyan)] mb-4">{product.description}</p>

                        <div className="flex justify-between items-center mb-4">
                            <p className="text-[var(--gravastar-yellow)] font-semibold">
                                ⭐ {product.rating} / 5
                            </p>
                            <p className="text-[var(--gravastar-orange)] font-bold text-lg">
                                ${product.price.toFixed(2)}
                            </p>
                        </div>

                        <p
                            className={`mb-4 ${product.stock > 0
                                ? "text-[var(--gravastar-blue)]"
                                : "text-[var(--gravastar-magenta)]"
                                }`}
                        >
                            {product.stock > 0
                                ? `Stock disponible: ${product.stock}`
                                : "Producto agotado"}
                        </p>

                        <button
                            className="add-to-cart"
                        >
                            Agregar al carrito
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ProductModal;
