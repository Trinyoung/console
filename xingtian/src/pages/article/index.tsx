import React, { useState, createContext } from 'react'
// import { ECharts } from 'echarts'

import cls from './article.module.less'
import OuterContext from './components/outerContext'
import Inner from './components/inner'
import Histogram from './components/Histogram'
import Box from './components/box'
const ArticleStastics = () => {
    // const OuterContext = createContext({name: 'lqy'});
    
    
    return (<>
        <OuterContext.Provider value={{name: 'lqy'}}>
          <div className={cls.main}>
            21345
          </div>
          <Box>
            <Histogram></Histogram>
          </Box>
          
          {/* <div id='main' className={cls.main}>
          </div> */}
          <Inner></Inner>
          <div id=''></div>
        </OuterContext.Provider>
      </>)
}

export default ArticleStastics