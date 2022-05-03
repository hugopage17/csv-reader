<script lang="ts">
  import { defineComponent, toRefs, computed } from 'vue';
  import { NDivider, NCard } from 'naive-ui';
  import useAppStore from '../../store/appStore';
  import ToolBarComponent from './toolbar/ToolBar.vue';
  import DatasetsComponent from './graphPanel/DatasetsComponent.vue';
  import GraphComponent from './graphPanel/GraphComponent';
  import DisplayTableComponent from './displayTable/DisplayTable.vue';
  import type { DataObject } from '../../store/appStore';

  export default defineComponent({
    components: {
      ToolBarComponent,
      NDivider,
      DatasetsComponent,
      GraphComponent,
      DisplayTableComponent,
      NCard,
    },
    setup() {
      const appStore = useAppStore();
      const { hasData, xAxis, fileData, currentDisplay, displayOptions } = toRefs(appStore);
      const colors = ['#42eff5', '#57f542'];

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const axisCondition = ([label, obj]: [string, DataObject]) => obj.axisType === 'y-axis'

      const datasets = computed(() => {
        return Object.entries(fileData.value)
                .filter(axisCondition)
                .map(([label, dataObj]: [string, DataObject], idx: number) => {
                  if(dataObj.enabled && dataObj.axisType === 'y-axis') {
                    return {
                      label,
                      data: dataObj.content,
                      backgroundColor: colors[idx],
                      borderColor: colors[idx],
                      borderWidth: 1,
                      pointRadius: 1,
                    };
                  }
        }).filter(Boolean);
      });

      const graphData = computed(() => {
        return {
          labels: fileData.value[xAxis.value].content.filter((item) => item !== ''),
          datasets: datasets.value,
        };
      })
      return { hasData, xAxis, fileData, graphData, currentDisplay, displayOptions };
    },
  })
</script>

<template>
  <div v-if="hasData">
    <ToolBarComponent />
    <NDivider />
    <div>
      <div v-if="currentDisplay === displayOptions.Graph" class="display-panel">
        <DatasetsComponent />
        <NCard v-if="xAxis">
          <GraphComponent :graphData="graphData"/>
        </NCard>
      </div>
      <div v-else-if="currentDisplay === displayOptions.Table">
        <DisplayTableComponent />
      </div>
    </div>
  </div>
</template>

<style>
  .display-panel {
    display: grid;
    grid-template-columns: 0.75fr 1.25fr;
    grid-gap: 8px;
  };
  .main-panel {
    width: 100%
  }
</style>
