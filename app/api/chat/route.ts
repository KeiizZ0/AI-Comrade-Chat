// app/api/chat/route.ts

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Fungsi ini menangani request POST ke /api/chat
export async function POST(req: Request) {
  // Ambil API key dari environment variables
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

  try {
    // Ambil prompt dari body request yang dikirim oleh frontend
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Pilih model yang akan digunakan
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Hasilkan konten berdasarkan prompt
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Kirim kembali hasil teks sebagai response JSON
    return NextResponse.json({ text });

  } catch (error) {
    console.error("Error in Gemini API call:", error);
    // Kirim response error jika terjadi masalah
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}