import React, { Component } from 'react'
import ChartView from './modules/chartModules'
import './App.css'
import ReactTooltip from 'react-tooltip'
import chartDataPOS from './assets/chart_data_pos.json'
import chartDataNEG from './assets/chart_data_neg.json'
var parse = require('url-parse')
export class App extends Component {
  constructor(props) {
    super(props)
    this.Graph = undefined
    this.state = {
      isMobile: undefined
    }
  }

  componentWillMount() {
    let isMobile = function () {
      var check = false;
      // eslint-disable-next-line 
      (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
      return check;
    };
    this.setState({
      isMobile: isMobile()
    })
  }

  render() {
    let { isMobile } = this.state
    let mobileHeight = parseInt(window.screen.height * 0.65).toString() + "px"
    let deskTopHeight = "550px"
    let ChartViewHeight = isMobile ? mobileHeight : deskTopHeight

    var parsed = parse(window.location.href);
    console.log(window.location.href)
    console.log(parsed.query)
    let query = parsed.query.toString()
    // eslint-disable-next-line
    let fullMode = query === '?mode=full' ? true : false

    return (
      <div id="ptt-relation">
        <div id="head">
          <div id="topbar-container">
            <div id="topbar" className="bbs-content container">
              <span id="logo">批踢踢政黑版分析</span>
              <span>›</span>
              <span className="board"><span className="board-label">看板 </span>HatePolitics</span>
              <a className="right small" href="https://github.com/p208p2002/ptt-HatePolitics-analyze">GitHub</a>
            </div>
          </div>
          <div style={{ marginTop: 40 }} className="text-center container">
            <div className="context-head">
              <div className="block-head text-left">
                <div className="article-metaline"><span className="article-meta-tag">作者</span><span className="article-meta-value">Mr.cha-shui-piao(查水表先生)</span></div>
                <div className="article-metaline"><span className="article-meta-tag">標題</span><span className="article-meta-value">[討論] 政黑板潛伏大量婉君?</span></div>
                <div className="article-metaline"><span className="article-meta-tag">時間</span><span className="article-meta-value">Sat Apr  4 10:04:02 2020</span></div>
              </div>
              <br />
            </div>
            <div className="text-left ptt-text">
              婉君就在你我身邊，究竟是誰在刻意操作風向<br />
              以下請看本人的數據分析<br />
              <br />
            </div>

            <div className="chart">
              <div className="text-left ptt-text" style={{ color: '#6f6' }}>
                共同推文關係
              </div>
              <ChartView
                center={{x:-2227.9067890690576,y:-10177.240674924838}}
                topNodes = {['kan8634','bizer','SSkey','FuwafuwaCAT','p1227426']}
                width="100%"
                height={ChartViewHeight}
                chartID={'chart1'}
                chartData={chartDataPOS}
              />
              <br />
            </div>
            {/* chart1-start */}
            <div className="rwd-component" style={{ margin: '0 auto' }}>
              <p style={{ top: '10px', position: 'relative' }} className="text-bg">Dataset Statistics</p>
              <table className="table table-striped table-bordered novel-table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">項目</th>
                    <th scope="col">數值</th>
                  </tr>
                </thead>
                <tbody>
                  <tr data-tip="節點數量">
                    <th scope="row">1</th>
                    <td>Nodes</td>
                    <td>370</td>
                  </tr>
                  <tr data-tip="連接邊數">
                    <th scope="row">2</th>
                    <td>Edges</td>
                    <td>2345</td>
                  </tr>
                  <tr data-tip="任一節點與其他節點產生多少連結">
                    <th scope="row">3</th>
                    <td>Average degree</td>
                    <td>12.675676</td>
                  </tr>
                  <tr data-tip="任一與其他節點的最長距離">
                    <th scope="row">4</th>
                    <td>Diameter</td>
                    <td>11</td>
                  </tr>
                  <tr data-tip="傳遞性">
                    <th scope="row">5</th>
                    <td>Transitivity</td>
                    <td>0.472234</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br />
            <div data-tip="與其他節點距離度量" className="rwd-component" style={{ margin: '0 auto' }}>
              <p style={{ top: '10px', position: 'relative' }} className="text-bg">Closeness Centrality</p>
              <table
                className="table table-striped table-bordered novel-table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">節點</th>
                    <th scope="col">數值</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>kan8634</td>
                    <td>0.06840</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>bizer</td>
                    <td>0.06652</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>SSkey</td>
                    <td>0.06550</td>
                  </tr>
                  <tr>
                    <th scope="row">4</th>
                    <td>FuwafuwaCAT</td>
                    <td>0.06505</td>
                  </tr>
                  <tr>
                    <th scope="row">5</th>
                    <td>p1227426</td>
                    <td>0.06403</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br />
            <div className="rwd-component" style={{ margin: '0 auto' }}>
              <p style={{ top: '10px', position: 'relative' }} className="text-bg">Degree Distribution</p>
              <img
                className="img-thumbnail img-fluid"
                src={require('./assets/imgs/push.png')} width="100%" alt="" srcSet="" />
            </div>
            <br />
            {/* chart1-end */}
            <div className="chart">
              <div className="text-left ptt-text" style={{ color: '#f66' }}>
                共同噓文關係
              </div>
              <ChartView
                center={{x:-8304.494507819763,y:-19094.987961940464}}
                topNodes = {['freedom168','kismets','jason486','anyweather','william12tw']}
                width="100%"
                height={ChartViewHeight}
                chartID={'chart2'}
                chartData={chartDataNEG}
              />
              <br />
            </div>
            {/* chart2-start */}
            <div className="rwd-component" style={{ margin: '0 auto' }}>
              <p style={{ top: '10px', position: 'relative' }} className="text-bg">Dataset Statistics</p>
              <table className="table table-striped table-bordered novel-table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">項目</th>
                    <th scope="col">數值</th>
                  </tr>
                </thead>
                <tbody>
                  <tr data-tip="節點數量">
                    <th scope="row">1</th>
                    <td>Nodes</td>
                    <td>66</td>
                  </tr>
                  <tr data-tip="連接邊數">
                    <th scope="row">2</th>
                    <td>Edges</td>
                    <td>76</td>
                  </tr>
                  <tr data-tip="任一節點與其他節點產生多少連結">
                    <th scope="row">3</th>
                    <td>Average degree</td>
                    <td>2.3</td>
                  </tr>
                  <tr data-tip="任一與其他節點的最長距離">
                    <th scope="row">4</th>
                    <td>Diameter</td>
                    <td>7</td>
                  </tr>
                  <tr data-tip="傳遞性">
                    <th scope="row">5</th>
                    <td>Transitivity</td>
                    <td>0.148577</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br />
            <div data-tip="與其他節點距離度量" className="rwd-component" style={{ margin: '0 auto' }}>
              <p style={{ top: '10px', position: 'relative' }} className="text-bg">Closeness Centrality</p>
              <table
                className="table table-striped table-bordered novel-table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">節點</th>
                    <th scope="col">數值</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>freedom168</td>
                    <td>0.43056</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>kismets</td>
                    <td>0.32292</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>jason486</td>
                    <td>0.31313</td>
                  </tr>
                  <tr>
                    <th scope="row">4</th>
                    <td>anyweather</td>
                    <td>0.31</td>
                  </tr>
                  <tr>
                    <th scope="row">5</th>
                    <td>william12tw</td>
                    <td>0.30693</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br />
            <div className="rwd-component" style={{ margin: '0 auto' }}>
              <p style={{ top: '10px', position: 'relative' }} className="text-bg">Degree Distribution</p>
              <img
                className="img-thumbnail img-fluid"
                src={require('./assets/imgs/pull.png')} width="100%" alt="" srcSet="" />
            </div>
            {/* chart2-end */}

            {/* 留言 */}
            <br/>
            <div className="text-left">
              <span class="f2">※ 批踢踢政黑版分析總結</span>
              <div className="push">
                <span className="f1 hl push-tag text-white">推 </span><span className="f3 hl push-userid">Mrs.cha-shui-piao</span><span class="f3 push-content">: 根據觀察 Average degree 政黑版任何人與推文平均相關的人高達12.676</span>
              </div>
              <div className="push">
                <span className="f1 hl push-tag">→ </span><span className="f3 hl push-userid">Mrs.cha-shui-piao</span><span class="f3 push-content">: 明顯高於噓文的關係</span>
              </div>
              <div className="push">
                <span className="f1 hl push-tag">→ </span><span className="f3 hl push-userid">Mrs.cha-shui-piao</span><span class="f3 push-content">: 這代表在政黑版中推文關注點與回應率高於噓文，只要是正面的文章，將集中回應率較高。</span>
                <div>
                  <span className="ptt-text">
                    雖然推文Transitivity較高(可能代表大家都會在推文中互相留言討論)，但是推文的Diameter距離較遠(每個人之間距離比較較遠)
                    換句話說只要有正向推文酸民們會一起推文，但是不特別集中在某一小群酸民的行為。
                    <br/>
                    <br/>
                    而噓文Transitivity較低(代表酸民們互相在同一篇噓文留言討論較低)，但是Diameter距離較短(表示通常都是這一小群比較經常在開砲火)
                    換句話說，雖然這些酸民會一起出現在同一篇噓文機率較小，但是他們之間關係卻比推文密切。
                  </span>
                </div>
              </div>
            </div>
          </div>
          <br />

          <footer className="text-center" style={{
            width: '100%',
            color: 'rgba(0,0,0,0.7)',
            backgroundColor: 'rgba(255,255,255,0.35)'
          }}>
            2020 社群網路與運算
            </footer>
          <ReactTooltip />
        </div>
      </div>
    )
  }
}

export default App
