import React, {Component} from 'react';
import './BaseInfo.less';
import ConfigCard from "../../../lib/lc-config-card/ConfigCard";
import ConfigItem from "../../../lib/lc-config-item/ConfigItem";
import UnderLineInput from "../../../lib/lc-input/UnderLineInput";
import {ConfigType} from "../../../designer/right/ConfigType";
import {AntdBarProps} from "../../antd/base-bar/AntdBaseBar";
import designerStore from "../../../designer/store/DesignerStore";
import layerListStore from "../../../designer/float-configs/layer-list/LayerListStore";

/**
 * lc组件基础信息
 */
class BaseInfo extends Component<ConfigType> {

    changeName = (value: any) => {
        const {instance} = this.props;
        instance.update({info: {name: value}}, {reRender: false});
        const {updateLayout} = designerStore;
        const id = instance.getConfig().info.id;
        updateLayout && updateLayout([{id, name: value}]);
        //如果显示图层,则更新图层名称
        const {layerInstanceMap} = layerListStore;
        let layerInstance = layerInstanceMap[id];
        layerInstance && layerInstance.update({name: value});
    }

    changeDesc = (value: any) => {
        const {instance} = this.props;
        instance.update({info: {desc: value}}, {reRender: false});
    }

    render() {
        const {instance} = this.props;
        const {type, name, desc} = (instance.getConfig() as AntdBarProps).info!;
        return (
            <div className={'lc-base-info'}>
                <ConfigCard title={'基础信息'}>
                    <ConfigItem title={'名称'}>
                        <UnderLineInput type={'text'} onChange={this.changeName} defaultValue={name}/>
                    </ConfigItem>
                    <ConfigItem title={'类型'}>
                        <div className={'item-value'}>{type}</div>
                    </ConfigItem>
                    <ConfigItem title={'描述'}>
                        <UnderLineInput type={'text'} onChange={this.changeDesc} defaultValue={desc}/>
                    </ConfigItem>
                </ConfigCard>
            </div>
        )
    }
}

export default BaseInfo;