import React from 'react';
import Count from './count';
import style from './index.less';
import WE from './www';



// import styles from './index.css';

// console.log(style);
// console.log(styles);



const App = () => (
    <h1 className={style.container}>
        Hello, world.
        <input type="text" />
        <Count />
        <WE />
    </h1>
);

export default App;





