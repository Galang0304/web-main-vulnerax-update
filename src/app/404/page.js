"use client";
import Head from "next/head";
import Link from "next/link";

export default function NotFound() {
    return (
        <>
            <Head>
                <title>404 - Page Not Found</title>
                <meta name="robots" content="noindex, follow" />
                <meta name="description" content="The page you are looking for does not exist." />
            </Head>
            <div className="not-found-container">
                <div className="content">

                    <i class="bi bi-exclamation-triangle-fill fs-1"></i>
                    <h1>Oops! Page Not Found</h1>
                    <p>Sorry, the page you are looking for doesn’t exist!</p>
                    <Link href="/">
                        <button className="back-home-btn">Go Back Home</button>
                    </Link>
                </div>
            </div>

            <style jsx>{`
                .not-found-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    background:rgb(255, 255, 255);
                    color: black;
                    text-align: center;
                    padding: 20px;
                }

                .content {
                    max-width: 500px;
                    padding: 30px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    backdrop-filter: blur(10px);
                    box-shadow: 0px 0px 20px rgba(222, 26, 52, 0.4);
                }

                .error-icon {
                    font-size: 80px;
                    color: #DE1A34;
                    margin-bottom: 20px;
                    animation: bounce 1.5s infinite;
                }

                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }

                h1 {
                    font-size: 28px;
                    margin-bottom: 10px;
                }

                p {
                    font-size: 18px;
                    opacity: 0.8;
                    margin-bottom: 20px;
                }

                .back-home-btn {
                    display: inline-block;
                    padding: 12px 24px;
                    font-size: 16px;
                    font-weight: bold;
                    text-transform: uppercase;
                    background: #DE1A34;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.3s ease-in-out;
                    box-shadow: 0px 4px 10px rgba(222, 26, 52, 0.5);
                }

                .back-home-btn:hover {
                    background: #b3152b;
                    transform: translateY(-3px);
                    box-shadow: 0px 6px 14px rgba(222, 26, 52, 0.6);
                }
            `}</style>
        </>
    );
}