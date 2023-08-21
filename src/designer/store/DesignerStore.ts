import {action, makeObservable, observable, runInAction, toJS} from "mobx";
import {cloneDeep, isEqual} from "lodash";
import {
    CanvasConfig,
    extendParams,
    ProjectConfig,
    ProjectDataType,
    ProjectState,
    SaveType,
    Statistic,
    ThemeItemType,
} from "../DesignerType";
import AbstractBaseStore from "../../framework/core/AbstractBaseStore";
import {merge} from "../../utils/ObjectUtil";
import {MovableItemType} from "../../lib/lc-movable/types";
import eventOperateStore from "../operate-provider/EventOperateStore";
import {idGenerate} from "../../utils/IdGenerate";
import AbstractDesignerComponent from "../../framework/core/AbstractDesignerComponent";

/**
 * 设计器核心状态管理类，记录了设计器中的核心数据。包括组件配置，组件布局。 全局设置等。
 */
class DesignerStore implements AbstractBaseStore {
    constructor() {
        makeObservable(this, {
            canvasConfig: observable,
            projectConfig: observable,
            layoutConfigs: observable,
            statisticInfo: observable,
            themeConfig: observable,
            extendParams: observable,
            loaded: observable,
            doInit: action,
            addItem: action,
            delItem: action,
            setLoaded: action,
            updateLayout: action,
            updateThemeConfig: action,
            flashGlobalTheme: action,
            updateCanvasConfig: action,
            updateProjectConfig: action,
            copyItem: action,
        });
    }

    /**
     * 大屏id
     */
    id: string = "";

    loaded: boolean = false;

    /**
     * 画布设置
     */
    canvasConfig: CanvasConfig = {
        rasterize: false, //是否栅格化
        wireframe: false, //是否开启辅助线框
        dragStep: 1, //栅格化拖拽步长
        resizeStep: 1, //栅格化缩放步长
        width: 1920, //画布宽
        height: 1080, //画布高
    };

    /**
     * 项目设置
     */
    projectConfig: ProjectConfig = {
        name: "", //项目名称
        des: "", //项目描述
        state: ProjectState.DRAFT, //项目状态
        createTime: "", //创建时间
        updateTime: "", //更新时间
        saveType: SaveType.LOCAL, //存储类型
    };

    elemConfigs: { [key: string]: any } | null = {};

    /**
     * 画布上组件id与其实例对象的映射
     */
    compInstances: { [key: string]: AbstractDesignerComponent } = {};

    /**
     * 布局配置
     */
    layoutConfigs: { [key: string]: MovableItemType } = {};

    /**
     * 统计信息
     */
    statisticInfo: Statistic = {
        //元素个数
        count: 0,
    };

    /**
     * 主题
     */
    themeConfig: Array<ThemeItemType> | any = [
        {
            id: "0",
            name: "科技风格(默认主题)",
            des: "科技风格(默认主题)",
            colors: {
                main: "#00dfff",
                text: "#62edff",
                background: "rgba(0,223,255,0.2)",
                auxiliary: "#4ca4b1",
                emphasize: "#38929f",
                supplementary: "#1790a2",
            },
        },
    ];

    /**
     * 扩展参数
     */
    extendParams: extendParams = {
        maxLevel: 0,
        minLevel: 0,
    };

    /**
     * 初始化store
     */
    doInit = (store: ProjectDataType) => {
        this.id = store.id ?? this.id;
        this.canvasConfig = store.canvasConfig
            ? {...this.canvasConfig, ...store.canvasConfig}
            : this.canvasConfig;
        this.projectConfig = store.projectConfig
            ? {...this.projectConfig, ...store.projectConfig}
            : this.projectConfig;
        this.elemConfigs = store.elemConfigs
            ? {...this.elemConfigs, ...store.elemConfigs}
            : this.elemConfigs;
        this.layoutConfigs = store.layoutConfigs || this.layoutConfigs;
        this.statisticInfo = store.statisticInfo
            ? {...this.statisticInfo, ...store.statisticInfo}
            : this.statisticInfo;
        this.themeConfig = store.themeConfig || this.themeConfig;
        this.extendParams = store.extendParams
            ? {...this.extendParams, ...store.extendParams}
            : this.extendParams;
    };

    /**
     * 获取store数据
     */
    getData(): ProjectDataType {
        let elemConfigs: { [key: string]: any } = {};
        Object.keys(this.compInstances).forEach((key) => {
            elemConfigs[key] = this.compInstances[key].getConfig();
        });
        return {
            id: this.id,
            canvasConfig: toJS(this.canvasConfig),
            projectConfig: toJS(this.projectConfig),
            elemConfigs: elemConfigs,
            layoutConfigs: toJS(this.layoutConfigs),
            statisticInfo: toJS(this.statisticInfo),
            themeConfig: toJS(this.themeConfig),
            extendParams: toJS(this.extendParams),
        };
    }

    /**
     * 清空store
     */
    doDestroy = () => {
        this.id = "";
        this.canvasConfig = {};
        this.projectConfig = {};
        this.elemConfigs = {};
        this.layoutConfigs = {};
        this.statisticInfo = {};
        this.themeConfig = {};
        this.extendParams = {};
    };

    /**
     * 设置布局id
     */
    setId = (id: string) => {
        runInAction(() => {
            this.id = id;
        });
    };

    setLoaded = (loaded: boolean) => {
        this.loaded = loaded;
    }

    /**
     * 添加元素
     */
    addItem = (item: MovableItemType) => {
        this.layoutConfigs[item.id + ""] = item;
        if (this.statisticInfo)
            this.statisticInfo.count = Object.keys(this.layoutConfigs).length;
    };

    /**
     * 删除元素
     */
    delItem = (ids: string[]) => {
        for (const id of ids) {
            delete this.layoutConfigs[id];
            delete this.compInstances[id];
        }
    };

    /**
     * 更新布局
     */
    updateLayout = (items: MovableItemType[], reRender: boolean = true) => {
        for (const item of items) {
            let oldItem = this.layoutConfigs[item.id + ""];
            if (!isEqual(oldItem, item))
                this.layoutConfigs[item.id + ""] = reRender ? {...merge(oldItem, item)} : merge(oldItem, item);
        }
    };

    updateThemeConfig = (data: any) => {
        this.themeConfig = data;
    };

    flashGlobalTheme = (newTheme: ThemeItemType) => {
        this.compInstances && Object.keys(this.compInstances).forEach((key: string) => {
            let instance = this.compInstances[key];
            if (instance)
                instance.updateTheme(newTheme);
        });
    };

    /**
     * 更新画布设置
     */
    updateCanvasConfig = (data: CanvasConfig) => this.canvasConfig = {...this.canvasConfig, ...data}

    /**
     * 更新项目配置
     */
    updateProjectConfig = (data: ProjectConfig) => {
        this.projectConfig = {...this.projectConfig, ...data};
    };

    copyItem = (ids: string[]) => {
        let newIds: any = [];
        let {maxLevel, setMaxLevel} = eventOperateStore;
        for (const id of ids) {
            //获取被复制元素布局
            const {[id]: layout} = this.layoutConfigs;
            if (layout) {
                //生成新id
                const newId = idGenerate.generateId();
                newIds.push(newId);
                //生成新布局
                const newLayout = cloneDeep(layout);
                newLayout.id = newId;
                const [x = 10, y = 10] = (newLayout.position || []).map((p) => p + 10);
                newLayout.position = [x, y];
                newLayout.order = ++maxLevel;
                this.layoutConfigs[newId] = newLayout;
                //生成新数据
                const copiedInstance = this.compInstances[id];
                let newConfig = cloneDeep(copiedInstance.getConfig());
                newConfig.info.id = newId;
                this.elemConfigs![newId] = newConfig;
            }
        }
        setMaxLevel(maxLevel);
        return newIds;
    };
}

const designerStore = new DesignerStore();

export default designerStore;
export {DesignerStore};
