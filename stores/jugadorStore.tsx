import * as UiReact from "tinybase/ui-react/with-schemas";
import { createMergeableStore, MergeableStore } from "tinybase/with-schemas";
import { useCreateClientPersisterAndStart } from "./persistance/useCreateClientPersisterAndStart";
import { useCreateServerSynchronizerAndStart } from "./synchronization/useCreateServerSynchronizerAndStart";
import { useUserIdAndNickname } from "@/app/hooks/useNombre";

const STORE_ID_PREFIX = "jugadorStore-";

const VALUES_SCHEMA = {
  id: { type: "string", default: "" },
  nombre: { type: "string", default: "" },
  edad: { type: "number", default: 0 },
  posicion: { type: "string", default: "" },
  equipo: { type: "string", default: "" },
  torneo: { type: "string", default: "" },
} as const;

const TABLES_SCHEMA = {
  estadisticas: {
    id: { type: "string", default: "" },
    jugadorId: { type: "string", default: "" },
    puntos: { type: "number", default: 0 },
    rebotes: { type: "number", default: 0 },
    asistencias: { type: "number", default: 0 },
    tapones: { type: "number", default: 0 },
    robos: { type: "number", default: 0 },
    faltasCometidas: { type: "number", default: 0 },
    minutos: { type: "number", default: 0 },
    doblesIntentados: { type: "number", default: 0 },
    doblesEmbocados: { type: "number", default: 0 },
    triplesIntentados: { type: "number", default: 0 },
    triplesEmbocados: { type: "number", default: 0 },
    tlIntentados: { type: "number", default: 0 },
    tlEmbocados: { type: "number", default: 0 },
  },
  usuarios: {
    nombre: { type: "string", default: "" },
  }
} as const;

type Schemas = [typeof TABLES_SCHEMA, typeof VALUES_SCHEMA];
type jugadorId = keyof typeof TABLES_SCHEMA;
type jugadorEstadisticasCellId = keyof (typeof TABLES_SCHEMA)["estadisticas"];

const {
  useCell,
  useCreateMergeableStore,
  useProvideStore,
  useRowCount,
  useSetCellCallback,
  useDelRowCallback,
  useSortedRowIds,
  useSetValueCallback,
  useStore,
  useTable,
  useValue
} = UiReact as UiReact.WithSchemas<Schemas>;

const useStoreId = (jugadorId: string) => STORE_ID_PREFIX + jugadorId;

export default function JugadorStore({
  jugadorId,
  initialContentJson,
}: {
  jugadorId: string,
  initialContentJson?: string,
}) {
  const storeId = useStoreId(jugadorId);
  const store = useCreateMergeableStore(() =>
    createMergeableStore().setSchema(TABLES_SCHEMA, VALUES_SCHEMA)
  );
  const [userId, nombre] = useUserIdAndNickname();
  useCreateClientPersisterAndStart(storeId, store, initialContentJson, () => {
    store.setRow("usuarios", userId, { nombre })
  });
  useCreateServerSynchronizerAndStart(storeId, store);
  useProvideStore(storeId, store);

  return null;
}

