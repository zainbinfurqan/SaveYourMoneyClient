export const HandleFetchError =  res => {
    if (res.status >= 400 && res.status < 600) {
        let exp = {
            // Message: (await res.json()).Message,
            Status: res.status
        };
        throw exp;
    }
    return res.json();
};