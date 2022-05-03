<script lang="ts">
  import { defineComponent, toRefs } from 'vue'
  import { NSpace, NSelect, NH6, NCard, NCheckbox, NCheckboxGroup, NGrid, NGi } from 'naive-ui';
  import useAppStore from '../../../store/appStore';
  import type { DataObject } from '../../../store/appStore';

  export default defineComponent({
    components: { NSpace, NSelect, NH6, NGi, NCard, NCheckbox, NCheckboxGroup, NGrid },
    setup() {
        const appStore = useAppStore();
        const { fileData, xAxis } = toRefs(appStore);
        return {
            fileData,
            xAxis,
        };
    },
    computed: {
        dataKeys(): any[] {
            return Object.keys(this.fileData ?? {}).map((fileKey) => {
                return {
                    label: fileKey,
                    value: fileKey,
                }
            });
        },
        yAxisKeys(): string[] {
            return Object.keys(this.fileData ?? {}).filter((key) => key !== this.xAxis);
        },
        enabledYAxisKeys(): string[] {
            return Object.entries(this.fileData).map(([key, dataObj]: [string, DataObject]) => {
                if (dataObj.enabled && key !== this.xAxis) {
                    return key;
                }
            }).filter(Boolean);
        },
    },
    methods: {
        handleUpdateValue (values: (string | number)[]) {
            Object.keys(this.fileData).forEach((key: string) => {
                if (values.includes(key)) {
                    this.fileData[key].enabled = true;
                } else {
                    this.fileData[key].enabled = false;
                }
            });
        },
        enableXAxis() {
            Object.keys(this.fileData).forEach((key: string) => {
                if (this.xAxis === key) {
                    this.fileData[this.xAxis].enabled = true;
                    this.fileData[key].axisType = 'x-axis';
                } else {
                   this.fileData[key].axisType = 'y-axis';
                }
            });
        }
    },
  })
</script>

<template>
    <NCard>
        <NSpace vertical>
            <NSelect
                :placeholder="'X Axis'"
                :options="dataKeys"
                v-model:value="xAxis"
                @update:value="enableXAxis"
            />
            <NH6>
                Y Axis Variables
            </NH6>
            <NCheckboxGroup v-model:value="enabledYAxisKeys" @update:value="handleUpdateValue">
                <NGrid :y-gap="8" :cols="1">
                    <NGi
                        v-for="yAxis in yAxisKeys"
                        :key="yAxis"
                    >
                        <NCheckbox
                            :value="yAxis"
                            :label="yAxis"
                            :checked="fileData[yAxis].enabled"
                        />
                    </NGi>
                </NGrid>
            </NCheckboxGroup>
        </NSpace>
  </NCard>
</template>

<style>
    .root-wrapper {
        width: 100%;
        height: 100vh;
    }
</style>
