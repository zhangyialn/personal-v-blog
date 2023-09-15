import React from 'react';
import Navigator from "../Navigator/Navigator";
import styles from './Home.module.css'
const Home = () => {
    return (
        <>
            <div className={styles.background}>
                <Navigator />
            </div>
        </>
    );
};

export default Home;