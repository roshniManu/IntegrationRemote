public  class PdfExampleController {
    public List<Account> accList{get;set;}
    public PdfExampleController (){
    //first
    //second
    //3r2
    //4
        accList = new List<Account>();
        accList = [select id,name,type,accountnumber,annualrevenue,Rating from account limit 10];
    }
}