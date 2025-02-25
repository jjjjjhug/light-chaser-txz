import React, {Component} from 'react';
import {ConfigType} from "../../../designer/right/ConfigType";
import {AntdBarGraphics, AntdCartesianCoordinateSys, AntdLegend} from "../../common-fragment/AntdFragment";
import {Bar, BarOptions} from "@antv/g2plot";
import {Legend} from "@antv/g2plot/lib/types/legend";
import AbstractComponent from "../../../framework/core/AbstractComponent";
import {AntdBarProps} from "./AntdBaseBar";

class AntdBaseBarStyleConfig extends Component<ConfigType> {

    legendChange = (legend: Legend) => {
        const instance: AbstractComponent<Bar, AntdBarProps> = this.props.instance;
        instance.update({style: {legend}});
    }

    barGraphicsChange = (config: BarOptions) => {
        const instance: AbstractComponent<Bar, AntdBarProps> = this.props.instance;
        instance.update({style: config});
    }

    barCoordinateSysChange = (config: BarOptions) => {
        const instance: AbstractComponent<Bar, AntdBarProps> = this.props.instance;
        console.log(config)
        instance.update({style: config});
    }

    render() {
        const {instance} = this.props;
        const config: BarOptions = instance.getConfig().style;
        return (
            <>
                {/*<BaseStyleSet config={config.baseStyle} updateConfig={updateConfig}/>*/}
                <AntdBarGraphics onChange={this.barGraphicsChange} config={config}/>
                <AntdLegend onChange={this.legendChange} config={config.legend}/>
                <AntdCartesianCoordinateSys onChange={this.barCoordinateSysChange} config={config}/>
            </>
        );
    }
}

export {AntdBaseBarStyleConfig};