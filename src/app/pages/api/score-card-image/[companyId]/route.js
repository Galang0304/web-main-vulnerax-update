// /src/app/pages/api/score-card-image/[companyId]/route.js
import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function GET(request, { params }) {
  const { companyId } = params;

  // URL halaman score-card untuk mode development
  const scoreCardUrl = `https://vulnerax.id/score-card/${companyId}`;

  try {
    // Luncurkan browser menggunakan Puppeteer
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });
    await page.goto(scoreCardUrl, { waitUntil: 'networkidle2' });

    // Ambil screenshot dari halaman
    const screenshot = await page.screenshot({ type: 'jpeg', quality: 80 });
    await browser.close();

    // Kembalikan gambar sebagai response
    return new NextResponse(screenshot, {
      status: 200,
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=86400', // Cache selama 1 hari
      },
    });
  } catch (error) {
    return new NextResponse('Failed to generate score-card image. Please try again later.', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}