type Dataresponse = {
  id: number;
  name: string;
};

type ReqType = {
  body: { url: string; method: string };
};

type ReqValidationError = { type: "request validation"; message: string };
type ResValidationError = { type: "response validation"; message: string };
type NetworkError = { type: "network"; message: string };

type ErrorResponse = ReqValidationError | NetworkError | ResValidationError;

type ApiSuccess<T> = { status: "success"; data: T };
type ApiError = { status: "error"; error: ErrorResponse };

type ApiResponse<T> = ApiSuccess<T> | ApiError;

function isUser(data: any): data is Dataresponse {
  //   return typeof data === "object" && "id" in data && "name" in data;
  return (
    typeof data === "object" &&
    data !== null &&
    typeof data.id === "number" &&
    typeof data.name === "string"
  );
}

function validateBody(data: any): data is ReqType {
  return (
    typeof data === "object" &&
    data !== null &&
    typeof data.body === "object" &&
    typeof data.body.url === "string" &&
    typeof data.body.method === "string"
  );
}

const getUser = async <ReqType>(
  req: ReqType,
): Promise<ApiResponse<Dataresponse>> => {
  try {
    if (validateBody(req)) {
      const res = await fetch(req.body.url, { method: req.body.method });
      if (isUser(res)) {
        return { status: "success", data: res };
      } else {
        return {
          status: "error",
          error: { type: "response validation", message: "validation error" },
        };
      }
    } else {
      return {
        status: "error",
        error: { type: "request validation", message: "network error" },
      };
    }
  } catch (er: any) {
    return {
      status: "error",
      error: { type: "network", message: `${er.message}` },
    };
  }
};

const gettingUser = (req: ReqType): Promise<ApiResponse<Dataresponse>> =>
  fetchApi(req, isUser);


function gettetet(req:ReqType):Promise<ApiResponse<Dataresponse>>{
  return fetchApi(req,isUser)
}

const fetchApi = async <T>(
  req: ReqType,
  validatingFunction: (data: unknown) => data is T,
): Promise<ApiResponse<T>> => {
  try {
    if (validateBody(req)) {
      const res = await fetch(req.body.url, { method: req.body.method });
      if (res.ok) {
        const json = await res.json();
        if (validatingFunction(json)) {
          return { status: "success", data: json };
        } else {
          return {
            status: "error",
            error: { type: "request validation", message: "validation error" },
          };
        }
      } else {
        return {
          status: "error",
          error: { type: "network", message: "Network error" },
        };
      }
    } else {
      return {
        status: "error",
        error: { type: "request validation", message: "validation error" },
      };
    }
  } catch (er: any) {
    return { status: "error", error: { type: "network", message: er.message } };
  }
};



// function isString(test: unknown): test is number{
//     return typeof test === "string";
// }


// console.log(isString(1))