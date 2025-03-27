import ReconnectingWebSocket from 'reconnecting-websocket';
import { createWsSynchronizer } from 'tinybase/synchronizers/synchronizer-ws-client/with-schemas';
import * as UiReact from 'tinybase/ui-react/with-schemas';
import { MergeableStore, OptionalSchemas } from 'tinybase/with-schemas';

const SYNC_SERVER_URL = process.env.EXPO_PUBLIC_SYNC_SERVER_URL;

if (!SYNC_SERVER_URL) {
  throw new Error('SYNC_SERVER_URL is not set');
}

export const useCreateServerSynchronizerAndStart = <
  Schemas extends OptionalSchemas
>(
  storeId: string,
  store: MergeableStore<Schemas>,
) =>
  (UiReact as UiReact.WithSchemas<Schemas>).useCreateSynchronizer(
    store,
    async (store: MergeableStore<Schemas>) => {
      const synchronizer = await createWsSynchronizer(
        store,
        new ReconnectingWebSocket(SYNC_SERVER_URL + storeId, [], {
          maxReconnectionDelay: 1000,
          connectionTimeout: 1000,
        })
      );

      await synchronizer.startSync();

      synchronizer.getWebSocket().addEventListener('open', () => {
        synchronizer.load().then(() => { synchronizer.save() });
      });
      return synchronizer;
    },
    [storeId]
  ); 