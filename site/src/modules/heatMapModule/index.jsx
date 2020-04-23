import React from 'react'
import Chart from "react-apexcharts";
import HeatMapDataPush from '../../assets/heat_map_push.json'
import HeatMapDataPull from '../../assets/heat_map_pull.json'

class Index extends React.Component {
    constructor(props) {
        super(props);
        let { height = 350 } = props
        this.state = {
            series: [],
            options: {
                chart: {
                    height,
                    type: 'heatmap',
                    animations: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                colors: ["#008FFB"],
                title: {
                    text: this.props.title
                }
            },
        };
    }

    componentDidMount() {
        let HeatMapData = Object.assign({},HeatMapDataPush,HeatMapDataPull)
        let userHeatMapData = HeatMapData[this.props.username] || []
        console.log(userHeatMapData)
        let days = ['MON', 'TUE', 'WED', 'THR', 'FRI', 'SAT', 'SUN']
        let series = days.map((day, i) => {
            let dayUserHeatMapData = userHeatMapData[i] || []
            return {
                name: day,
                data: dayUserHeatMapData.map((d, i) => {
                    return {
                        x: i,
                        y: d
                    }
                })
            }
        })
        this.setState({
            series
        })
    }


    render() {
        let { series } = this.state
        return (
            <div>
                <div id="heatmap-chart">
                    {series.length > 0 ? <Chart options={this.state.options} series={this.state.series} type="heatmap" height={this.props.height} /> : null}
                </div>
                <div id="html-dist"></div>
            </div>
        );
    }
}


export default Index;
