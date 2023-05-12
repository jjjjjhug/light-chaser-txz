import React, {Component} from 'react';
import Scaler from "../event-operate/Scaler";
import Dragger from "../event-operate/Dragger";

interface DragScaleProviderProps {
    containerWidth?: number;
    containerHeight?: number;
    contentWidth?: number;
    contentHeight?: number;
}

class DragScaleProvider extends Component<DragScaleProviderProps> {

    container: any = null;
    content: any = null;

    componentDidMount() {
        new Scaler(this.container, this.content, this.props.contentWidth || 1920, this.props.contentHeight || 1080, 0.1, 10).registerScaleEvent();
        new Dragger(this.content).registerDragEvent();
    }


    render() {
        const {contentHeight, contentWidth, containerHeight, containerWidth} = this.props;
        return (
            <div ref={ref => this.container = ref}
                 style={{
                     overflow: "hidden",
                     height: containerHeight,
                     width: containerWidth,
                     backgroundColor: '#434343'
                 }}>
                <div ref={ref => this.content = ref}
                     style={{width: contentWidth, height: contentHeight}}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default DragScaleProvider;