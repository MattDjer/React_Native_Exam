export class Comment {
    constructor(
        public text: string,
        public timestamp: Date, 
        public userMail: string, 
        public displayName?: string,
        public id?: string,
        ){}
}