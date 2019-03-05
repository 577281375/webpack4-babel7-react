import React from 'react';
import Count from './count';
import style from './index.less';
import Test from './helpers';
import WE from './www';
import EEE from './eee';
import E2 from './ee2';



const App = () => (
    <h1 className={style.container}>
        Hello, world.
        <input type="text" />
        <Count />
        <Test />
        <WE />
        <EEE />
        <E2/>
    </h1>
);

export default App;





