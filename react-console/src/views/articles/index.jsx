import React, { useState } from 'react';
import {Button} from 'antd';
function Article() {
    const [count, setCount] = useState[0];

    return (
        <>
            <p>You clicked {count} times<p/>
        </>
    );
};