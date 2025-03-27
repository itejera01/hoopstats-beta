import * as UIReact from "tinybase/ui-react/with-schemas";
import { MergeableStore, OptionalSchemas } from 'tinybase/with-schemas';
import { createClientPersister } from "./createClientPersister";

export const useCreateClientPersisterAndStart = <Schemas extends OptionalSchemas>(
  storeId: string,
  store: MergeableStore<Schemas>,
  initialContentJson?: string,
  then?: () => void,
) => (UIReact as UIReact.WithSchemas<Schemas>).useCreatePersister(
  store,
  //create the persister,
  (store: MergeableStore<Schemas>) => createClientPersister(storeId, store),
  [storeId],
  async (persister) => {
    let initialContentJson = undefined;
    try {
      initialContentJson = JSON.parse(initialContentJson);
    } catch (e) {
      console.log(e);
    }
    await persister.load(initialContentJson);
    await persister.startAutoSave();
    then?.();
  },
  [initialContentJson]
)
