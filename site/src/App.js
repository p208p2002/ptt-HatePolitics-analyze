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
                <div className="article-metaline"><span className="article-meta-tag">標題</span><span className="article-meta-value">[問卦] 這麼誇張的關係，是不是婉君搞的鬼?</span></div>
                <div className="article-metaline"><span className="article-meta-tag">時間</span><span className="article-meta-value">Sat Apr  4 10:04:02 2020</span></div>
              </div>
              <br />
            </div>
            <div className="text-left ptt-text">
              大家安安<br />
              婉君一天有四十八小時<br />
              有沒有婉君天天爆肝工作超辛苦的八卦<br />
              <br/>
            </div>

            <div className="chart">
              <div className="text-left ptt-text" style={{color:'#6f6'}}>
               共同推文關係
              </div>
              <ChartView
                width="100%"
                height={ChartViewHeight}
                chartID={'chart1'}
                chartData={chartDataPOS}
              />
              <br />
              <div className="text-left ptt-text" style={{color:'#f66'}}>
               共同噓文關係
              </div>
              <ChartView
                width="100%"
                height={ChartViewHeight}
                chartID={'chart2'}
                chartData={chartDataNEG}
              />
            </div>

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
                    <td>61</td>
                  </tr>
                  <tr data-tip="連接邊數">
                    <th scope="row">2</th>
                    <td>Edges</td>
                    <td>328</td>
                  </tr>
                  <tr data-tip="任一故事人物平均存在與12個人的關係">
                    <th scope="row">3</th>
                    <td>Average degree</td>
                    <td>12</td>
                  </tr>
                  <tr data-tip="任一個故事人物之間最長為3個人的距離">
                    <th scope="row">4</th>
                    <td>Diameter</td>
                    <td>3</td>
                  </tr>
                  <tr data-tip="有70%機率故事中任一位人物的朋友之間也是朋友整個故事劇情中出現的人物可能幾乎都互相認識">
                    <th scope="row">5</th>
                    <td>Transitivity</td>
                    <td>0.7093</td>
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
                    <td>小魚兒</td>
                    <td>0.8966</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>燕南天</td>
                    <td>0.6420</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>鐵心蘭</td>
                    <td>0.6190</td>
                  </tr>
                  <tr>
                    <th scope="row">4</th>
                    <td>軒轅三光</td>
                    <td>0.5977</td>
                  </tr>
                  <tr>
                    <th scope="row">5</th>
                    <td>江玉郎</td>
                    <td>0.5977</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br />
            <div className="rwd-component" style={{ margin: '0 auto' }}>
              <p style={{ top: '10px', position: 'relative' }} className="text-bg">Degree Distribution</p>
              <img
                className="img-thumbnail img-fluid"
                src={require('./assets/imgs/DegreeDistribution.png')} width="100%" alt="" srcSet="" />
            </div>
            <br />
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
