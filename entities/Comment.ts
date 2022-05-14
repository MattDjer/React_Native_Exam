export class Comment {
    constructor(
        public description: string,
        public timestamp: Date, 
        public userMail: string, 
        public displayName?: string){}
}