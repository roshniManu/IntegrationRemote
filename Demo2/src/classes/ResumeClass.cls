public class ResumeClass {
    public Resume__c resumes{ get; set;}
    public List<string> TechnicalSkill{ get; set;}
    public List<string> Achievement{ get; set;}

   
    public ResumeClass(){
        resumes = [select Name,Address__c,Objective__c ,Contact_Number__c,Email_Id__c,Achievements__c,
                   Declaration__c,Hobbies__c,Technical_Skills__c,Reference__c,(select Percentage__c,
                   Qualification__c,Data__c,Year_of_Passing__c from Qualifications__r),
                   (select Name,Hobbies__c,Languages_Known__c,Marital_Status__c,Nationality__c,Resume__c 
                   from Personal_Details__r)
                   From Resume__c Where id=: 'a0B280000052xrN']; 
        
         TechnicalSkill=resumes.Technical_Skills__c.split(';');// split method helps to split the string using special character
         Achievement=resumes.Achievements__c.split(',');
      
    } 
}