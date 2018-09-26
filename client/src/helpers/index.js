export function formatPostData(data) {
    let params = new URLSearchParams();
    for (let [k, v] of Object.entries(data)) {
        params.append(k, v);
    }
    return params;
}

export function formatQueryString(userInputArray, page = 0) {
    switch (userInputArray.length) {
        case 1:
            return {
                params: {
                    one: userInputArray[0],
                    page
                }
            };
        case 2:
            return {
                params: {
                    one: userInputArray[0],
                    two: userInputArray[1],
                    page
                }
            };
        case 3:
            return {
                params: {
                    one: userInputArray[0],
                    two: userInputArray[1],
                    three: userInputArray[2],
                    page
                }
            };
        default:
            return;

    }
}