import React from 'react';
import Count from './count';
import style from './index.less';
import Test from './helpers';
import WE from './www';



const App = () => (
    <h1 className={style.container}>
        Hello, world.
        <input type="text" />
        <Count />
        <Test />
        <WE />
    </h1>
);

export default App;





