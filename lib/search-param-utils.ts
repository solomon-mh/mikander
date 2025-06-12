// ✅ Local helper to add/update a query parameter
export function formUrlQuery({
  params,
  key,
  value,
}: {
  params: string;
  key: string;
  value: string;
}) {
  const searchParams = new URLSearchParams(params);
  searchParams.set(key, value);
  return `?${searchParams.toString()}`;
}

// ✅ Local helper to remove one or more query parameters
export function removeKeysFromUrlQuery({
  params,
  keysToRemove,
}: {
  params: string;
  keysToRemove: string[];
}) {
  const searchParams = new URLSearchParams(params);
  keysToRemove.forEach((key) => {
    searchParams.delete(key);
  });
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}
