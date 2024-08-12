# vue-d3-axis

Vue-based Axis component for D3

## What is this?

D3v4's modular structure means you can pull in things like the scaling or colour logic, and leave out DOM functionality if you're using D3 in an environment that 'owns' the DOM -- such as Vue.

This is a fork for Vue 3 from [vue-d3-axis](https://github.com/seevee/vue-d3-axis), which itself was a port of the [react-d3-axis](https://github.com/shauns/react-d3-axis). All three projects are wrappers around [d3-axis](https://github.com/d3/d3-axis) into a Vue or React component and helper functions.

## Examples

```js
import {Axis, axisPropsFromTickScale, LEFT} from 'vue-d3-axis';
import {scaleLinear} from 'd3-scale';

const scale = scaleLinear().domain([0, 100]).range([0, 500]);
<Axis v-bind="axisPropsFromTickScale(scale, 10)" :styles="{orient: LEFT}" />
```
## API

### &lt;Axis /&gt;

Renders an Axis in SVG (so it expects to be within an `svg` element).

##### values: Array&lt;T&gt;

The values corresponding to where the ticks on the axis will be made.

##### position: (d: T) ⇒ number

A function converting a tick value to an offset along the axis.

##### format: (d: T) ⇒ string

A function rendering a tick value to a string, for its label.

##### range: Array&lt;number&gt;

The numerical range of the *rendered* axis. So, if an axis runs 1000px wide, this would be `[0, 1000]`.

##### styles: AxisStyle

This is optional -- by default the axis is rendered with 'bottom' alignment (left-to-right, ticks below the line).

### axisPropsFromTickScale(scale, tickCount)

Creates props for an `<Axis />` component from a tick-based D3 scale, such as `scaleLinear`.

### axisPropsFromBandedScale(scale)

Creates props for an `<Axis />` component from a banded D3 scale, such as `scaleBand`.
