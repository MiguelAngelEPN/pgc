import React from 'react'
import { PiUserCircleFill } from "react-icons/pi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdOutlineFavorite } from "react-icons/md";
import Link from 'next/link';
import { FaStoreAlt } from "react-icons/fa";

export const Header = () => {
    const number = 0;

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
                    <span className="absolute bottom-0 left-2 bg-red-500 text-white text-xs rounded-full px-1">
                        {number}
                    </span>
                </div>

                <PiUserCircleFill className='cursor-pointer rounded-full hover:bg-[var(--gravastar-purple)] ' />
            </div>
        </div>
    )
}
