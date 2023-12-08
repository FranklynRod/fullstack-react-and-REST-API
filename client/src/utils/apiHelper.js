    const api = (
        path, 
        method = "GET", 
        body = null, 
        credentials = null
        ) => {
        const url = "http://localhost:500/api" + path;
        
        const options = {
            method,
            headers: {}
        };
        if (body){
            options.body = JSON.stringify(body);
            options.headers["Content-Type"] = "applications/json; charset=utf-8"
        }
        if (credentials){
            const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
            options.headers.Authorization = `Basic ${encodedCredentials}`;
        }
        return fetch(url, options);
    }

    // export default api;

