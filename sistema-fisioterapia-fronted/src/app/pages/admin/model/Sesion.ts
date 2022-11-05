export class Sesion {
    
    static sesionToJson(obj: any){
        return new Sesion(
            obj['id'],
            obj['startTime'],
            obj['endTime'],
            obj['description'],
            obj['subject']
        )
    }


    constructor(
        public Id:               string,
        public StartTime:        string,
        public EndTime:          string,
        public Description:      string,
        public Subject:          string
    ){}
}


