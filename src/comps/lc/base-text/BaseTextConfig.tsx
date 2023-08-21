/*
 * @Description:
 * @Author: tanxiangze
 * @Date: 2023-08-18 15:09:16
 * @LastEditTime: 2023-08-21 09:42:31
 */
import React from "react";
import { ConfigType } from "../../../designer/right/ConfigType";
import UnderLineInput from "../../../lib/lc-input/UnderLineInput";
import {
  BaseTextComponentProps,
} from "./BaseTextComponent";
import ConfigItem from "../../../lib/lc-config-item/ConfigItem";
import { BaseText } from "./BaseText";
import ColorMode from "../../../lib/lc-color-mode/ColorMode";
import Select from "../../../lib/lc-select/Select";

export const BaseTextStyleConfig: React.FC<ConfigType> = ({ instance }) => {
  const textStyle = (instance as BaseText).getConfig()?.style;
  const config = instance.getConfig() as BaseTextComponentProps;

  const defaultFontSize = textStyle?.fontSize || 32;

  const buildColorModeData = (): any => {
    let mode = "single",
      value = config.style?.color;
    if (config.style?.WebkitBackgroundClip === "text") {
      return {
        mode: "gradient",
        value: config.style?.backgroundImage
          ?.replace("linear-gradient(to right, ", "")
          .replace(")", "")
          .split(","),
      };
    }
    return { mode, value };
  };

  const areaColorChange = (e: any) => {
    if (e.mode === "single") {
      instance.update({
        style: {
          color: e.value,
          WebkitBackgroundClip: "",
          WebkitTextFillColor: "",
          backgroundImage: "",
        },
      });
    } else if (e.mode === "gradient") {
      const color = e.value as string[];
      instance.update({
        style: {
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundImage: `linear-gradient(to right, ${color.join(",")}`,
        },
      });
    }
  };

  return (
    <>
      <ConfigItem
        title={"颜色"}
        itemStyle={{ width: "100%" }}
        contentStyle={{ width: "82%" }}
      >
        <ColorMode
          onChange={areaColorChange}
          exclude={["multi"]}
          data={buildColorModeData()}
        />
      </ConfigItem>
      {/* <ConfigItem
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
  </ConfigItem> */}
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
      <ConfigItem
        title={"字体宽度"}
        itemStyle={{ width: "100%" }}
        contentStyle={{ width: "70%" }}
      >
        <Select
          options={[
            { label: "正常", value: "normal" },
            { label: "粗体", value: "bold" },
          ]}
          onChange={(e) => {
            instance.update({
              style: { fontWeight: e },
            });
          }}
          defaultValue={"normal"}
        />
      </ConfigItem>
    </>
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
