import {format} from "date-fns"

export function formatDate(date: Date){
    const dataFormatada = format (date, "dd/MM/yyyy")
    // return format(date,"dd/MM/yyy")
    return  dataFormatada
}

// formate data string from dd-MM-yyyy to yyyy-mm-dd
export function formatDateDDMMYYYY(date: string){
    // const dataSeparado = date.split("-")
    // //["12","12",2012]
    
    
    const [day, month, year] = date.split("-")

    return `${year}-${month}-${day}`
}
const texto = "21-10-1999"
texto.split("-") 