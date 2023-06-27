import React, { useState } from 'react'
// import { ECharts } from 'echarts'
import * as echarts from 'echarts'
import { useEffect } from 'react'
import cls from './article.module.less'

const ArticleStastics = () => {
   
    const option = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: [120, 200, 150, 80, 70, 110, 130],
              type: 'bar',
              showBackground: true,
              backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
              }
            }
          ]
    }
    useEffect(() => {
        const chartDom = document.getElementById('main')
        const myChart = echarts.init(chartDom!)
        myChart.setOption(option)
    })
    
    return (<>
            <div id='main' className={cls.main}>
                12345
            </div>
        </>)
}

export default ArticleStastics