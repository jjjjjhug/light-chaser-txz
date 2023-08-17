import React from "react";
import { ConfigType } from "../../../designer/right/ConfigType";
import UnderLineInput from "../../../lib/lc-input/UnderLineInput";
import { BaseTextComponentProps } from "./BaseTextComponent";
import ConfigItem from "../../../lib/lc-config-item/ConfigItem";
import Accordion from "../../../lib/lc-accordion/Accordion";
import BaseColorPicker from "../../../lib/lc-color-picker/BaseColorPicker";

export const BaseTextStyleConfig: React.FC<ConfigType> = ({ instance }) => {
  let config = instance.getConfig() as BaseTextComponentProps;
  let defaultColor = config.style?.color;
  let defaultFontSize = config.style?.fontSize;

  return (
    <Accordion title={"文本配置"}>
      <ConfigItem
        title={"颜色"}
        itemStyle={{ width: "100%" }}
        contentStyle={{ width: "85%" }}
      >
        <BaseColorPicker
          onChange={(e) => {
            instance.update({ style: { color: e } });
          }}
          showText={true}
          style={{ width: "100%", borderRadius: 2 }}
          defaultValue={defaultColor}
        />
      </ConfigItem>
      <ConfigItem
        title={"字体大小"}
        itemStyle={{ width: "100%" }}
        contentStyle={{ width: "70%" }}
      >
        <UnderLineInput
          type={"number"}
          min={1}
          onChange={(e) => {
            instance.update({
              style: { fontSize: parseFloat(e.target.value) },
            });
          }}
          defaultValue={defaultFontSize}
        />
      </ConfigItem>
    </Accordion>
  );
};

export const BaseTextDataConfig: React.FC<ConfigType> = ({ instance }) => {
  let config = instance.getConfig() as BaseTextComponentProps;
  let text = config.data?.staticData?.data;
  return (
    <ConfigItem title={"文本内容"} contentStyle={{ width: "80%" }}>
      <UnderLineInput
        type={"text"}
        defaultValue={text}
        onChange={(e) => {
          instance.update({ data: { staticData: { data: e.target.value } } });
        }}
      />
    </ConfigItem>
  );
};
