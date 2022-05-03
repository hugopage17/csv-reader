<script lang="ts">
    import { defineComponent, toRefs, computed } from 'vue';
    import { NDataTable, NSpace, NDivider } from 'naive-ui';
    import type { DataTableColumns } from 'naive-ui';
    import useAppStore from '../../../store/appStore';
    import formatTableData from './formatTableData';

    type RowData = {
        [key: string]: string | number;
    }

    export default defineComponent({
        components: { NDataTable, NSpace, NDivider },
        setup () {
            const appStore = useAppStore();
            const { fileData } = toRefs(appStore);
            const columns = computed<DataTableColumns<RowData>>(() => {
                return Object.keys(fileData.value).map((header) => {
                    return {
                        title: header,
                        key: header
                    }
                });
            });
            const data = computed<RowData[]>(() => formatTableData(fileData.value));
            return {
                data,
                columns,
                pagination: { pageSize: 20 },
            }
        }
    })
</script>

<template>
    <NSpace vertical :size="12">
        <NDataTable
            :columns="columns"
            :data="data"
            :pagination="pagination"
            :bordered="true"
            :max-height="480"
            :scroll-x="1400"
        />
    </NSpace>
</template>

<style scoped>
    .table {
        border: '1px solid red'
    }
</style>