import React, {Component} from 'react';
import {ComponentBaseProps} from "../../common-component/common-types";

export interface BaseTextComponentStyle {
    color?: string;
    fontSize?: number;
    fontWeight?: string;
    alignItems?: string;
    justifyContent?: string;
    backgroundImage?: string;
    WebkitBackgroundClip?: string
    WebkitTextFillColor?: string
}

export interface BaseTextComponentProps extends ComponentBaseProps {
    style?: BaseTextComponentStyle;
}

class BaseTextComponent extends Component<BaseTextComponentProps, BaseTextComponentProps> {

    constructor(props: BaseTextComponentProps) {
        super(props);
        this.state = {...props};
    }

    render() {
        const {style, data} = this.state;
        return (
            <div style={{...{height: '100%', display: 'flex'}, ...style}}>
                {data?.staticData?.data}
            </div>
        );
    }
}

export default BaseTextComponent;