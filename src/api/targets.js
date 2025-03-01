import { fetchClient } from "./client";

export const getTargets = () => {
return fetchClient(`/targets`);
}