import { NextResponse } from "next/server";

// Daftar jalur yang valid
const validPaths = [
    '/',
    '/rra',
    '/report',
    '/pdf',
    '/robots.txt',
    '/sitemap.xml',
    '/services/PenetrationTesting',
    '/services/ProfessionalRedTeaming',
    '/services/RansomwareReadinessAssessment',
    '/services/SystemHardening',
    '/services/ThreatHunting&IR',
    '/services/VulnerabilityAssessment',
    '/score-card', 
];

export function middleware(req) {
    const url = req.nextUrl.clone();
    const pathname = url.pathname;

    // Memeriksa apakah path yang diminta ada dalam daftar validPaths
    const pathIsValid = validPaths.some((validPath) => {
        if (validPath === '/score-card') {
            // Izinkan semua rute yang dimulai dengan /score-card/
            return pathname.startsWith('/score-card/');
        }
        return pathname === validPath || pathname.startsWith(validPath);
    });

    // Jika path tidak valid, arahkan ke halaman kustom 404
    if (!pathIsValid) {
        return NextResponse.rewrite(new URL('/404', req.url));
    }

    // Jika path valid, lanjutkan dengan request
    return NextResponse.next();
}