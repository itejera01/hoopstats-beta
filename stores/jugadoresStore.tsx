import { useUser } from '@clerk/clerk-expo';
import { NoValuesSchema } from 'tinybase/store';
import * as UiReact from 'tinybase/ui-react/with-schemas';
import { createMergeableStore } from 'tinybase/with-schemas';
import { useCreateClientPersisterAndStart } from './persistance/useCreateClientPersisterAndStart';
import { useCreateServerSynchronizerAndStart } from './synchronization/useCreateServerSynchronizerAndStart';
import JugadorStore from './jugadorStore';


const STORE_ID_PREFIX = "jugadoresStore-";

const TABLES_SCHEMA = {
  jugadores: {
    id: { type: 'string' },
    initialContentJson: { type: 'string' },
  },
} as const;

const {
  useCreateMergeableStore,
  useDelRowCallback,
  useProvideStore,
  useRowIds,
  useStore,
  useTable,
} = UiReact as UiReact.WithSchemas<[typeof TABLES_SCHEMA, NoValuesSchema]>;

const useStoreId = () => STORE_ID_PREFIX + useUser().user.id;

export default function JugadoresStore() {
  const storeId = useStoreId();
  const store = useCreateMergeableStore(() =>
    createMergeableStore().setTablesSchema(TABLES_SCHEMA)
  );

  useCreateClientPersisterAndStart(storeId, store);
  useCreateServerSynchronizerAndStart(storeId, store);
  useProvideStore(storeId, store);
  const currentUserJugadores = useTable("jugadores", storeId);   

  return Object.entries(useTable("jugadores", storeId)).map(
    ([jugadorId, { initialContentJson }]) => (
      <JugadorStore
        jugadorId={jugadorId}
        initialContentJson={initialContentJson}
        key={jugadorId}
      />
    )
  );
}