# react-button

## Introduction

`react-button` is a [React](https://reactjs.org/) functional component that creates a button which can be styled and interacted with like a normal button.
It features the normal keyboard and mouse interactability that an HTML button does, but also allows for a value to be return through an `onSubmit` callback.

## Installation

To install run the following command:

```shell
npm install @noxy/react-button@latest
```

Typescript types are already available in the library so no need to get external types.

## Usage

The following is an example of how to use the component:

```typescript jsx
import {Button} from "@noxy/react-button";
import React, {HTMLProps} from "react";

function TestComponent(props: HTMLProps<HTMLDivElement>) {
  const value = {hello: "world"}
  
  return (
    <Button onSubmit={onButtonSubmit} value={value}>
      Click me!
    </Button>
  );
  
  function onButtonSubmit() {
    // Prints '{hello: "world"}'
    console.log(value);
  }
}

```

## Properties

The `DialogInstance` component inherits all HTMLDivElement properties and applies them directly to the outermost element.
This includes the className property for those using CSS modules.

### value: V (any)

The value that will be returned when the onSubmit event is fired.

**Default value**: `undefined`

### onSubmit: callback(value: V): void

An event handler fired when the button is pressed or the button is interacted with by pressing enter or space.
The callback receives the value given to the button.

**Default value**: `undefined`
