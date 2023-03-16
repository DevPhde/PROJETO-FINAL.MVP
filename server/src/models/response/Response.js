export class Response {
    constructor(status, message){
        this.status = status;
        this.message = message;
    }
}

export class ResponseError extends Response {
    constructor(line) {
        super(false, `Erro interno, tente novamente mais tarde.(Error Code: ${line})`); 
    }
}

