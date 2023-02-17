import React, {DetailedHTMLProps, HTMLAttributes, useRef, useState} from "react";
import Style from "./Button.module.css";

export function Button<T>(props: ButtonProps<T>) {
  const {className, value, disabled = false, tabIndex, children, style, ...component_method_props} = props;
  const {onSubmit, onFocus, onBlur, onKeyDown, onKeyUp, onMouseEnter, onMouseLeave, onMouseDown, ...component_props} = component_method_props;
  
  // State values to keep track of component state
  const [stateKeyDown, setKeyDown] = useState<string>();
  const [stateMouseDown, setMouseDown] = useState<boolean>(false);
  const [stateHover, setHover] = useState<boolean>(false);
  const [stateFocus, setFocus] = useState<boolean>(false);
  
  // Value ref
  const refHover = useRef<boolean>(stateHover);
  refHover.current = stateHover;
  
  const refMouseDown = useRef<boolean>(stateMouseDown);
  refMouseDown.current = stateMouseDown;
  
  // Attribute resolution
  const active = stateKeyDown || stateMouseDown;
  const tab_index = !disabled ? Math.max(0, +(tabIndex ?? 0)) : undefined;
  
  // HTML prop initialization
  const classes = [Style.Component, "button"];
  if (className) classes.push(className);
  
  return (
    <div {...component_props} className={classes.join(" ")} tabIndex={tab_index} data-active={active} data-hover={stateHover} data-focus={stateFocus} data-disabled={disabled}
         onFocus={onComponentFocus} onBlur={onComponentBlur} onKeyDown={onComponentKeyDown} onKeyUp={onComponentKeyUp}
         onMouseEnter={onComponentMouseEnter} onMouseLeave={onComponentMouseLeave} onMouseDown={onComponentMouseDown}>
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
      window.addEventListener("mouseup", onWindowMouseUp);
    }
  }
  
  function onWindowMouseUp(event: MouseEvent) {
    if (refMouseDown.current && refHover.current && event.button === 0) {
      onSubmit?.(value, event);
    }
    setMouseDown(false);
    window.removeEventListener("mouseup", onWindowMouseUp);
  }
  
  function onComponentKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (handleEvent(disabled, event, onKeyDown) && (event.code === "Enter" || event.code === "NumpadEnter" || event.code === "Space")) {
      setKeyDown(event.code);
    }
  }
  
  function onComponentKeyUp(event: React.KeyboardEvent<HTMLDivElement>) {
    if (handleEvent(disabled, event, onKeyUp) && event.code === stateKeyDown) {
      setKeyDown(undefined);
      onSubmit?.(value, event);
    }
  }
}

type HTMLComponentProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export interface ButtonProps<T> extends Omit<HTMLComponentProps, "onSubmit" | "value"> {
  value?: T;
  disabled?: boolean;
  
  onSubmit?: (value: T | undefined, event: MouseEvent | React.SyntheticEvent) => void;
}
