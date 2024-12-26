import { Store } from "pullstate";

interface IUIStore {
  message: string;
  userLoggedIn: boolean;
  userDetails: any;
}

export const UIStore = new Store<IUIStore>({
  message: "Hi, from store",
  userLoggedIn: false,
  userDetails: [],
});
