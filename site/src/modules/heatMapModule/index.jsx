import React from 'react'
import Chart from "react-apexcharts";
import HeatMapData from '../../assets/heat_map.json'

class Index extends React.Component {
    constructor(props) {
        super(props);
        let { height=350 } = props
        this.state = {
            series:[],
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

    componentDidMount(){
        // console.log(this.state)
        let userHeatMapData = HeatMapData[this.props.username] || []   
        console.log(userHeatMapData)     
        let days = ['MON','TUE','WED','THR','FRI','SAT','SUN']               
        let series = days.map((day,i)=>{               
            return {
                name:day,
                data:userHeatMapData[i]
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
                    {series.length > 0?<Chart options={this.state.options} series={this.state.series} type="heatmap" height={this.props.height} />:null}
                </div>
                <div id="html-dist"></div>
            </div>
        );
    }
}


export default Index;
