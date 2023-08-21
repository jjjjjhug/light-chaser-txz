import {BaseInfoType} from "../../../designer/DesignerType";
import scatterPoint from "./scatter-point.png";
import AbstractScatterDefinition from "../../antd-common/scatter/AbstractScatterDefinition";
import {AntdScatterProps} from "../../antd-common/scatter/AntdCommonScatter";

class AntdScatterPointDefinition extends AbstractScatterDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd散点图",
            compKey: "AntdScatterPoint",
            type: "散点图",
            typeKey: "scatter",
            desc: "基于Antd Designer实现的散点图组件",
        };
    }

    getChartImg(): string {
        return scatterPoint;
    }

    getInitConfig(): AntdScatterProps {
        const data = [
            {
                "x": 1,
                "y": 23,
                "type": "one",
            },
            {
                "x": 2,
                "y": 15,
                "type": "two",
            },
            {
                "x": 3,
                "y": 17,
                "type": "three",
            },
            {
                "x": 4,
                "y": 48,
                "type": "four",
            },
            {
                "x": 5,
                "y": 8,
                "type": "five",
            },
        ];
        return {
            info: {
                id: "",
                name: 'Antd散点图',
                type: 'AntdScatterPoint',
                desc: '基于antd实现的散点图',
            },
            style: {
                data: data,
                xField: "x",
                yField: "y",
                colorField: "type",
                size: 6,
                shape: "circle",
                pointStyle: {
                    fillOpacity: 1,
                    lineWidth: 0,
                },
                xAxis: {
                    grid: null,
                    label: {
                        style: {
                            fill: "#a8a8a8ff",
                            fontSize: 10,
                        },
                    },
                    line: {
                        style: {
                            stroke: "#a4a4a470",
                            lineWidth: 1,
                        },
                    },
                    tickLine: null,
                    subTickLine: null,
                    position: "bottom",
                    title: null,
                },
                yAxis: {
                    grid: null,
                    label: {
                        style: {
                            fill: "#a0a0a0ff",
                            fontSize: 10,
                        },
                    },
                    line: null,
                    tickLine: null,
                    subTickLine: null,
                    position: "left",
                    title: null,
                },
                legend: {
                    position: "top",
                    layout: "horizontal",
                    itemName: {
                        style: {
                            fill: "#969696ff",
                            fontSize: 10,
                        },
                    },
                },
                supportCSSTransform: true,
                animation: {
                    appear: {
                        animation: "fade-in",
                        duration: 3000,
                    },
                },
                color: ["#00b7ffff", "#006d98ff"],
            },
            data: {
                dataSource: 'static',
                staticData: {
                    data: data
                },
            },
        };
    }
}

export default AntdScatterPointDefinition;
