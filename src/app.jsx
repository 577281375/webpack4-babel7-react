import React from 'react';
import Count from './count';
import style from './index.less';
import E3 from './ee3';
import E2 from './ee2';



// import styles from './index.css';

// console.log(style);
// console.log(styles);



const App = () => (
    <h1 className={style.container}>
        Hello, world.
        <input type="text" />
        <Count />
        <E3 />
        <E2 />

    </h1>
);

export default App;





