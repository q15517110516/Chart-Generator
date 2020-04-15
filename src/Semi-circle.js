import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

export class Semicircle extends Component {
    componentDidMount(){
        let chart = am4core.create("semi-circle", am4charts.PieChart);
        let data = this.props.data;
        chart.data = data;
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
        chart.radius = am4core.percent(70);
        chart.innerRadius = am4core.percent(40);
        chart.startAngle = 180;
        chart.endAngle = 360;  

        let series = chart.series.push(new am4charts.PieSeries());
        series.dataFields.value = "value";
        series.dataFields.category = "name";

        series.slices.template.cornerRadius = 10;
        series.slices.template.innerCornerRadius = 7;
        series.slices.template.draggable = true;
        series.slices.template.inert = true;
        series.alignLabels = false;

        series.hiddenState.properties.startAngle = 90;
        series.hiddenState.properties.endAngle = 90;

        chart.legend = new am4charts.Legend();
        this.chart = chart;


    }
    
    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    render() {
        return (
            <div className="semi-circle">
                <div className="title" style={{width: "100%", textAlign: "center"}}>
                    <h3 style={{padding: 10}}>Semi Circle</h3>
                </div>
                <div id="semi-circle" style={{ width: "100%", height: 400}} ></div>
            </div>
        )
    }
}

export default Semicircle
