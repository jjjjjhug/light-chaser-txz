/*
 * @Description:
 * @Author: tanxiangze
 * @Date: 2023-08-18 15:09:16
 * @LastEditTime: 2023-08-18 18:07:58
 */
import React from "react";
import { ConfigType } from "../../../designer/right/ConfigType";
import UnderLineInput from "../../../lib/lc-input/UnderLineInput";
import { BaseTextComponentProps } from "./BaseBorderComponent";
import ConfigItem from "../../../lib/lc-config-item/ConfigItem";
import Select from "../../../lib/lc-select/Select";
import ColorMode from "../../../lib/lc-color-mode/ColorMode";
import BaseColorPicker from "../../../lib/lc-color-picker/BaseColorPicker";
import CfgItemBorder from "../../../lib/lc-config-item/CfgItemBorder";
import ConfigCard from "../../../lib/lc-config-card/ConfigCard";

export const BaseTextStyleConfig: React.FC<ConfigType> = ({ instance }) => {
  let config = instance.getConfig() as BaseTextComponentProps;

  return (
    <ConfigCard title={"边框样式"}>
      <ConfigItem title={"颜色"}>
        <CfgItemBorder width={"80%"}>
          <BaseColorPicker
            defaultValue={config?.style?.borderColor || "#fff"}
            onChange={(value) => {
              instance.update({
                style: { borderColor: value },
              });
            }}
            style={{ width: "100%", height: "15px", borderRadius: 2 }}
            showText={true}
          />
        </CfgItemBorder>
      </ConfigItem>
      <ConfigItem title={"样式"}>
        <Select
          defaultValue={config?.style?.borderStyle || "solid"}
          onChange={(value) => {
            instance.update({
              style: { borderStyle: value },
            });
          }}
          options={[
            { value: "dotted", label: "点状" },
            { value: "dashed", label: "虚线" },
            { value: "solid", label: "实线" },
            { value: "double", label: "双线" },
            { value: "groove", label: "凹槽" },
            { value: "ridge", label: "垄状" },
            { value: "inset", label: "inset" },
            { value: "outset", label: "outset" },
          ]}
        />
      </ConfigItem>
      <ConfigItem title={"粗细"}>
        <UnderLineInput
          type={"number"}
          min={1}
          defaultValue={config?.style?.borderWidth || 1}
          onChange={(e) => {
            instance.update({
              style: { borderWidth: parseFloat(e.target.value) },
            });
          }}
        />
      </ConfigItem>
      <ConfigItem title={"圆角"}>
        <UnderLineInput
          type={"number"}
          min={0}
          defaultValue={config?.style?.borderRadius || 0}
          onChange={(e) => {
            instance.update({
              style: { borderRadius: parseFloat(e.target.value) },
            });
          }}
        />
      </ConfigItem>
    </ConfigCard>
  );
};

export const BaseTextDataConfig: React.FC<ConfigType> = ({ instance }) => {
  return <></>;
};
