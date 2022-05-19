export class Comment {
    constructor(
        public text: string,
        public timestamp: string, 
        public userMail: string,
        public id: string, 
        public displayName?: string,       
        ){}
}