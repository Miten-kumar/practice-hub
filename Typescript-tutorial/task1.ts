interface sucessState<T> {
  status: 'sucess';
  data: T;
}

interface errorState {
  status: 'error';
  message: string;
}

type apiResponse<T> = sucessState<T> | errorState;

function apiResponseHandler<T>(response: 'sucess' | 'error', data: T): apiResponse<T> {
 
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

const myData = "User loaded";
const result = apiResponseHandler('sucess', myData);

if (result.status === 'sucess') {
  console.log("Result:", result.data);
} else {
  console.error("Error:", result.message);
}