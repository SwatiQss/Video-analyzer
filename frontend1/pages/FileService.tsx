import styles from "./style/FileService.module.css"
import React,{useState} from "react"
import jsPDF from "jspdf";
import axios from "axios"; 

//interface for file upload
interface UploadResponse{
    message: string;
    audioFile:string;
    transcript:string;
}





export default function FileService() {

    const [selectedFile,setSelectedFile]=useState<File |null>(null);
    const [uploadStatus,setUploadStatus]=useState<string>("");
      const [uploadTranscript,setUploadTranscript]=useState<string>("");
  const [summary,setSummary]=useState<string>("");
    const handleFileChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        if(event.target.files && event.target.files.length>0){
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
  
    const handleUpload=async()=>{
        if(!selectedFile){
            setUploadStatus("Please select a file first");
            return; 
        }
        console.log("one")

        const formData=new FormData();

        formData.append("video",selectedFile);
        console.log("two")
        try{
            const response=await fetch("http://localhost:5000/upload",{
                method:"POST",
                body:formData,
            })
          

            const data:UploadResponse=await response.json();
            if(response.ok){
                setUploadStatus(`Success: ${data.message}, Audio: ${data.audioFile}`)
                console.log("uploaded")
                
                setTimeout(()=>{
                    setUploadTranscript(data.transcript)
console.log(uploadTranscript,"frontend transcript");
                },3000)
                


            }
            else{
                setUploadStatus("Upload failed.");
                console.log("faialed")
            }
        }catch(err){
            console.error(err,"error in upload");
            setUploadStatus("an error ocurred during upload");
              
        }
    };
    

const handleGenrate = async () => {
  try {
    const response = await fetch("http://localhost:5000/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: uploadTranscript }),
    });

   if (!response.ok) {
  const errText = await response.text();
  throw new Error(`HTTP error! status: ${response.status}, details: ${errText}`);
}


    const data = await response.json();
    setSummary(data.summary);
    console.log(data.summary, "summary");
  } catch (err) {
    console.error("Fetch error:", err);
    alert("Summarization failed: " + err);
  }
};


    return (
        <div className={styles.main}>
             {uploadTranscript && uploadTranscript.length? (<div className={styles.trans}> <h3 className={styles.result}>Here is your Result</h3></div>):null}
            <div className={styles.innerBody}>
                {uploadTranscript && uploadTranscript.length?(<div className={styles.transcript}>{uploadTranscript}</div>):<div className={styles.inner}>
                    <div className={styles.top}>
                        <p>Turn audio, video and images to text </p>

                    </div>
                    <div className={styles.second}>
                        <img className={styles.img} src="./icon.png"></img>

                    </div>
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

<div className={styles.btn} onClick={handleUpload} >
  Upload 
</div>


                    </div>
                    <div className={styles.forth}>
                        <p>or</p>

                    </div>
                    <div className={styles.fifth}>
                        <p>
                            drag and drop file
                        </p>

                    </div>

                </div> }
                
            </div>
     {uploadTranscript && uploadTranscript.length? (<div className={styles.trans}> 
        <button onClick={downloadPDF}>Download PDF</button>
        <button onClick={handleGenrate}>Genrate KeyPoints</button>
        <button>Genrate Quiz   </button>
     </div>):null}


        </div>
    )
}