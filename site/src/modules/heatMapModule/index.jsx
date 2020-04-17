import React from 'react'
import Chart from "react-apexcharts";
function generateData(count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
        var x = 'w' + (i + 1).toString();
        var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

        series.push({
            x: x,
            y: y
        });
        i++;
    }
    return series;
}
class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            series: [{
                name: 'M1',
                data: generateData(24, {
                    min: 0,
                    max: 90
                })
            },
            {
                name: 'M2',
                data: generateData(24, {
                    min: 0,
                    max: 90
                })
            },
            {
                name: 'M3',
                data: generateData(24, {
                    min: 0,
                    max: 90
                })
            },
            {
                name: 'M4',
                data: generateData(24, {
                    min: 0,
                    max: 90
                })
            },
            {
                name: 'M5',
                data: generateData(18, {
                    min: 0,
                    max: 90
                })
            },
            {
                name: 'M6',
                data: generateData(18, {
                    min: 0,
                    max: 90
                })
            },
            {
                name: 'M7',
                data: generateData(18, {
                    min: 0,
                    max: 90
                })
            }
            ],
            options: {
                chart: {
                    height: 350,
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
                    text: 'HeatMap Chart (Single color)'
                }
            },


        };
    }



    render() {
        return (
            <div>
                <div id="heatmap-chart">
                    <Chart options={this.state.options} series={this.state.series} type="heatmap" height={250} />
                </div>
                <div id="html-dist"></div>
            </div>
        );
    }
}


export default Index;
