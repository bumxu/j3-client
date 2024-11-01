import { entityTypesStore } from '$lib/stores/entitytypes.store.j4.svelte';
import type { EntitiesSchema, EntitySchema, SuggestionsSchema } from '$lib/types/j4_types';
import type { RawEntitiesSchema, RawEntitySchema } from '$lib/types/j4raw_types';

class EntitiesStore {
    private _nid: bigint = 0n;
    private _data: EntitiesSchema = $state({});

    public constructor() {
        // if (browser) {
        //     window['k'] = this;
        // }
    }

    public get entities(): EntitiesSchema {
        return this._data;
    }

    public findById(entityId: string): EntitySchema | null {
        return this.entities[entityId] || null;
    }

    public getSuggestions(input: string): SuggestionsSchema<EntitySchema> {
        const matches: SuggestionsSchema<EntitySchema> = [];

        for (let entity of Object.values(this.entities)) {
            // if (entity.key.toLowerCase().indexOf(input.toLowerCase()) > -1) {
            //     matches.push($state.snapshot(entity));
            // }
            const type = entityTypesStore.entityTypes[entity.type];
            if (type != null) {
                const lookupFn = new Function('return ' + type.lookupFn)();
                //console.log('running ', parseFn, ' over ', input);
                const weight = lookupFn(input, entity.raw);
                if (weight != 0) {
                    matches.push({ item: $state.snapshot(entity), weight });
                }
            }
        }

        // Ordenar por peso, luego por tipo, y luego por display
        matches.sort((a, b) => {
            if (a.weight === b.weight) {
                if (a.item.type === b.item.type) {
                    const adp = entityTypesStore.getDisplayFn(a.item.type)(a.item.id, a.item.raw);
                    const bdp = entityTypesStore.getDisplayFn(b.item.type)(b.item.id, b.item.raw);
                    return adp.localeCompare(bdp);
                }
                return a.item.type.localeCompare(b.item.type);
            }
            return b.weight - a.weight;
        });

        for (let type of Object.values(entityTypesStore.entityTypes)) {
            const parseFn = new Function('return ' + type.parseFn)();
            const result = parseFn(input);
            if (result != null) {
                matches.push({ item: { id: null, type: type.id, raw: result }, weight: -1 });
            }
        }

        return matches;
    }

    public add(entity: EntitySchema): EntitySchema {
        const id = this._nid.toString(16);
        entity.id = id;
        this._data[id] = entity;

        this._nid += 1n;
        return this._data[id];
    }

    public load(raw: RawEntitiesSchema): void {
        this._nid = BigInt('0x' + raw.nid);
        this._data = raw.data.reduce((acc: EntitiesSchema, entity: RawEntitySchema) => {
            acc[entity.id] = entity;
            return acc;
        }, {});
    }

    public save(): RawEntitiesSchema {
        return {
            // bigint -> hex
            nid: this._nid.toString(16),
            // map -> array
            data: Object.values(this._data)
        };
    }

    public clear(): void {
        this._nid = 0n;
        this._data = {};
    }
}

export const entitiesStore = new EntitiesStore();