/*
 * @Description: 
 * @Author: tanxiangze
 * @Date: 2023-08-18 17:15:02
 * @LastEditTime: 2023-08-18 17:29:52
 */
import React, {Component} from 'react';
import {ComponentBaseProps} from "../../common-component/common-types";

export interface BaseTextComponentStyle {
    border?: string
    borderRadius?: number,
    borderStyle?: string,
    borderWidth?: number,
    borderColor?: string,
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