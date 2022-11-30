import React from 'react'
import ReactDOM from 'react-dom'
import AnyChart from 'anychart-react'
import anychart from 'anychart'
import Menu from './Menu'

const Monitoreo = () => {

  

let count = 50;
let rawData = [];
for (let i = 0; i < count; i++) {
  rawData.push([i, Math.random() * 2])
}
let dataSet = anychart.data.set(rawData);


let counter = count;
setInterval(function() {
  dataSet.remove(0);
  dataSet.append([counter++, Math.random() * 2])
}, 500);




  return (
    <>
        <Menu/>
        <div className='w-100 h-100 d-flex justify-content-center align-items-center'>
        <AnyChart
    id="lineChart"
    width={800}
    height={600}
    type="line"
    data={dataSet}
    title="Patadas por segundo"
  />
  </div>
    </>
  )
}

export default Monitoreo