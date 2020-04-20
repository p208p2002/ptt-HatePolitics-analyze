// import ForceGraph3D from '3d-force-graph';
import ForceGraph from 'force-graph';
import React, { Component } from 'react'


export class Index extends Component {
  constructor(props) {
    super(props)
    this.Graph = undefined
  }

  preprocessData = (jsonData) => {
    let LIMIT = 3000 // 限制最高連線
    let { links } = jsonData

    // 依照數值大小排序
    links = links.sort((a, b) => {
      return b.value - a.value
    })

    // 設定透明度
    let linkOpticals = (() => {
      let opticals = []
      let gap = 1 / LIMIT
      let nowVal = 1
      while (nowVal > 0) {
        opticals.push(nowVal)
        nowVal -= gap
      }
      return opticals.slice(0, LIMIT)
    })()

    // 存入links
    links = links.map((link, i) => {
      let linkOptical = linkOpticals[i]
      return Object.assign({}, link, { linkOptical })
    })
    // console.log(links)

    // 刪除超過限制的連線
    links = links.slice(0, LIMIT)
    return Object.assign({}, jsonData, {
      links
    })
  }

  componentDidMount() {
    let chartData = this.props.chartData
    let jsonData = this.preprocessData(chartData)
    console.log(jsonData)

    let { fullMode = false } = this.props
    var width = document.getElementById(this.props.chartID).offsetWidth
    var height = document.getElementById(this.props.chartID).offsetHeight
    const elem = document.getElementById(this.props.chartID);

    //
    let highlightNodes = [];
    let highlightLinks = [];

    //
    let nodeSize = 70
    let { topNodes = [] } = this.props

    const Graph = ForceGraph()(elem)
      // .cooldownTime(6000)
      .backgroundColor('#808080')
      .graphData(jsonData)
      .height(fullMode ? undefined : height)
      .width(fullMode ? undefined : width)
      //node
      .nodeColor((node) => {
        if (topNodes[0] === node.id) {
          return 'red' // cc top 1
        }
        if (node.group === 2) {
          return 'blue' // random walk
        }
        return 'yellow'
      })
      .onNodeDragEnd(node => {
        node.fx = node.x;
        node.fy = node.y;
      })
      .onNodeClick(node => {
        // Center/zoom on node
        console.log(node)
        Graph.centerAt(node.x, node.y, 1000);
        Graph.zoom(0.1, 1200);
      })
      .nodeLabel('id')
      .onNodeHover(node => {
        elem.style.cursor = node ? 'pointer' : null;
        highlightNodes = node ? [node] : [];
        elem.style.cursor = node ? '-webkit-grab' : null;

        highlightLinks = []
        for (var i = 0; i < jsonData.links.length; i++) {
          let link = jsonData.links[i]

          try {
            if (link.source.id === node.id || link.target.id === node.id) {
              highlightLinks.push(link)
            }
          } catch (error) {
            // 
          }
        }
      })
      .nodeCanvasObjectMode(node => highlightNodes.indexOf(node) !== -1 ? 'before' : undefined)
      .nodeRelSize(nodeSize)
      .nodeCanvasObject((node, ctx) => {
        // add ring just for highlighted nodes
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeSize * 1.2, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'red';
        ctx.fill();
      })
      //link
      .onLinkHover(link => {
        highlightLinks = [link];
        highlightNodes = link ? [link.source, link.target] : [];
      })
      .linkLabel((link) => {
        // console.log(link)
        return `${link.source.id} - ${link.target.id} ${link.value}`
      })
      .linkWidth(link => {
        let { source = {}, target = {} } = link
        let linkId = undefined
        try {
          linkId = source.id + target.id
        } catch (error) {

        }
        let flag = false

        for (var i = 0; i < highlightLinks.length; i++) {
          let hlLink = highlightLinks[i]
          let hlLinkId = undefined
          try {
            hlLinkId = hlLink.source.id + hlLink.target.id
          } catch (error) {

          }
          if (linkId === hlLinkId) {
            flag = true
            break
          }
        }

        return flag ? link.linkOptical * 1 + 1 : link.linkOptical * 0.8
      })
      .linkDirectionalParticles(4)
      .linkDirectionalParticleWidth(link => link === highlightLinks ? 2.5 : 0)
      .linkColor((link) => {
        let { source = {}, target = {} } = link
        let linkId = undefined
        try {
          linkId = source.id + target.id
        } catch (error) {

        }
        let flag = false

        for (var i = 0; i < highlightLinks.length; i++) {
          let hlLink = highlightLinks[i]
          let hlLinkId = undefined
          try {
            hlLinkId = hlLink.source.id + hlLink.target.id
          } catch (error) {

          }
          if (linkId === hlLinkId) {
            flag = true
            break
          }
        }


        if ((topNodes[0] === link.source.id || topNodes[0] === link.target.id) && (link.target.group === 2 || link.source.group === 2)) {
          return flag?`rgba(255, 0, 0, 1)`:`rgba(0, 0, 100, ${link.linkOptical * 0.9.toString()})`
        }
        if (link.target.group === 2 || link.source.group === 2) {
          return flag?`rgba(255, 0, 0, 1)`:`rgba(235, 149, 50, ${link.linkOptical * 0.6.toString()})`
        }
        return flag?`rgba(255, 0, 0, 1)`:`rgba(0, 255, 255, ${link.linkOptical * 0.6.toString()})`
      })
   


    // // Spread nodes a little wider
    Graph.d3Force('charge').strength(-25000);
    let { center = {} } = this.props
    let { x = 0, y = 0 } = center
    Graph.centerAt(x, y)
    Graph.zoom(0.05);


  }
  render() {
    return (
      <div style={{ overflow: 'hidden' }}>
        <div style={{ width: this.props.width, height: this.props.height }}>
          <div id={this.props.chartID} style={{ width: '100%', height: '100%' }}></div>
        </div>
      </div>
    )
  }
}

export default Index
