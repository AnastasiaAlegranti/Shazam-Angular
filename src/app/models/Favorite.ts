export class Favorite{
    public constructor(        
        public indexInClientArray:number,
        public title:string,
        public subTitle:string,
        public image:string,
        public link:string,
        public id?:number 
        ){}
}