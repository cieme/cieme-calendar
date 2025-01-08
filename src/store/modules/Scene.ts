import { ref } from "vue";
import { Components } from "@/core";

const resetStore = () => {
  /**
   * 场景中的所有组件，这还不太对，这应该是 computed ，用多场景维护
   */
  const componentList: Map<string, Components> = new Map();
  /**
   * 选择的组件
   */
  const selectComponentList: Map<string, Components> = new Map();
  return {
    componentList,
    selectComponentList,
  };
};
export const StoreScene = ref(resetStore());
