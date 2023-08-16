import React from "react";
import {AbstractCustomComponentDefinition} from "../../../framework/core/AbstractCustomComponentDefinition";
import {MenuInfo} from "../../../designer/right/MenuType";
import {getDefaultMenuList} from "../../../designer/right/util";
import {BaseMenuMapping, ClazzTemplate} from "../../common-component/common-types";
import AntdCommonRose, {AntdRoseProps} from "./AntdCommonRose";

const AnimationConfig = React.lazy(() => import("../../common-component/animation-config/AnimationConfig"));
const AntdRoseCommonStyleConfig = React.lazy(() => import("./AntdRoseCommonConfig").then((module) => ({default: module.AntdRoseCommonStyleConfig})));
const ThemeConfig = React.lazy(() => import("../../common-component/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../common-component/base-info/BaseInfo"));
const DataConfig = React.lazy(() => import("../../common-component/data-config/DataConfig"));

abstract class AbstractRoseDefinition extends AbstractCustomComponentDefinition<AntdCommonRose, BaseMenuMapping, AntdRoseProps> {

    getComponent(): ClazzTemplate<AntdCommonRose> | null {
        return AntdCommonRose;
    }

    getMenuList(): Array<MenuInfo> {
        return getDefaultMenuList();
    }

    getMenuToConfigContentMap(): BaseMenuMapping | null {
        return {
            info: BaseInfo,
            data: DataConfig,
            style: AntdRoseCommonStyleConfig,
            animation: AnimationConfig,
            theme: ThemeConfig
        };
    }
}

export default AbstractRoseDefinition;
