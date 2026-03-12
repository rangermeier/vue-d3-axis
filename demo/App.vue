<script setup lang="ts">
import { computed, ref } from 'vue';
import Axis from '../src/axis.vue';
import { TOP, RIGHT, BOTTOM, LEFT } from '../src/orientation';
import { axisPropsFromTickScale} from '../src/axisPropsFromTickScale';
import {scaleLinear} from 'd3-scale';

const nbTicks = ref(10);
const domainFrom = ref(0);
const domainTo = ref(100);
const hideOverlappingTicks = ref(false);

const scale = computed(() => scaleLinear().domain([domainFrom.value, domainTo.value]).range([0, 500]));
const orientations = [TOP, RIGHT, BOTTOM, LEFT];
</script>

<template>
    <h1>Vue D3 Axis examples</h1>
    <form>
        <label>
            Number of ticks:
            <input type="number" v-model.number="nbTicks" min="1" />
        </label>
        <label>
            Domain from:
            <input type="number" v-model.number="domainFrom" />
        </label>
        <label>
            Domain to:
            <input type="number" v-model.number="domainTo" />
        </label>
        <label>
            Hide overlapping ticks:
            <input type="checkbox" v-model="hideOverlappingTicks" />
        </label>
    </form>
    <article v-for="orient in orientations" :key="orient">
        <h2>Orientation {{orient}}</h2>
        <svg :class="orient">
            <Axis
                v-bind="axisPropsFromTickScale(scale, nbTicks)"
                :styles="{orient, hideOverlappingTicks}"
                class="axis"
            />
        </svg>
    </article>
</template>

<style scoped>
svg {
    width: 580px;
    height: 50px;
}
.LEFT, .RIGHT {
    height: 580px;
}
.axis {
    transform: translate(40px, 20px);
}

label {
    display: block;
    margin-bottom: 0.5em;
}
</style>
