"use client"
import React, { useState, useEffect } from 'react'
import { PiUserCircleFill } from "react-icons/pi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdOutlineFavorite } from "react-icons/md";
import Link from 'next/link';
import { FaStoreAlt } from "react-icons/fa";

const Cart_KEY = 'shoppingcart';

export const Header = () => {
    const [number, setNumber] = useState<number>(0);
    const [animate, setAnimate] = useState<boolean>(false);

    useEffect(() => {
        const updateCartCount = () => {
            const stored = JSON.parse(localStorage.getItem(Cart_KEY) || '[]');
            setNumber(stored.length);
            setAnimate(true);
            setTimeout(() => setAnimate(false), 300); // Duración de la animación
        };

        updateCartCount(); // Inicial

        window.addEventListener('cart-changed', updateCartCount);

        return () => {
            window.removeEventListener('cart-changed', updateCartCount);
        };
    }, []);

    return (
        <div className='fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-[var(--gravastar-background)/80] px-4 py-2 flex justify-between items-center text-white'>
            <Link href={"./"} className="text-2xl font-bold text-center">
                <FaStoreAlt size={30} />
            </Link>
            <div className='flex gap-5 text-[28px]'>
                <Link href={"/my-favorites"} className="cursor-pointer rounded-full hover:bg-[var(--gravastar-purple)]">
                    <MdOutlineFavorite
                        size={25}
                        color={"white"}
                    />
                </Link>

                <div className="relative inline-block cursor-pointer rounded-full hover:bg-[var(--gravastar-purple)]">
                    <MdOutlineShoppingCart className="text-2xl" />
                    <span className={`absolute bottom-0 left-2 bg-red-500 text-white text-xs rounded-full px-1 transition-transform duration-300 ${animate ? 'scale-125' : 'scale-100'}`}>
                        {number}
                    </span>
                </div>

                <PiUserCircleFill className='cursor-pointer rounded-full hover:bg-[var(--gravastar-purple)] ' />
            </div>
        </div>
    )
}
