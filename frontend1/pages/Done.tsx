import styles from "./style/Done.module.css"
export default function Done() {
    return (
        <div className={styles.main}>
            <div className={styles.innerBody}>
                <div className={styles.inner}>
                   <div className={styles.first}>
                   <img className={styles.img} src="./check.png"></img>

                   </div>
                   <div className={styles.second}>
                    <div className={styles.restart}>
                        Restart

                    </div>

                    <div className={styles.transcript}>
                          Transcript
                    </div>

                   </div>

                </div>
            </div>


        </div>
    )
}