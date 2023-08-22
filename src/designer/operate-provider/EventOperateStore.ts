import {action, makeObservable, observable} from "mobx";
import layerListStore from "../float-configs/layer-list/LayerListStore";
import LayerComponent from "../float-configs/layer-list/LayerComponent";
import Moveable from "react-moveable";
import {RefObject} from "react";
import designerStore from "../store/DesignerStore";
import {MovableItemType} from "../../lib/lc-movable/types";
import {merge} from "../../utils/ObjectUtil";

/**
 * 组件多选情况下的坐标值
 */
export interface GroupCoordinateType {
    /**
     * 最小X坐标
     */
    minX?: number;
    /**
     * 最小Y坐标
     */
    minY?: number;
    /**
     * 最大X坐标
     */
    maxX?: number;
    /**
     * 最大Y坐标
     */
    maxY?: number;
    /**
     * 组合框的宽度
     */
    groupWidth?: number;
    /**
     * 组合框的高度
     */
    groupHeight?: number;
}


/**
 * 设计器画布及元素操作控制store，用于协调缩放、拖拽、选择，右键操作菜单操作之间的数据传递
 * Designer canvas and element operation control store, used to coordinate data transmission between zoom, drag, selection, right-click operation menu operation
 */
class EventOperateStore {
    constructor() {
        makeObservable(this, {
            targets: observable,
            targetIds: observable,
            setTargets: action,
            setTargetIds: action,
        })
    }

    /**
     * 拖拽框架实例引用
     * Drag and drop framework instance reference
     */
    movableRef: RefObject<Moveable> | null = null;
    /**
     * 选择器框架实例引用
     * Selector framework instance reference
     */
    selectorRef: any = null;
    /**
     * 被框选中的目标元素，用于框选后移动、缩放操作
     * The target element selected by the frame, used for moving and scaling operations after the frame is selected
     */
    targets: any[] = [];
    /**
     * 被框选中的目标元素ID，用于框选后右键操作菜单的继续操作
     * The ID of the target element selected by the frame, used for the subsequent operation of the right-click operation menu after the frame is selected
     */
    targetIds: string[] = [];
    /**
     * 由于是右键触发系统菜单的时候记录该ID。 因此需要有单独的变量来存放，避免和选择元素框架记录的ID进行相互覆盖。
     * Because the ID is recorded when the right mouse button triggers the system menu. Therefore, a separate variable is needed to store it to avoid mutual coverage with the ID recorded by the selected element framework.
     */
    unLockedId: string = '';
    /**
     * 拖拽框架的最大层级，用于操作菜单的置顶操作
     * The maximum level of the drag and drop framework, used for the top operation of the operation menu
     */
    maxLevel = 0;
    /**
     * 拖拽框架的最小层级，用于操作菜单的置底操作
     * The minimum level of the drag and drop framework, used for the bottom operation of the operation menu
     */
    minLevel = 0;

    /**
     * 用于记录鼠标右键点击时的目标元素，用于快捷键操作时的目标元素的范围筛选
     */
    pointerTarget: any = null;

    /**
     * 组合框选时的坐标信息
     */
    groupCoordinate: GroupCoordinateType = {
        minX: Infinity,
        minY: Infinity,
        maxX: -Infinity,
        maxY: -Infinity
    };

    setMaxLevel = (order: number) => this.maxLevel = order;

    setMinLevel = (order: number) => this.minLevel = order;

    setUnLockedId = (id: string) => this.unLockedId = id;

    setMovableRef = (ref: any) => this.movableRef = ref;

    setSelectorRef = (ref: any) => this.selectorRef = ref;

    setTargets = (targets: any[]) => this.targets = targets;

    setTargetIds = (targetIds: string[]) => {
        //清除之前的选中
        const {layerInstanceMap} = layerListStore;
        this.targetIds.length > 0 && this.targetIds.forEach(id => {
            const instance: LayerComponent = layerInstanceMap[id];
            if (!!instance)
                instance.update({selected: false});
        });
        //设置本次选中的组件id
        this.targetIds = targetIds;
        //若显示了图层,则更新图层中被选中的组件
        if (!!layerInstanceMap) {
            targetIds.forEach(id => {
                const instance: LayerComponent = layerInstanceMap[id];
                if (!!instance)
                    instance.update({selected: true});
            });
        }
    };

    setPointerTarget = (target: any) => this.pointerTarget = target;

    setGroupCoordinate = (coordinate: GroupCoordinateType) => {
        this.groupCoordinate = merge(this.groupCoordinate, coordinate);
    }

    /**
     * 计算组件多选时的左上角坐标
     * @param compArr
     */
    calculateGroupCoordinate = (compArr: any[]) => {
        const {layoutConfigs} = designerStore;
        let groupCoordinate: GroupCoordinateType = {
            minX: Infinity,
            minY: Infinity,
            maxX: -Infinity,
            maxY: -Infinity
        };
        compArr.forEach((item: any) => {
            const layoutConfig: MovableItemType = layoutConfigs[item.id];
            let {position, width, height} = layoutConfig;
            const x = position![0];
            const y = position![1];
            if (x < groupCoordinate.minX!)
                groupCoordinate.minX = x;
            if (y < groupCoordinate.minY!)
                groupCoordinate.minY = y;
            if ((x + width!) > groupCoordinate.maxX!)
                groupCoordinate.maxX = x + width!;
            if ((y + height!) > groupCoordinate.maxY!)
                groupCoordinate.maxY = y + height!;
        });
        groupCoordinate.groupWidth = groupCoordinate.maxX! - groupCoordinate.minX!;
        groupCoordinate.groupHeight = groupCoordinate.maxY! - groupCoordinate.minY!;
        this.setGroupCoordinate(groupCoordinate);
    }

}

const eventOperateStore = new EventOperateStore();
export default eventOperateStore;