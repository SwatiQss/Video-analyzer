import styles from "./style/FileService.module.css"
import React,{useState} from "react"

//interface for file upload
interface UploadResponse{
    message: string;
    audioFile:string;
}





export default function FileService() {

    const [selectedFile,setSelectedFile]=useState<File |null>(null);
    const [uploadStatus,setUploadStatus]=useState<string>("");

    const handleFileChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        if(event.target.files && event.target.files.length>0){
            setSelectedFile(event.target.files[0]);
            console.log(selectedFile)
        }
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
            console.log(response )

            const data:UploadResponse=await response.json();
            if(response.ok){
                setUploadStatus(`Success: ${data.message}, Audio: ${data.audioFile}`)
                console.log("uploaded")

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



    return (
        <div className={styles.main}>
            <div className={styles.innerBody}>
                <div className={styles.inner}>
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

                </div>
            </div>


        </div>
    )
}