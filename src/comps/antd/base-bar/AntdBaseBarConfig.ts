import {AbstractConfig} from "../../../framework/abstract/AbstractConfig";
import {getDefaultMenuList} from "../../../designer/right/util";
import {ClassType} from "react";
import BaseInfo from "../../../lib/common-fragment/base-info/BaseInfo";
import {MenuInfo} from "../../../framework/types/MenuType";
import AntdBaseBarConfigStyle from "./AntdBaseBarConfigStyle";
import AntdBaseBarConfigAnimation from "./AntdBaseBarConfigAnimation";
import AntdBaseBarConfigTheme from "./AntdBaseBarConfigTheme";
import DataConfig from "../../../lib/common-fragment/data-config/DataConfig";

export default class AntdBaseBarConfig extends AbstractConfig {
    getMenuList(): Array<MenuInfo> {
        return getDefaultMenuList();
    }

    getMenuToConfigContentMap(): { [key: string]: ClassType<any, any, any> } {
        return {
            'info': BaseInfo,
            'style': AntdBaseBarConfigStyle,
            'data': DataConfig,
            'animation': AntdBaseBarConfigAnimation,
            'theme': AntdBaseBarConfigTheme
        };
    }
}