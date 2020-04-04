import ForceGraph3D from '3d-force-graph';
import ForceGraph from 'force-graph';
import React, { Component } from 'react'
// import SpriteText from 'three-spritetext';
import chartData from '../../assets/chart_data.json'
// var THREE = require('three');

export class Index extends Component {
  constructor(props) {
    super(props)
    this.Graph = undefined
  }
  componentDidMount() {

    let { fullMode = false } = this.props
    var width = document.getElementById('3d-graph').offsetWidth
    var height = document.getElementById('3d-graph').offsetHeight
    const elem = document.getElementById('3d-graph');
    const Graph = ForceGraph3D()
      (elem)
      .graphData(chartData)
      .height(fullMode ? undefined : height)
      .width(fullMode ? undefined : width)
      // .nodeLabel('id')
      // .nodeAutoColorBy('id')
      // .linkColor(()=>{
      //   return 'rgba(255, 255, 255, 0.85)'
      // })
      // .nodeRelSize(25)
      // .onNodeHover(node => elem.style.cursor = node ? 'pointer' : null)
      // .onNodeClick(node => {
      //   // Center/zoom on node
      //   Graph.centerAt(node.x, node.y, 1000);
      //   Graph.zoom(1.5, 1200);
      // });

    // Spread nodes a little wider
    // Graph.d3Force('charge').strength(-3000);
    // Graph.zoom(0.4);
  }
  render() {
    return (
      <div style={{overflow:'hidden'}}>
        <div style={{ width: this.props.width, height: this.props.height }}>
          <div id="3d-graph" style={{ width: '100%', height: '100%' }}></div>
        </div>
      </div>
    )
  }
}

export default Index
