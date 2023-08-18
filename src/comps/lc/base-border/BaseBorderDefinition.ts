/*
 * @Description: 基础边框
 * @Author: tanxiangze
 * @Date: 2023-08-18 17:15:02
 * @LastEditTime: 2023-08-18 18:03:25
 */
import {AbstractCustomComponentDefinition} from "../../../framework/core/AbstractCustomComponentDefinition";
import {BaseInfoType} from "../../../designer/DesignerType";
import {BaseMenuMapping, ClazzTemplate} from "../../common-component/common-types";
import {MenuInfo} from "../../../designer/right/MenuType";
import baseBorderImg from './base-border.png';
import {getDefaultMenuList} from "../../../designer/right/util";
import {BaseText} from "./BaseBorder";
import {BaseTextComponentProps} from "./BaseBorderComponent";
import BaseInfo from "../../common-component/base-info/BaseInfo";
import AnimationConfig from "../../common-component/animation-config/AnimationConfig";
import ThemeConfig from "../../common-component/theme-config/ThemeConfig";
import {BaseTextDataConfig, BaseTextStyleConfig} from "./BaseBorderConfig";

export default class BaseTextDefinition extends AbstractCustomComponentDefinition<BaseText, BaseMenuMapping, BaseTextComponentProps> {
    getBaseInfo(): BaseInfoType {
        return {
            compName: "基础边框",
            compKey: "LcBaseBorder",
            type: "基础",
            typeKey: "base",
            desc: "标准提供的基础边框",
        };
    }

    getChartImg(): string | null {
        return baseBorderImg;
    }

    getComponent(): ClazzTemplate<BaseText> | null {
        return BaseText;
    }

    getInitConfig(): BaseTextComponentProps {
        return {
            info: {
                id: "",
                name: '基础边框',
                type: 'LcBaseText',
                desc: '标准提供的基础边框',
            },
            style: {
                borderRadius: 4,
                borderStyle: 'solid',
                borderWidth: 1,
                borderColor: '#fff',
            },
        };
    }

    getMenuList(): Array<MenuInfo> | null {
        return getDefaultMenuList().filter((item: MenuInfo) => item.key !== 'theme' && item.key !== 'animation' && item.key !== 'data');
    }

    getMenuToConfigContentMap(): BaseMenuMapping | null {
        return {
            info: BaseInfo,
            data: BaseTextDataConfig,
            style: BaseTextStyleConfig,
            animation: AnimationConfig,
            theme: ThemeConfig
        };
    }
}