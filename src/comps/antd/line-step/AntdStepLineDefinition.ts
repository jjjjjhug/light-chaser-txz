import {BaseInfoType} from "../../../designer/DesignerType";
import stepLineImg from "./step-line.png";
import AbstractLineDefinition from "../../antd-common/line/AbstractLineDefinition";
import {AntdLineProps} from "../../antd-common/line/AntdCommonLine";
import {BaseMenuMapping} from "../../common-component/common-types";
import {AntdStepLineConfig} from "./AntdStepLineConfig";

class AntdStepLineDefinition extends AbstractLineDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd阶梯折线图",
            compKey: "AntdStepLine",
            type: "折线图",
            typeKey: "line",
            desc: "基于Antd Designer实现的阶梯折线图组件",
        };
    }

    getChartImg(): string {
        return stepLineImg;
    }

    getMenuToConfigContentMap(): BaseMenuMapping | null {
        let menuToConfigContentMap = super.getMenuToConfigContentMap();
        menuToConfigContentMap!['style'] = AntdStepLineConfig;
        return menuToConfigContentMap;
    }


    getInitConfig(): AntdLineProps {
        const data = [
            {year: '1991', value: 3},
            {year: '1992', value: 4},
            {year: '1993', value: 3.5},
            {year: '1994', value: 5},
            {year: '1995', value: 4.9},
            {year: '1996', value: 6},
            {year: '1997', value: 7},
            {year: '1998', value: 9},
            {year: '1999', value: 13},
            {year: '1999', value: 8},
        ];
        return {
            info: {
                id: "",
                name: '多折线图',
                type: 'AntdStepLine',
                desc: '基于antd实现的多折线图',
            },
            style: {
                data: data,
                xField: 'year',
                yField: 'value',
                stepType: 'vh',
                color: '#00d7ff',
                smooth: true,
                supportCSSTransform: true,
                lineStyle: {
                    stroke: "#00dbffff",
                    lineWidth: 1,
                },
                xAxis: {
                    grid: null,
                    label: {
                        style: {
                            fill: "#00FFEAFF"
                        }
                    },
                    line: {
                        style: {
                            stroke: "#00dbffff",
                            lineWidth: 1
                        }
                    },
                    tickLine: null,
                    subTickLine: null,
                    position: "left",
                    title: null
                },
                yAxis: {
                    grid: null,
                    label: {
                        style: {
                            fill: "#00FFEAFF"
                        }
                    },
                    line: {
                        style: {
                            stroke: "#00dbffff",
                            lineWidth: 1
                        }
                    },
                    tickLine: null,
                    subTickLine: null,
                    position: "bottom",
                    title: null
                },
                legend: {
                    position: "right-top",
                    layout: "vertical",
                    itemName: {
                        style: {
                            fill: "#00f0ffff",
                            fontSize: 12
                        }
                    }
                },
                animation: {
                    appear: {
                        animation: 'wave-in',
                        duration: 3000,
                    },
                }
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

export default AntdStepLineDefinition;
