'use client'
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import 'aos/dist/aos.css'; // Impor CSS AOS

const ClientOnlyAOS = dynamic(
    () => Promise.resolve((props) => {
        // Gunakan useEffect untuk inisialisasi AOS di sisi klien
        useEffect(() => {
            import('aos').then((AOS) => {
                AOS.init({
                    duration: 1000, // Durasi animasi
                    once: true, // Animasi hanya terjadi sekali
                });
            });
        }, []);

        // Kembalikan null karena komponen ini tidak merender apa pun
        return null;
    }),
    { ssr: false } // Nonaktifkan SSR untuk komponen ini
);

export default ClientOnlyAOS;