
'use client'
import { useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "@/components/multi/Document";

const pdf = () => {
    const [showPdf, setShowPdf] = useState(false);
    return (
        <div>
            <button onClick={() => setShowPdf(!showPdf)}>
                {showPdf ? 'Hide PDF' : 'Show PDF'}
            </button>

            {showPdf && (
                <PDFViewer width="100%" height="600px">
                    <MyDocument />
                </PDFViewer>
            )}

        </div>


    )
}

export default pdf;