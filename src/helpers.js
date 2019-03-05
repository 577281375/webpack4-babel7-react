import React from 'react';
import Count from './count';
import style from './index.less';
import WE from './www';
import EEE from './eee';



const App = () => (
    <h1 className={style.container}>
        Hello, world.
        <input type="text" />
        <Count />
        <WE />
        <EEE />
    </h1>
);

export default App;





