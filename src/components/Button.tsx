import React, {DetailedHTMLProps, HTMLAttributes, useState} from "react";
import Style from "./Button.module.css";

export function Button<T>(props: ButtonProps<T>) {
  const {className, value, disabled = false, tabIndex, children, style, ...component_method_props} = props;
  const {onSubmit, onFocus, onBlur, onMouseEnter, onMouseLeave, onMouseDown, onMouseUp, onKeyDown, onKeyUp, ...component_props} = component_method_props;
  
  // State values to keep track of component state
  const [key_down, setKeyDown] = useState<string>();
  const [mouse_down, setMouseDown] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);
  const [focus, setFocus] = useState<boolean>(false);
  
  // Attribute resolution
  const active = key_down || mouse_down;
  const tab_index = !disabled ? Math.max(0, +(tabIndex ?? 0)) : undefined;
  
  // HTML prop initialization
  const classes = [Style.Component, "button"];
  if (className) classes.push(className);
  
  return (
    <div {...component_props} className={classes.join(" ")} tabIndex={tab_index} data-active={active} data-hover={hover} data-focus={focus} data-disabled={disabled}
         onMouseEnter={onComponentMouseEnter} onMouseLeave={onComponentMouseLeave} onFocus={onComponentFocus} onBlur={onComponentBlur}
         onMouseDown={onComponentMouseDown} onMouseUp={onComponentMouseUp} onKeyDown={onComponentKeyDown} onKeyUp={onComponentKeyUp}>
      {children}
    </div>
  );
  
  function handleEvent<E extends React.SyntheticEvent>(disabled: boolean, event: E, handler?: React.EventHandler<E>) {
    if (disabled) {
      event.preventDefault();
      return false;
    }
    
    handler?.(event);
    return !event.defaultPrevented;
  }
  
  function onComponentFocus(event: React.FocusEvent<HTMLDivElement>) {
    if (handleEvent(disabled, event, onFocus)) {
      setFocus(true);
    }
  }
  
  function onComponentBlur(event: React.FocusEvent<HTMLDivElement>) {
    if (handleEvent(disabled, event, onBlur)) {
      setFocus(false);
    }
  }
  
  function onComponentMouseEnter(event: React.MouseEvent<HTMLDivElement>) {
    if (handleEvent(disabled, event, onMouseEnter)) {
      setHover(true);
    }
  }
  
  function onComponentMouseLeave(event: React.MouseEvent<HTMLDivElement>) {
    if (handleEvent(disabled, event, onMouseLeave)) {
      setHover(false);
    }
  }
  
  function onComponentMouseDown(event: React.MouseEvent<HTMLDivElement>) {
    if (handleEvent(disabled, event, onMouseDown) && event.button === 0) {
      setMouseDown(true);
    }
  }
  
  function onComponentMouseUp(event: React.MouseEvent<HTMLDivElement>) {
    if (handleEvent(disabled, event, onMouseDown) && mouse_down && event.button === 0) {
      setMouseDown(false);
      onSubmit?.(value);
    }
  }
  
  function onComponentKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (handleEvent(disabled, event, onKeyDown) && (event.code === "Enter" || event.code === "NumpadEnter" || event.code === "Space")) {
      setKeyDown(event.code);
    }
  }
  
  function onComponentKeyUp(event: React.KeyboardEvent<HTMLDivElement>) {
    if (!handleEvent(disabled, event, onKeyUp) && event.code === key_down) {
      setKeyDown(undefined);
      onSubmit?.(value);
    }
  }
}

type HTMLComponentProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export interface ButtonProps<T> extends Omit<HTMLComponentProps, "onSubmit" | "value"> {
  value?: T;
  disabled?: boolean;
  
  onSubmit?: (value?: T) => void;
}
