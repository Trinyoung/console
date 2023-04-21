import React, { Component, useState, useEffect } from 'react';
import {Button} from 'antd'
// Hook的使用规则， 只在最顶层使用Hook； 只在React函数中调用Hook；

function Home() {
    const [count, setCount] = useState(0);
    useEffect(() => {
        // Update the document title using the browser API
        document.title = `You clicked ${count} times`;
      });
    
    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
        <Button>click me to jump</Button>
      </div>
    );
}
export default Home;