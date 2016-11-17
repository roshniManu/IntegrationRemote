public with sharing class VegetableController {
    @AuraEnabled
    public static list<Vegetable__c> getVegList(){
        return [select Id,Name,Icon__c,Price__c,Quantity__c,Weight__c,Category__c from Vegetable__c];
    }
    @AuraEnabled
    public static list<Vegetable__c> searchComp(string searchKey ,string c){ 
        //string searchKey = 'Potato';
        system.debug('c::'+c);
        system.debug('search::'+searchKey);
        string queryStr;
        if(c=='Fruit' || c=='Vegetable'){
            system.debug('check in if'+c);
        queryStr = 'Select Name,Icon__c,Price__c,Weight__C,Category__c  from Vegetable__c where name like \'%' + searchKey+  '%\'  AND  Category__c like \'%' + c+  '%\'  ';        
        }
        else{
        queryStr = 'Select Name,Icon__c,Price__c,Weight__C,Category__c  from Vegetable__c where name like \'%' + searchKey+  '%\'  ';
        }
            system.debug('search key'+ queryStr);
        return Database.query(queryStr);
    }
     @AuraEnabled
    public static void insertCust(CustomerDetail__c obj) {
      upsert obj;
      //system.debug('inside apex'+obj);
    }

}