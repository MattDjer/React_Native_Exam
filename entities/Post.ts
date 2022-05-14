export class Post {
    constructor(
        public title: string, 
        public description: string,
        public timestamp: Date, 
        public userId: string, 
        public userMail: string, 
        public displayName?: string,
        
        ){}
}