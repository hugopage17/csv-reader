import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { User } from 'firebase/auth'

export type DataObject = {
  content: string[];
  enabled: boolean;
  axisType: string;
};

export type Project = {
  id: string;
  projectName: string;
  userId: string;
  fileData: Record<string, DataObject>;
}

const useAppStore = defineStore('app-store', () => {
  const projectName = ref<string>('');
  const hasData = ref<boolean>(false);
  const fileData = ref<Record<string, DataObject>>({});
  const xAxis = ref<string>('');
  const user = ref<User | null>(null);
  const savedProjects = ref<Project[] | null>(null);

  const displayOptions = {
    Graph: 'Graph',
    Table: 'Table',
  }
  const currentDisplay = ref<string>(displayOptions.Graph)

  return { projectName, hasData, fileData, xAxis, currentDisplay, displayOptions, user, savedProjects };
});

export default useAppStore;
