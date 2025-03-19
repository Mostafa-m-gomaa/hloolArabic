import { fetchClient } from "./client";

export const getTargets = () => {
return fetchClient(`/targets`);
}
export const getTargetsAnalytics = () => {
return fetchClient(`/target-analytics?profitsStatus=all&&limit=200`);
}
export const getTargetsAnalyticsMine = () => {
return fetchClient(`/target-analytics/mine`);
}

export const deleteTarget = (id) => {
return fetchClient(`/targets/${id}`, {
method: "DELETE",
});
}   

export const createTarget = (data) => {
    return fetchClient(`/targets`, {
method: "POST",
body: JSON.stringify(data),
    })
}
export const payTarget = (id , data) => {
    return fetchClient(`/target-analytics/makeRewardAsPaid/${id}`, {
method: "PATCH",
body: JSON.stringify(data),
    })
}
export const participateTarget = (id) => {
    return fetchClient(`/target-analytics/${id}`, {
method: "POST",
    })
}