import React from "react";
import {AbstractCustomComponentDefinition} from "../../../framework/core/AbstractCustomComponentDefinition";
import {MenuInfo} from "../../../designer/right/MenuType";
import {getDefaultMenuList} from "../../../designer/right/util";
import {BaseMenuMapping, ClazzTemplate} from "../../common-component/common-types";
import AntdGauge, {AntdGaugeProps} from "./AntdGauge";
import gaugeImg from './gauge.png';
import {BaseInfoType} from "../../../designer/DesignerType";

const AnimationConfig = React.lazy(() => import("../../common-component/animation-config/AnimationConfig"));
const AntdGaugeConfig = React.lazy(() => import("./AntdGaugeConfig").then((module) => ({default: module.AntdGaugeConfig})));
const ThemeConfig = React.lazy(() => import("../../common-component/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../common-component/base-info/BaseInfo"));
const DataConfig = React.lazy(() => import("../../common-component/data-config/DataConfig"));


class AntdGaugeDefinition extends AbstractCustomComponentDefinition<AntdGauge, BaseMenuMapping, AntdGaugeProps> {

    getComponent(): ClazzTemplate<AntdGauge> | null {
        return AntdGauge;
    }

    getMenuList(): Array<MenuInfo> {
        return getDefaultMenuList();
    }

    getMenuToConfigContentMap(): BaseMenuMapping | null {
        return {
            info: BaseInfo,
            data: DataConfig,
            style: AntdGaugeConfig,
            animation: AnimationConfig,
            theme: ThemeConfig
        };
    }

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd仪表盘",
            compKey: "AntdGauge",
            type: "仪表盘",
            typeKey: "gauge",
            desc: "基于Antd Designer实现的仪表盘组件",
        };
    }

    getChartImg(): string | null {
        return gaugeImg;
    }

    getInitConfig(): AntdGaugeProps {
        return {
            info: {
                id: "",
                name: 'Antd仪表盘',
                type: 'AntdGauge',
                desc: '基于Antd Designer实现的仪表盘组件',
            },
            style: {
                percent: 0.75,
                range: {
                    color: '#30BF78',
                },
                indicator: {
                    pointer: {
                        style: {
                            stroke: '#D0D0D0',
                        },
                    },
                    pin: {
                        style: {
                            stroke: '#D0D0D0',
                        },
                    },
                },
                axis: {
                    label: {
                        formatter(v) {
                            return Number(v) * 100;
                        },
                    },
                    subTickLine: {
                        count: 3,
                    },
                },
                statistic: {
                    content: {
                        formatter: ({percent}: any) => `Rate: ${(percent * 100).toFixed(0)}%`,
                        style: {
                            color: 'rgba(0,0,0,0.65)',
                            fontSize: '16px',
                        },
                    },
                },
            },
            data: {
                dataSource: 'static',
                staticData: {
                    data: []
                },
            },
        };
    }
}

export default AntdGaugeDefinition;
