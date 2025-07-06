'use client';

import React from 'react';

interface InfoPopupProps {
  onClose: () => void;
}

export default function InfoPopup({ onClose }: InfoPopupProps) {
  return (
    // Lapisan overlay gelap di belakang popup
    <div className="popup-overlay" onClick={onClose}>
      {/* Konten popup, event propagation dihentikan agar klik di dalam tidak menutup popup */}
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="popup-title">Segera Hadir!</h2>
        <p className="popup-message">
          Fitur AI Chat sedang dalam tahap pengembangan.
          <br />
          Admin Sedang <b>PKL</b> HEHE
          <br />
          Thank you!! and love from Wise 💕💕
        </p>
        <button onClick={onClose} className="popup-close-button">
          Mengerti
        </button>
      </div>
    </div>
  );
}
