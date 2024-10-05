import { Store } from "pullstate";

interface IUIStore {
  message: string;
}

export const UIStore = new Store<IUIStore>({
  message: "Hi, from store",
});
