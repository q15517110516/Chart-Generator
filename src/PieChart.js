import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { cos } from '@amcharts/amcharts4/.internal/core/utils/Math';

am4core.useTheme(am4themes_animated);

export class PieChart extends Component {
    componentDidMount() {
        const newId = this.props.id;
        let Id = "pie-chart" + (newId.toString());
        
        let chart = am4core.create(`${Id}`, am4charts.PieChart);
        let data = this.props.data;
        chart.data = data;

        let pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "value";
        pieSeries.dataFields.category = "name";
        pieSeries.slices.template.stroke = am4core.color("#fff");
        pieSeries.slices.template.strokeWidth = 2;
        pieSeries.slices.template.strokeOpacity = 1;

        pieSeries.hiddenState.properties.opacity = 1;
        pieSeries.hiddenState.properties.endAngle = -90;
        pieSeries.hiddenState.properties.startAngle = -90;
        this.chart = chart;
    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    render() {
        const newId = this.props.id;
        let Id = "pie-chart" + (newId.toString());
        
        return (
            <div className="piechart">
                <div className="title" style={{width: "100%", textAlign: "center"}}>
                    <h3 style={{padding: 10}}>Pie Chart</h3>
                </div>
                <div id={`${Id}`} style={{ width: "100%", height: 400}} ></div>
            </div>
        )
    }
}

export default PieChart


