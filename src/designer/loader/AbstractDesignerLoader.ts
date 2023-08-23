import {AbstractCustomComponentDefinition} from "../../framework/core/AbstractCustomComponentDefinition";
import {HeaderItemProps} from "../header/HeaderTypes";
import {AbstractOperator} from "../../framework/operate/AbstractOperator";

export abstract class AbstractDesignerLoader {

    //自定义组件信息映射
    public customComponentInfoMap: Record<string, AbstractCustomComponentDefinition> = {};
    //头部操作菜单实例
    public headerItemInstances: HeaderItemProps[] = [];
    //项目数据操作映射
    public abstractOperatorMap: { [key: string]: AbstractOperator } = {};

    /**
     * 加载设计器
     */
    public load(): void {
        this.scanComponents();
        this.loadProjectData();
    }

    /**
     * 扫描设计器组件
     */
    protected abstract scanComponents(): void;

    /**
     * 加载设计器项目数据
     */
    protected abstract loadProjectData(): void;
}