/** Encode a entity type and an array of keys to a nodeId */
export const encodeNodeId = (
  entityType: string,
  ...keys: Array<number | string>
) => btoa(JSON.stringify([entityType, ...keys]));

/** Decode a nodeId to an array where the first element is the type and the folowing are the primary keys for the entity */
export const decodeNodeId = (
  nodeId: string | undefined | null
): Array<string | number> | null => {
  if (nodeId) {
    const decodedResult = JSON.parse(atob(nodeId));
    if (Array.isArray(decodedResult)) {
      return decodedResult;
    }
  }
  return null;
};
