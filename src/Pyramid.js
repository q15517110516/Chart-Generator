import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

export class Pyramid extends Component {
    componentDidMount(){
        const newId = this.props.id;
        let Id = "pyramid" + (newId.toString());
        
        let chart = am4core.create(`${Id}`, am4charts.SlicedChart);
        let data = this.props.data;
        chart.data = data;
        chart.paddingBottom = 30;
        let series = chart.series.push(new am4charts.PyramidSeries());
        series.dataFields.value = "value";
        series.dataFields.category = "name";
        series.alignLabels = true;
        series.valueIs = "height";
        this.chart = chart;

    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    render() {

        const newId = this.props.id;
        let Id = "pyramid" + (newId.toString());

        return (
            <div className="pyramid">
                <div className="title" style={{width: "100%", textAlign: "center"}}>
                    <h3 style={{padding: 10}}>Pyramid</h3>
                </div>
                <div id={`${Id}`} style={{ width: "100%", height: 400}} ></div>
            </div>
        )
    }
}

export default Pyramid
