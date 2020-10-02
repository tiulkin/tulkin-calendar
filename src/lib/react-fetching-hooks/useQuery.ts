import { getIdBase64, HC, PartialRequestData, useQuery as useQueryLib } from 'react-fetching-hooks';
import { BC, EC, PPC, QPC, RC, SDC } from 'react-fetching-hooks/dist/core/request/types';
import { useUID } from 'react-uid';
import { mergeDeepNonUndefined } from './functions/mergeDeepNonUndefined';

interface QueryOptions<
    C extends SDC,
    R extends RC,
    E extends EC,
    P extends PPC,
    Q extends QPC,
    B extends BC,
    H extends HC
> {
    requestOverride?: DeepPartial<PartialRequestData<C, R, E, P, Q, B, H>>;
}

export function useQuery<
    C extends SDC,
    R extends RC,
    E extends EC,
    P extends PPC,
    Q extends QPC,
    B extends BC,
    H extends HC
>(request: PartialRequestData<C, R, E, P, Q, B, H>, { requestOverride }: QueryOptions<C, R, E, P, Q, B, H> = {}) {
    const completeRequest = requestOverride ? mergeDeepNonUndefined(request, requestOverride) : request;
    const { refetch, error, loading, ...restQuery } = useQueryLib(completeRequest, {
        getPartialRequestId: getIdBase64,
        hookId: useUID(),
    });
    return { refetch, error, loading, ...restQuery };
}
