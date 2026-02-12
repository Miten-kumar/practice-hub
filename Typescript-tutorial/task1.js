function apiResponseHandler(response, data) {
    if (response === 'sucess') {
        return {
            status: 'sucess',
            data: data
        };
    }
    return {
        status: 'error',
        message: 'Something went wrong with the request'
    };
}
var myData = "User loaded";
var result = apiResponseHandler('sucess', myData);
if (result.status === 'sucess') {
    console.log("Result:", result.data);
}
else {
    console.error("Error:", result.message);
}
