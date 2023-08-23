import React, {Component, ReactElement, Suspense} from 'react';
import './DesignerHeader.less';
import headerStore from "./HeaderStore";
import {observer} from "mobx-react";
import Loading from "../../lib/loading/Loading";
import EditorDesignerLoader from "../loader/EditorDesignerLoader";

const ProjectHdItemImpl = React.lazy(() => import('./items/project/ProjectHdItemImpl'));
const CanvasHdConfigImpl = React.lazy(() => import('./items/canvas/CanvasHdConfigImpl'));
const ThemeHdItemImpl = React.lazy(() => import('./items/theme/ThemeHdItemImpl'));

class Header extends Component<any> {

    buildHeaderList = (): Array<ReactElement> => {
        let items: Array<ReactElement> = [];
        const {headerItemInstances} = EditorDesignerLoader.getInstance();
        for (let i = 0; i < headerItemInstances.length; i++) {
            const {icon: Icon, name, onClick} = headerItemInstances[i];
            items.push(
                <div key={i + ''} className={'right-item'} onClick={onClick}>
                    <span className={'item-span'}><Icon/>&nbsp;{name}</span>
                </div>
            );
        }
        return items;
    }

    render() {
        const {canvasVisible, projectVisible, themeVisible} = headerStore;
        const items = this.buildHeaderList();
        return (
            <div className={'designer-header'}>
                <div className={'header-left'}>
                    <div className={'header-title'}>L C</div>
                </div>
                <div className={'header-right'}>
                    {items}
                </div>
                {/*todo 想办法让这两个组件不要在这里写死*/}
                {canvasVisible && <Suspense fallback={<Loading/>}><CanvasHdConfigImpl/></Suspense>}
                {projectVisible && <Suspense fallback={<Loading/>}><ProjectHdItemImpl/></Suspense>}
                {themeVisible && <Suspense fallback={<Loading/>}><ThemeHdItemImpl/></Suspense>}
            </div>
        );
    }
}

export default observer(Header);
