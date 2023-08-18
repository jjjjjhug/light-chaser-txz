import React, {Component} from 'react';
import {ConfigType} from "../../../designer/right/ConfigType";
import {Line, LineOptions, ShapeStyle} from "@antv/g2plot";
import AntdCommonLine, {AntdLineProps} from "../../antd-common/line/AntdCommonLine";
import {AntdCartesianCoordinateSys} from "../../antd-common/config/AntdFragment";
import AbstractComponent from "../../../framework/core/AbstractComponent";
import {WritableLineOptions} from "../../antd-common/types";
import ColorMode, {ColorModeValue} from "../../../lib/lc-color-mode/ColorMode";
import {ShapeAttrs} from "@antv/g-base";
import Accordion from "../../../lib/lc-accordion/Accordion";
import ConfigCard from "../../../lib/lc-config-card/ConfigCard";
import ConfigItem from "../../../lib/lc-config-item/ConfigItem";
import UnderLineInput from "../../../lib/lc-input/UnderLineInput";
import {MappingOptions} from "@antv/g2plot/lib/adaptor/geometries/base";
import CfgItemBorder from "../../../lib/lc-config-item/CfgItemBorder";
import BaseColorPicker from "../../../lib/lc-color-picker/BaseColorPicker";
import Select from "../../../lib/lc-select/Select";

class AntdStepLineConfig extends Component<ConfigType> {

    lineCoordinateSysChange = (config: LineOptions) => {
        const instance = this.props.instance as AntdCommonLine;
        instance.update({style: config});
    }

    lineGraphicsChange = (config: LineOptions) => {
        const instance: AbstractComponent<Line, AntdLineProps> = this.props.instance as AntdCommonLine;
        instance.update({style: config});
    }

    render() {
        const {instance} = this.props;
        const config: LineOptions = instance.getConfig().style;
        return (
            <>
                <AntdStepLineGraphics onChange={this.lineGraphicsChange} config={config}/>
                <AntdCartesianCoordinateSys onChange={this.lineCoordinateSysChange} config={config}/>
            </>
        );
    }
}

export {AntdStepLineConfig};

export interface AntdStepLineGraphicsProps {
    config?: WritableLineOptions;

    onChange(config: WritableLineOptions): void;
}

export const AntdStepLineGraphics: React.FC<AntdStepLineGraphicsProps> = ({config, onChange}) => {

    const LineColorChange = (data: ColorModeValue) => {
        const {mode, value} = data;
        switch (mode) {
            case 'single':
                onChange({lineStyle: {stroke: value as string}});
                break;
            case 'gradient':
                onChange({lineStyle: {stroke: `l(0) 0:${value[0]} 1:${value[1]}`}});
                break;
        }
    }

    const buildColorModeData = (): ColorModeValue => {
        let mode = 'single', value: string | string[] = '#fff';
        if ((config?.lineStyle as ShapeAttrs)?.stroke) {
            const stroke = (config?.lineStyle as ShapeAttrs).stroke as string;
            if (stroke.startsWith('l')) {
                mode = 'gradient';
                value = [stroke.split(':')[1].split(' ')[0], stroke.split(':')[2].split(' ')[0]];
            } else {
                mode = 'single';
                value = stroke;
            }
        }
        return {mode, value};
    }

    return (
        <Accordion title={'图形'}>
            <ConfigCard title={'线条'}>
                <ConfigItem title={'线宽'}>
                    <UnderLineInput defaultValue={(config?.lineStyle as ShapeStyle)?.lineWidth}
                                    type={'number'} min={0}
                                    onChange={(event) =>
                                        onChange({lineStyle: {lineWidth: parseInt(event.target.value)}})}/>
                </ConfigItem>
                <ConfigItem title={'类型'}>
                    <Select options={[
                        {value: 'hv', label: 'hv'},
                        {value: 'vh', label: 'vh'},
                        {value: 'hvh', label: 'hvh'},
                        {value: 'vhv', label: 'vhv'}]}
                            defaultValue={config?.stepType || 'vh'}
                            onChange={(value) => onChange({stepType: value})}/>
                </ConfigItem>
                <ConfigItem title={'颜色'} itemStyle={{width: '100%'}} contentStyle={{width: '85%'}}>
                    <ColorMode onChange={LineColorChange} data={buildColorModeData()} exclude={['multi']}/>
                </ConfigItem>
            </ConfigCard>
            <ConfigCard title={'点'}>
                <ConfigItem title={'尺寸'}>
                    <UnderLineInput defaultValue={(config?.point as MappingOptions)?.size as number || 0}
                                    type={'number'} min={0}
                                    onChange={(event) =>
                                        onChange({point: {size: parseInt(event.target.value)}})}/>
                </ConfigItem>
                <ConfigItem title={'颜色'}>
                    <CfgItemBorder width={'100%'}>
                        <BaseColorPicker
                            defaultValue={config?.point?.color as string || '#fff'}
                            onChange={(value) => onChange({point: {color: value}})}
                            style={{width: '100%', height: '15px', borderRadius: 2}} showText={true}/>
                    </CfgItemBorder>
                </ConfigItem>
                <ConfigItem title={'形状'}>
                    <Select options={[
                        {value: 'circle', label: '圈形'},
                        {value: 'square', label: '方形'},
                        {value: 'bowtie', label: '领结'},
                        {value: 'diamond', label: '钻石'},
                        {value: 'hexagon', label: '六角形'},
                        {value: 'triangle', label: '三角形'}]}
                            defaultValue={config?.point?.shape as string || 'circle'}
                            onChange={(value) => onChange({point: {shape: value}})}/>
                </ConfigItem>
            </ConfigCard>
        </Accordion>
    )
}