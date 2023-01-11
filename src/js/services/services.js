const postData = async (url, data) => {    // universal  POST method function 
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });
    return await res.json();
};

const getResource = async (url) => { // universal function for GET method and use this data
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Помилка в ${url}  статус: ${res.status}`);  // create manual error  
    }

    return await res.json();
};

export {postData};
export {getResource};