import { defineStore } from 'pinia';
import { ref } from 'vue';

const useAppStore = defineStore('app-store', () => {
    const projectName = ref<string>('');
    return { projectName };
});

export default useAppStore;
