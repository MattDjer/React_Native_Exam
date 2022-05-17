export class Comment {
    constructor(
        public text: string,
        public timestamp: Date, 
        public userMail: string,
        public id: string, 
        public displayName?: string,       
        ){}
}