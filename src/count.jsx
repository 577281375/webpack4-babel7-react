import React, { useState} from 'react';
import style from './index.less';
console.log(style);

const useText = (inintial) => {
    const [text, setText] = useState(inintial);
    const onChange = e => {
        return setText(e.target.value)
    };
    return [text, onChange];
}

const Count = () => {
    const [text, onChange] = useText('111');

    return (
        <div>
            Count Count Count <br />
            <input type={text} onChange={onChange}/>
        </div>
    )
}
export default Count;