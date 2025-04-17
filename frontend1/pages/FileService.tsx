import styles from "./style/FileService.module.css"
export default function FileService() {
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
                        <div className={styles.btn}>
                            Choose a file
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