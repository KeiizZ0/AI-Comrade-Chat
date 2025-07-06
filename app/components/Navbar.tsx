'use client'; // Diperlukan untuk menggunakan hooks seperti useState dan useRef

import React from "react";

// Navbar sekarang menerima props untuk mengontrol musik
interface NavbarProps {
    isPlaying: boolean;
    togglePlayPause: () => void;
}

function Navbar({ isPlaying, togglePlayPause }: NavbarProps) {

    return (
        <div className="navbar-container">
            <img className="logo-navbar" src="/CatLogo.png" alt="logo kucing" />
            <div className="tombolnavbar flex gap-10">
                <button className="w-14 h-14 bg-black rounded-full flex justify-center items-center hover:bg-gray-700 transition-colors">
                    <img className="w-8 h-8" src="/Settings.png" alt="Pengaturan" />
                </button>
                {/* Tombol Musik */}
                <button onClick={togglePlayPause} className="w-14 h-14 bg-black rounded-full flex justify-center items-center hover:bg-gray-700 transition-colors">
                    <img className="w-8 h-8" src={isPlaying ? "/MusicPause.png" : "/MusicPlay.png"} alt={isPlaying ? "Jeda Musik" : "Putar Musik"} />
                </button>
                <button className="w-14 h-14 bg-black rounded-full flex justify-center items-center hover:bg-gray-700 transition-colors">
                    <img className="w-8 h-8" src="/More.png" alt="Lainnya" />
                </button>
                
            </div>

            
        </div>
        
    );
}

export default Navbar;