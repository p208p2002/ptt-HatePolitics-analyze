// import ForceGraph3D from '3d-force-graph';
import ForceGraph from 'force-graph';
import React, { Component } from 'react'
import './index.css'
import HeatMap from '../heatMapModule'

export class Index extends Component {
  constructor(props) {
    super(props)
    this.Graph = undefined
    this.state = {
      hoverNode: {},
      hoverLinks: [],
      searchId: '',
      graphData: {}
    }
  }

  searchNode = (target_id) => {
    this.setState({
      searchId: target_id
    })
    let { nodes } = this.state.graphData
    for (let i = 0; i < nodes.length; i++) {
      let node = nodes[i]
      if (node.id === target_id) {
        this.Graph.centerAt(node.x, node.y)
        this.Graph.zoom(0.07);
        this.Graph.nodeColor((gNode) => {
          if (gNode.id === node.id) {
            return 'red'
          }
          return '#ccc'
        })
        setTimeout(() => {
          let { topNodes = [] } = this.props
          this.Graph.nodeColor((node) => {
            if (topNodes[0] === node.id) {
              return 'red' // cc top 1
            }
            if (node.group === 2) {
              return 'blue' // random walk
            }
            return 'yellow'
          })
        }, 2500)
        break;
      }
    }
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
    let nodeSize = 65
    let { topNodes = [] } = this.props
    let self = this
    const Graph = ForceGraph()(elem)
      .warmupTicks(150)
      .cooldownTicks(0)
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
        console.log(node)
        elem.style.cursor = node ? 'pointer' : null;
        highlightNodes = node ? [node] : [];
        elem.style.cursor = node ? '-webkit-grab' : null;

        highlightLinks = []
        for (var i = 0; i < jsonData.links.length; i++) {
          let link = jsonData.links[i]
          try {
            if (link.source.id === node.id || link.target.id === node.id) {
              highlightLinks.push(link)
              highlightNodes.push(link.source)
              highlightNodes.push(link.target)
            }
          } catch (error) {
            // 
          }
        }
        self.setState({
          hoverNode: node === null ? undefined : node,
          hoverLinks: highlightLinks === null ? [] : highlightLinks
        })
      })
      .nodeCanvasObjectMode(node => highlightNodes.indexOf(node) !== -1 ? 'before' : undefined)
      .nodeRelSize(nodeSize)
      .nodeCanvasObject((node, ctx) => {
        // add ring just for highlighted nodes
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeSize * 1.4, 0, 2 * Math.PI, false);
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
        let { source = {}, target = {} } = link,
          { id: sId = '' } = source,
          { id: tId = '' } = target
        let linkId = sId + tId
        for (var i = 0; i < highlightLinks.length; i++) {
          let hlLink = highlightLinks[i] === null ? {} : highlightLinks[i],
            { source = {}, target = {} } = hlLink,
            { id: hlSId = '' } = source,
            { id: hlTId = '' } = target
          let hlLinkId = hlSId + hlTId

          if (linkId === hlLinkId) {
            return link.linkOptical * 1.5
          }
        }
        return link.linkOptical * 0.8
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
          return flag ? `rgba(255, 0, 0, 1)` : `rgba(0, 0, 100, ${link.linkOptical * 0.9.toString()})`
        }
        if (link.target.group === 2 || link.source.group === 2) {
          return flag ? `rgba(255, 0, 0, 1)` : `rgba(235, 149, 50, ${link.linkOptical * 0.6.toString()})`
        }
        return flag ? `rgba(255, 0, 0, 1)` : `rgba(0, 255, 255, ${link.linkOptical * 0.6.toString()})`
      })



    // // Spread nodes a little wider
    Graph.d3Force('charge').strength(-22000);
    Graph.zoom(0.05)
    this.setState({
      graphData: Graph.graphData()
    })
    this.Graph = Graph

    setTimeout(()=>{
      this.searchNode(this.props.centerNode)
      this.setState({
        searchId:''
      })
      Graph.zoom(0.05)
    },500)
  }
  render() {
    let { hoverLinks = [], hoverNode = {} } = this.state;
    let { id: n_id, p: random_walk_p = '' } = hoverNode
    // console.log(hoverLinks)
    // n_id = n_id === null?'':n_id
    // n_group = n_group === null?'':n_group
    return (
      <div style={{ overflow: 'hidden', position: 'relative' }}>
        <div className="graph-search">
          <input
            placeholder={'搜尋...'}
            value={this.state.searchId}
            onChange={e=>this.searchNode(e.target.value)} type="text" />
        </div>

        <div className="hover-info">
          <span><b>節點資訊</b></span><br />
          <span>PTT username: {n_id}</span><br />
          <span>Random walk probability: {random_walk_p.toString().slice(0, 7)}</span>
        </div>

        <div className="hover-info-links">
          <span><b>周圍連線</b></span><br />
          {hoverLinks.map((link) => {
            let linkName = link.source.id !== n_id ? link.source.id : link.target.id
            return <span>{linkName} 共推率:{link.value.toString().slice(0, 7)}<br /></span>
          })}
        </div>


        {n_id ? <div className="hover-heat-map text-center">
          <span style={{ marginTop: 18, marginBottom: -25, display: 'block' }}>{n_id}作息熱力圖</span>
          <HeatMap height='200' />
        </div> : null}

        <div style={{ width: this.props.width, height: this.props.height }}>
          <div id={this.props.chartID} style={{ width: '100%', height: '100%' }}></div>
        </div>
      </div>
    )
  }
}

export default Index
