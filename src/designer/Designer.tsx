import React, {Component} from 'react';
import LcHeader from "./structure/LcHeader";
import LcBody from "./structure/LcBody";
import LcLeft from "./structure/LcLeft";
import LcContent from "./structure/LcContent";
import LcRight from "./structure/LcRight";
import LcStructure from "./structure/LcStructure";
import LcFoot from "./structure/LcFoot";
import DesignerLeft from "./left";
import Right from "./right";
import Footer from "./footer/Footer";
import FloatConfigs from "./float-configs/FloatConfigs";
import contextMenuStore from "./operate-provider/right-click-menu/ContextMenuStore";
import eventOperateStore from "./operate-provider/EventOperateStore";
import eventManager from "./operate-provider/core/EventManager";
import {KMMap} from "./operate-provider/hot-key/KeyboardMouse";
import EditorDesignerLoader from "./loader/EditorDesignerLoader";
import designerStore from "./store/DesignerStore";
import Loading from "../lib/loading/Loading";
import DesignerHeader from "./header/DesignerHeader";
import DesignerCanvas from "./canvas/DesignerCanvas";
import {observer} from "mobx-react";

class Designer extends Component {

    constructor(props: any) {
        super(props);
        //加载设计器
        EditorDesignerLoader.getInstance().load();
    }

    componentDidMount() {
        //加载事件到事件管理器
        registerEventToManager();
        //绑定事件到dom元素
        bindEventToDom();
    }

    componentWillUnmount() {
        //卸载事件管理器中的事件
        unRegisterEventToManager();
        //卸载dom元素上的事件
        unbindEventToDom();
    }

    render() {
        const {loaded} = designerStore;
        if (!loaded)
            return <Loading/>;
        return (
            <LcStructure>
                <LcHeader>
                    <DesignerHeader/>
                </LcHeader>
                <LcBody>
                    <LcLeft><DesignerLeft/></LcLeft>
                    <LcContent><DesignerCanvas/></LcContent>
                    <LcRight><Right/></LcRight>
                </LcBody>
                <LcFoot>
                    <Footer/>
                </LcFoot>
                <FloatConfigs/>
            </LcStructure>
        );
    }
}

export default observer(Designer);

/**
 * 注册事件到事件管理器
 */
function registerEventToManager() {
    eventManager.register('click', clickHandler);
    eventManager.register('contextmenu', contextMenuHandler);
    eventManager.register('pointerdown', pointerDownHandler);
    eventManager.register('pointerup', pointerUpHandler);
}

/**
 * 卸载事件管理器中的事件
 */
function unRegisterEventToManager() {
    eventManager.unregister('click', clickHandler);
    eventManager.unregister('contextmenu', contextMenuHandler);
    eventManager.unregister('pointerdown', pointerDownHandler);
    eventManager.unregister('pointerup', pointerUpHandler);
}

/**
 * 绑定事件到dom元素
 */
function bindEventToDom() {
    document.addEventListener("click", clickEmit);
    document.addEventListener("contextmenu", contextMenuEmit);
    document.addEventListener("pointerdown", pointerDownEmit);
    document.addEventListener("pointermove", pointerMoveEmit);
    document.addEventListener("pointerup", pointerUpEmit);
}

/**
 * 卸载dom元素上的事件
 */
function unbindEventToDom() {
    document.removeEventListener("click", clickEmit);
    document.removeEventListener("contextmenu", contextMenuEmit);
    document.removeEventListener("pointerdown", pointerDownEmit);
    document.removeEventListener("pointermove", pointerMoveEmit);
    document.removeEventListener("pointerup", pointerUpEmit);
}

/*****************事件分发*****************/
const clickEmit = (event: any) => eventManager.emit('click', event);
const contextMenuEmit = (event: any) => eventManager.emit('contextmenu', event);
const pointerDownEmit = (event: any) => eventManager.emit('pointerdown', event);
const pointerMoveEmit = (event: any) => eventManager.emit('pointermove', event);
const pointerUpEmit = (event: any) => eventManager.emit('pointerup', event);


/*****************事件处理*****************/
const clickHandler = (event: any) => {
    const {visible, updateVisible} = contextMenuStore;
    if (visible && event.button === 0) {
        //这里添加异步处理的原因：必须要在操作菜单执行点击事件执行之后才能卸载dom元素，不然操作菜单的点击事件会失效。
        setTimeout(() => {
            updateVisible(false);
        });
    }
}

const contextMenuHandler = (event: any) => {
    event.preventDefault();
    const {mouseDownTime, mouseUpTime, setPosition, updateVisible} = contextMenuStore;
    const {setUnLockedId} = eventOperateStore;
    let targetArr = ['lc-comp-item', 'moveable-area'];
    if (targetArr.some((item: string) => event.target.classList.contains(item)) && mouseUpTime - mouseDownTime < 200) {
        updateVisible && updateVisible(true);
        setPosition([event.clientX, event.clientY]);
        setUnLockedId(event.target.id);
    } else {
        updateVisible && updateVisible(false);
    }
}

const pointerDownHandler = (event: any) => {
    if (event.button === 0) {
        KMMap.leftClick = true;
    } else if (event.button === 2)
        KMMap.rightClick = true;
    const {setMouseDownTime} = contextMenuStore;
    setMouseDownTime(Date.now());
}

const pointerUpHandler = (event: any) => {
    if (event.button === 0)
        KMMap.leftClick = false;
    else if (event.button === 2)
        KMMap.rightClick = false;
    const {setMouseUpTime} = contextMenuStore;
    setMouseUpTime(Date.now());
    const {setPointerTarget} = eventOperateStore;
    setPointerTarget(event.target);
}