import styles from "./style/FileService.module.css"
import React, { useState } from "react"
import jsPDF from "jspdf";
import QuestionsDisplay from "./questions";
import { useEffect } from "react";
import { stringify } from "querystring";
import { useRouter } from 'next/router'
import { DotLoader } from "react-spinners";


//interface for file upload
interface UploadResponse {
    message: string;
    audioFile: string;
    transcript: string;
}





export default function FileService() {
    const [loadingSummary, setLoadingSummary] = useState<boolean>(false);
     const [loadingQuestions, setLoadingQuestions] = useState<boolean>(false);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string>("");
    const [questions, setQuestions] = useState<string[]>([]);
    const [uploadTranscript, setUploadTranscript] = useState<string>("");
    const [summary, setSummary] = useState<string>("");
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
            console.log(selectedFile)
        }
    };
    const downloadPDF = () => {
        const doc = new jsPDF();
        const pageHeight = doc.internal.pageSize.height;
        const margin = 10;
        const lineHeight = 10;
        const maxLinesPerPage = Math.floor((pageHeight - 2 * margin) / lineHeight);

        const lines = doc.splitTextToSize(uploadTranscript, 180);

        let cursorY = margin;
        let lineCount = 0;

        for (let i = 0; i < lines.length; i++) {
            if (lineCount >= maxLinesPerPage) {
                doc.addPage();
                cursorY = margin;
                lineCount = 0;
            }
            doc.text(lines[i], margin, cursorY);
            cursorY += lineHeight;
            lineCount++;
        }

        doc.save("transcript.pdf");
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadStatus("Please select a file first");
            return;
        }
        console.log("one")

        const formData = new FormData();

        formData.append("video", selectedFile);
        console.log("two")
        
        try {
            setLoadingSummary(true);
            const response = await fetch("http://localhost:5000/upload", {
                method: "POST",
                body: formData,
            })


            const data: UploadResponse = await response.json();
            if (response.ok) {
                setUploadStatus(`Success: ${data.message}, Audio: ${data.audioFile}`)
                console.log("uploaded")

                setTimeout(() => {
                    setUploadTranscript(data.transcript)
                    console.log(uploadTranscript, "frontend transcript");
                }, 3000)



            }
            else {
                setUploadStatus("Upload failed.");
                console.log("faialed")
            }
        } catch (err) {
            console.error(err, "error in upload");
            setUploadStatus("an error ocurred during upload");


        } finally {
            setLoadingSummary(false);
        }
    };


    const handleGenrate = async () => {
        try {

            const response = await fetch("http://localhost:5000/summarize", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ text: uploadTranscript }),

            });
            console.log("clicked")
            if (!response.ok) {
                const errText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, details: ${errText}`);
            }


            const data = await response.json();
            console.log(data, "data")
            setSummary(data.summary);
            setTimeout(() => { console.log(data.summary, "summary") }, 3000)
        } catch (err) {
            console.error("Fetch error:", err);
            alert("Summarization failed: " + err);
        }
    };

    const router = useRouter();
    const handleQuestion = async () => {
        try {
            setLoadingQuestions(true);
            const response = await fetch("http://localhost:5000/question/generate", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ text: uploadTranscript })
            })

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Server responded with error:", response.status, errorText);

                return;
            }

            const data = await response.json();
            setQuestions(data.result.questions);
            sessionStorage.setItem("questions", JSON.stringify(data.result.questions));//sessionStorage of questions in form of 
            setTimeout(() => {
                router.push('/questions')
            }, 4000)


        } catch (error) {
            console.error('Errror genrating', error);
        }finally {
            setLoadingQuestions(false);
        }
    }


    return (
        <div className={styles.main}>
  {loadingSummary || loadingQuestions? (
    <div className={styles.loaderMain}>
        <p className={styles.loadtext}>Uploading and processing file...</p>
    <div className={styles.loader}>
        <DotLoader size={70} color="rgb(47, 164, 231)"/>
        </div>
    </div>
  ) : uploadTranscript && uploadTranscript.length ? (
    <>
      <div className={styles.trans}>
        <h3 className={styles.result}>Here is your Result</h3>
      </div>
      <div className={styles.innerBody}>
        <div className={styles.transcript}>{uploadTranscript}</div>
      </div>
      <div className={styles.trans}>
        <button className={styles.pdf} onClick={downloadPDF}>Download PDF</button>
        <button className={styles.pdf}  onClick={handleGenrate}>KeyPoints</button>
        <button className={styles.pdf}  onClick={handleQuestion}>Generate Quiz</button>
      </div>
    </>
  ) : (
    <div className={styles.innerBody}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <p>Turn audio, video and images to text </p>
        </div>
        {/* <div className={styles.second}>
          <img className={styles.img} src="./icon.png" />
        </div> */}
        <div className={styles.third}>
          <label className={styles.btn}>
            Choose a file
            <input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </label>
          <div className={styles.btn} onClick={handleUpload}>
            Upload
          </div>
        </div>
        <div className={styles.forth}>
          <p>or</p>
        </div>
        <div className={styles.fifth}>
          <p>drag and drop file</p>
        </div>
      </div>
    </div>
  )}
</div>

    )
}