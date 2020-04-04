// import ForceGraph3D from '3d-force-graph';
import ForceGraph from 'force-graph';
import React, { Component } from 'react'


export class Index extends Component {
  constructor(props) {
    super(props)
    this.Graph = undefined
  }

  preprocessData =  (jsonData)=>{
    let LIMIT = 500 // 限制最高連線
    let {links} = jsonData
    
    // 依照數值大小排序
    links = links.sort((a,b)=>{
      return b.value - a.value
    })

    // 設定透明度
    let linkOpticals = (()=>{
      let opticals = []
      let gap = 1/LIMIT
      let nowVal = 1
      while(nowVal > 0){
        opticals.push(nowVal)
        nowVal -= gap
      }
      return opticals.slice(0,LIMIT)
    })()

    // 存入links
    links = links.map((link,i)=>{
      let linkOptical = linkOpticals[i]
      return Object.assign({},link,{linkOptical})
    })
    // console.log(links)

    // 刪除超過限制的連線
    links = links.slice(0,LIMIT)
    return Object.assign({},jsonData,{
      links
    })
  }

  componentDidMount() {
    let chartData=this.props.chartData
    let jsonData = this.preprocessData(chartData)
    console.log(jsonData)

    let { fullMode = false } = this.props
    var width = document.getElementById(this.props.chartID).offsetWidth
    var height = document.getElementById(this.props.chartID).offsetHeight
    const elem = document.getElementById(this.props.chartID);
    let highlightNodes = [];
    let highlightLink = null;
    const Graph = ForceGraph()(elem)
      .graphData(jsonData)
      .height(fullMode ? undefined : height)
      .width(fullMode ? undefined : width)
      .cooldownTime(60000)
      .nodeLabel('id')
      .onNodeHover(node => {
        elem.style.cursor = node ? 'pointer' : null;
        highlightNodes = node ? [node] : [];
        elem.style.cursor = node ? '-webkit-grab' : null;
      })
      .onLinkHover(link => {
        highlightLink = link;
        highlightNodes = link ? [link.source, link.target] : [];
      })
      .linkLabel((link)=>{
        // console.log(link)
        return `${link.source.id} - ${link.target.id} ${link.value}`
      })
      // .linkWidth(link => link === highlightLink ? 8 : 1.2)
      .linkWidth(link=>{
        return link === highlightLink ? link.linkOptical*1.75+5 : link.linkOptical*1.75
      })
      .linkDirectionalParticles(4)
      .linkDirectionalParticleWidth(link => link === highlightLink ? 4 : 0)
      .nodeCanvasObjectMode(node => highlightNodes.indexOf(node) !== -1 ? 'before' : undefined)
      .nodeCanvasObject((node, ctx) => {
        // add ring just for highlighted nodes
        ctx.beginPath();
        ctx.arc(node.x, node.y, 18 * 1.4, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'red';
        ctx.fill();
      })
      .linkColor((link)=>{
        return link === highlightLink?`rgba(255, 0, 255, ${link.linkOptical.toString()})`:`rgba(0, 255, 255, ${link.linkOptical.toString()})`
      })
      .nodeColor(()=>{
        return 'yellow'
      })
      .nodeRelSize(18)
      .onNodeDragEnd(node => {
        node.fx = node.x;
        node.fy = node.y;
      })
      .onNodeClick(node => {
        // Center/zoom on node
        Graph.centerAt(node.x, node.y, 1000);
        Graph.zoom(0.5, 1200);
      });

    // // Spread nodes a little wider
    Graph.d3Force('charge').strength(-3000);
    Graph.zoom(0.1);
  }
  render() {
    return (
      <div style={{overflow:'hidden'}}>
        <div style={{ width: this.props.width, height: this.props.height }}>
          <div id={this.props.chartID} style={{ width: '100%', height: '100%' }}></div>
        </div>
      </div>
    )
  }
}

export default Index
