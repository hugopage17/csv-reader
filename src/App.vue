<script lang="ts">
  import { defineComponent } from 'vue'
  import { NConfigProvider, NCard, createTheme, inputDark, cardDark, enUS, dateEnUS, selectDark, iconDark, dataTableDark } from 'naive-ui'

  export default defineComponent({
    components: {
      NConfigProvider,
      NCard
    },
    setup() {
      return {
        darkTheme: createTheme([inputDark, cardDark, selectDark, iconDark, dataTableDark]),
        enUS, dateEnUS,
      }
    }
  })
</script>

<template>
  <NConfigProvider
    :theme="darkTheme"
    :locale="enUS" 
    :date-locale="dateEnUS"
  >
    <NCard class="root-wrapper">
      <RouterView />
    </NCard>
  </NConfigProvider>
</template>

<style>
  .root-wrapper {
    width: 100%;
    height: 100vh;
    padding: 0 !important;
  }
</style>