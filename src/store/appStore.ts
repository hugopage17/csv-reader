import { defineStore } from 'pinia';
import { ref } from 'vue';

const useAppStore = defineStore('app-store', () => {
    const projectName = ref<string>('');
    const hasData = ref<boolean>(false);
    const fileData = ref<any>()
    return { projectName, hasData, fileData };
});

export default useAppStore;
