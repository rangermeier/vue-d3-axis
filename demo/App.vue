<script setup lang="ts">
import { Axis, axisPropsFromTickScale, TOP, RIGHT, BOTTOM, LEFT, type Orients } from '../src/'
import {scaleLinear} from 'd3-scale';

const scale = scaleLinear().domain([0, 100]).range([0, 500]);
const orientations: Orients[] = [TOP, RIGHT, BOTTOM, LEFT];
</script>

<template>
    <h1>Vue D3 Axis examples</h1>
    <article v-for="orient in orientations" :key="orient">
        <h2>Orientation {{orient}}</h2>
        <svg>
            <Axis v-bind="axisPropsFromTickScale(scale, 10)" :styles="{orient}" />
        </svg>
    </article>
</template>

<style scoped>
svg {
    width: 100%;
    height: 100px;
}
</style>
