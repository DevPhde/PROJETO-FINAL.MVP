export class Validation {


    static nameValidation(name){
        return name == '' || name.length < 3 ? false : true
    }

    static amountValidation(value){
        return value == '' && value <= 0  ? false : true
    }

    static localValidation(local){
        return local == '' || local.length < 3 ? false : true
    }
    
    static dateValidation(date){
        return date == '' ? false : true
    }

    static typeValidation(type){
        return type == 'Selecione' || type == '' ? false : true
    }

}