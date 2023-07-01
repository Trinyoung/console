
import React, { useEffect } from 'react'
import * as echarts from 'echarts'
import Box  from './box'
// import { useEffect } from 'react'
const Histogram = () => {
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
    return (
        <>
            {/* <Box> */}
                <div id='main' style={{width: '600px', height: '400px'}}></div>
            {/* </Box> */}
        </>
    )
}
export default Histogram