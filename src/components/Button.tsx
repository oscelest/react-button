import React, {CSSProperties, ReactNode, useState} from "react";
import Style from "./Button.module.css";

function Button<T>(props: ButtonProps<T>) {
  const [key_down, setKeyDown] = useState<boolean>(false);
  const [mouse_down, setMouseDown] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);
  const [focus, setFocus] = useState<boolean>(false);
  const {className, value, disabled, tabIndex, children, icon, onClick, ...component_props} = props;

  const classes = [Style.Component, "button"];
  if (className) classes.push(className);
  
  const icon_style = icon ? {"--icon": `"${icon}"`} as CSSProperties : undefined;
  const active = key_down || mouse_down;
  const tab_index = !disabled ? tabIndex : undefined;

  return (
    <div {...component_props} className={classes.join(" ")} tabIndex={tab_index} data-active={active} data-hover={hover} data-focus={focus} data-disabled={disabled}
         onClick={onButtonClick} onMouseEnter={onButtonMouseEnter} onMouseLeave={onButtonMouseLeave} onMouseDown={onButtonMouseDown} onMouseUp={onButtonMouseUp}
         onFocus={onButtonFocus} onBlur={onButtonBlur} onKeyDown={onButtonKeyDown} onKeyUp={onButtonKeyUp}>
      {!!icon_style && <div className={"button-icon"} style={icon_style}></div>}
      <div className={"button-content"}>{children}</div>
    </div>
  );

  function onButtonClick(event: React.MouseEvent<HTMLDivElement>) {
    if (event.defaultPrevented || disabled) return;
    onClick?.(event, value);
  }

  function onButtonFocus(event: React.FocusEvent<HTMLDivElement>) {
    if (event.defaultPrevented || disabled) return;
    setFocus(true);
  }

  function onButtonBlur(event: React.FocusEvent<HTMLDivElement>) {
    if (event.defaultPrevented || disabled) return;
    setFocus(false);
  }

  function onButtonMouseEnter(event: React.MouseEvent<HTMLDivElement>) {
    if (event.defaultPrevented || disabled) return;
    setHover(true);
  }

  function onButtonMouseLeave(event: React.MouseEvent<HTMLDivElement>) {
    if (event.defaultPrevented || disabled) return;
    setHover(false);
  }

  function onButtonMouseDown(event: React.MouseEvent<HTMLDivElement>) {
    if (event.defaultPrevented || disabled) return;
    setMouseDown(true);
    props.onMouseDown?.(event);
  }

  function onButtonMouseUp(event: React.MouseEvent<HTMLDivElement>) {
    if (event.defaultPrevented || disabled) return;
    setMouseDown(false);
    props.onMouseUp?.(event);
  }

  function onButtonKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.defaultPrevented || disabled) return;
    if (event.code === "Enter" || event.code === "NumpadEnter" || event.code === "Space") setKeyDown(true);
    props.onKeyDown?.(event);
  }

  function onButtonKeyUp(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.defaultPrevented || disabled) return;
    if (event.code === "Enter" || event.code === "NumpadEnter" || event.code === "Space") setKeyDown(false);
    props.onKeyUp?.(event);
  }
}

export interface ButtonProps<T> extends Omit<React.HTMLProps<HTMLDivElement>, "onClick" | "value"> {
  value?: T;
  icon?: string;
  disabled?: boolean;

  children?: ReactNode;

  onClick?: (event: React.MouseEvent<HTMLDivElement>, value?: T) => void;
}


export default Button;
