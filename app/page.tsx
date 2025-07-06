'use client'

import { FloatingLoveBackground } from "./components/floating-love-background"
import InfoPopup from "./components/PopUp";
import React, {useState, useEffect, useRef} from "react";
import Navbar from "./components/Navbar"

const characters = [
  {
    id: "shisuiya",
    name: "Shisuiya",
    title: "Cutie Squad",
    image: "/Shisuiya.png",
    bgClass: "bg-gradient-to-br from-purple-200 via-purple-100 to-white",
    bottomBgClass: "bg-gradient-to-r from-[#AA9DE6] to-purple-600",
    nameColorClass: "text-[#AE9CFF]",
    titleColorClass: "text-pink-400",
    buttonColorClass: "bg-purple-200 hover:bg-purple-300 text-purple-700",
  },
  {
    id: "yukiya",
    name: "Yukiya",
    title: "Cutie Squad",
    image: "/Yukiya.png",
    bgClass: "bg-gradient-to-br from-pink-200 via-pink-100 to-white",
    bottomBgClass: "bg-gradient-to-r from-pink-400 to-pink-600",
    nameColorClass: "text-pink-400",
    titleColorClass: "text-pink-400",
    buttonColorClass: "bg-pink-200 hover:bg-pink-300 text-pink-700",
  },
]


export default function Home(){

  const [activeCharacter, setActiveCharacter] = useState(characters[0])
  const [isExiting, setIsExiting] = useState(false); // State untuk transisi keluar
  const [isReady, setIsReady] = useState(false); // State untuk transisi masuk awal
  const [isPlaying, setIsPlaying] = useState(false); // State untuk musik
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State untuk popup
  const audioRef = useRef<HTMLAudioElement>(null); // Ref untuk elemen audio

  const changeCharacter = (newCharacter) => {
    // Jangan lakukan apa-apa jika karakter yang sama diklik atau sedang transisi
    if (newCharacter.id === activeCharacter.id || isExiting) {
      return;
    }
    setIsExiting(true); // Mulai animasi keluar
    setTimeout(() => {
      setActiveCharacter(newCharacter); // Ganti karakter setelah animasi keluar
      setIsExiting(false); // Reset state untuk animasi masuk
    }, 300); // Durasi harus cocok dengan durasi animasi CSS
  };

  // Efek untuk memicu animasi masuk saat komponen pertama kali dimuat
  useEffect(() => {
    // Menambahkan sedikit penundaan untuk memastikan elemen sudah di-mount sebelum animasi dimulai
    const timer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Fungsi untuk tombol di Navbar
  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Efek untuk memutar musik saat interaksi pertama kali
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (audioRef.current && !audioRef.current.currentTime) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(error => {
          console.log("Autoplay dicegah, menunggu interaksi pengguna berikutnya.", error);
        });
      }
      // Hapus listener setelah interaksi pertama agar tidak berjalan lagi
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  const handleStartChatClick = () => {
    // Saat tombol diklik, tampilkan popup
    setIsPopupOpen(true);
  };

  return (
  
  <main className={`min-h-screen p-8 transition-all duration-500 ${activeCharacter.bgClass}`}>
    <audio ref={audioRef} src="/CuteMusic.mp3" preload="auto" loop />
    <Navbar isPlaying={isPlaying} togglePlayPause={togglePlayPause} />
    <FloatingLoveBackground />
    {/* Main Section */}
    <section className="section-container">
    

          {/* profile karakter persegi panjang, nama char, Squad mana */}
          <div 
            key={`${activeCharacter.id}-profile`}
            className={`profile-container flex items-center gap-4 ${!isReady ? 'opacity-0' : (isExiting ? 'animate-slide-outfaster' : 'animate-slide-infaster')}`}
          >

            {/* profile */}
            <div className="profile-image-frame">
            <img
            className="w-full h-full object-cover" 
            src={activeCharacter.image} 
            
            alt="profile char" 
            
            />
            </div>

            {/* nama, Squad*/}
            <div>              
              <b><h4 className={`name-title ${activeCharacter.titleColorClass}`}>{activeCharacter.title}</h4></b>
              <b><h3 className={`name-character ${activeCharacter.nameColorClass}`}>{activeCharacter.name}</h3></b>
            </div>
          </div>

            {/*Nama Karakter Utama, gambar, Profile tombol manipulasi & More*/}
          {/* Kontainer ini kita jadikan 'relative' sebagai acuan posisi untuk gambar */}
          <div className="relative flex items-end justify-start h-full">

            {/* Nama Karakter */}
            <h1 
              key={`${activeCharacter.id}-main-name`}
              className={`nama-charutama ${activeCharacter.nameColorClass} ${!isReady ? 'opacity-0' : (isExiting ? 'animate-slide-out' : 'animate-slide-in')}`}
            >
              <i>{activeCharacter.name}</i>
            </h1>
            
            {/* Gambar Besar */}
            <img 
              key={`${activeCharacter.id}-main-image`} 
              className={`image-utama ${!isReady ? 'opacity-0' : (isExiting ? 'animate-fade-out' : 'animate-fade-in')}`} 
              src={activeCharacter.image} alt={`Gambar besar ${activeCharacter.name}`} 
            />
            
            {/* tombol manipulasi */}
            <div className="manipmobile-container absolute right-1 top-15 z-20 flex flex-col gap-15  ">
              {characters.map((character) => (
                <div
                  key={character.id}
                  className={`justify-center items-center border-box bg-amber-50 w-25 h-25 rounded overflow-hidden cursor-pointer transition-all hover:scale-105 ${
                  character.id === activeCharacter.id ? "border-yellow-400 shadow-lg" : "border-gray-300"

                }`}
                onClick={() => changeCharacter(character)}
                  >
                    <img 
                    src={character.image}
                  
                    alt={character.name}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover" 
                    />
                  </div>
                )
                )}
              
            </div>
          </div>
{/* <img className="w-full h-full object-cover" src={activeCharacter.image} alt="tombolManip" /> */}
            
    </section>

    {/* Footer Section */}
    <div className={`footer ${activeCharacter.bottomBgClass}`}>
        <div className="text-white">
          <h1 className="footer-text text-4xl font-bold">Chat For Free!!</h1>
          <h4 className="footer-text text-lg">Converse With AI Friends</h4>
          
        </div>
        <div>
          <button 
            onClick={handleStartChatClick}
            className={`Chat-Now px-8 py-4 font-bold text-lg transition-all hover:scale-105 ${activeCharacter.buttonColorClass}`}
          >
            <h1  className="button-text">Start Chat</h1>
          </button>
        </div>
    </div>

    {/* Render popup secara kondisional */}
    {isPopupOpen && <InfoPopup onClose={() => setIsPopupOpen(false)} />}
  </main>
    
  

  
  )

}