import ForceGraph3D from '3d-force-graph';
import React, { Component } from 'react'
import SpriteText from 'three-spritetext';
import chartData from '../../assets/chart_data.json'
var THREE = require('three');

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
      .linkOpacity(0.18)
      .linkWidth((link) => {
        // console.log(link)
        // return 1
        return 1 + link.value / 12
      })
      .linkThreeObjectExtend(true)
      .linkThreeObject(link => {
        // extend link with text sprite
        const sprite = new SpriteText(`${link.source} - ${link.target} (${link.value})`);
        sprite.color = 'lightgrey';
        sprite.textHeight = 3;
        return sprite;
      })
      .linkPositionUpdate((sprite, { start, end }) => {
        const middlePos = Object.assign(...['x', 'y', 'z'].map(c => ({
          [c]: start[c] + (end[c] - start[c]) / 2 // calc middle point
        })));

        // Position sprite
        Object.assign(sprite.position, middlePos);
      })
      .nodeLabel('id')
      .nodeAutoColorBy('id')
      .onNodeHover(node => elem.style.cursor = node ? 'pointer' : null)
      .onNodeClick(node => {
        // Aim at node from outside it
        const distance = 250;
        const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

        Graph.cameraPosition(
          { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
          node, // lookAt ({ x, y, z })
          3000  // ms transition duration
        );
      })
      .nodeThreeObject(node => {
        // use a sphere as a drag handle
        const obj = new THREE.Mesh(
          new THREE.SphereGeometry(10),
          new THREE.MeshBasicMaterial({ depthWrite: false, transparent: true, opacity: 0 })
        );

        // add text sprite as child
        const sprite = new SpriteText(node.id);
        sprite.color = node.color;
        sprite.textHeight = 25;
        obj.add(sprite);

        return obj;
      });

    // Spread nodes a little wider
    Graph.d3Force('charge').strength(-3000);
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
