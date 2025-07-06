'use client'; // Diperlukan untuk menggunakan hooks seperti useState dan useRef

import Image from "next/image";
import React from "react";

// Navbar sekarang menerima props untuk mengontrol musik
interface NavbarProps {
    isPlaying: boolean;
    togglePlayPause: () => void;
}

function Navbar({ isPlaying, togglePlayPause }: NavbarProps) {

    return (
        <div className="navbar-container">
            <Image 
              className="logo-navbar" 
              src="/CatLogo.png" 
              alt="logo kucing"
              width={100}
              height={100}
            />
            <div className="tombolnavbar flex gap-10">
                <button className="w-14 h-14 bg-black rounded-full flex justify-center items-center hover:bg-gray-700 transition-colors">
                    <Image className="w-8 h-8" src="/Settings.png" alt="Pengaturan" width={32} height={32} />
                </button>
                {/* Tombol Musik */}
                <button onClick={togglePlayPause} className="w-14 h-14 bg-black rounded-full flex justify-center items-center hover:bg-gray-700 transition-colors">
                    <Image 
                      className="w-8 h-8" 
                      src={isPlaying ? "/MusicPause.png" : "/MusicPlay.png"} 
                      alt={isPlaying ? "Jeda Musik" : "Putar Musik"} 
                      width={32} 
                      height={32}
                    />
                </button>
                <button className="w-14 h-14 bg-black rounded-full flex justify-center items-center hover:bg-gray-700 transition-colors">
                    <Image className="w-8 h-8" src="/More.png" alt="Lainnya" width={32} height={32} />
                </button>
                
            </div>

            
        </div>
        
    );
}

export default Navbar;