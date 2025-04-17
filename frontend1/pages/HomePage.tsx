import Navbar from "@/Components/Navbar/Navbar";
import styles from "./style/Home.module.css";


export default function HomePage() {
    return (
      <div className={styles.main}>
      <Navbar/>
      <div className={styles.innerBody} >
        <div className={styles.left}>
          <div className={styles.leftFirst}  >
            <p>Convert your videos to text.</p>

          </div>
          <div className={styles.leftSecond}  >
            <p> Upload a video, transcribes it, summarizes & extracts key topics</p>

          </div>
          <div className={styles.leftThird}  >
            <div className={styles.uploadBtn}>
              Upload video
            </div>

          </div>
        </div>
        <div className={styles.right}>
        <img className={styles.img} src="/right.jpg" alt="Video to text" />


        </div>

      </div>
      </div>
    );
  }
  