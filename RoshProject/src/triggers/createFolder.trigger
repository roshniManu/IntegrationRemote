trigger createFolder on Opportunity (after insert)  {
    if(trigger.isAfter && trigger.isInsert){
        List<Folder__c> foldersList = new List<Folder__c>();
        List<String> fldNames = new List<String>();
        fldNames.add('Client Non-Confidential');
        fldNames.add('Client Confidential');
        fldNames.add('Incyte Non-Confidential');
        fldNames.add('Incyte Confidential');
        fldNames.add('CDA');
        fldNames.add('Term Sheet');
        fldNames.add('Collaboration Agreement');
        fldNames.add('Opportunity Assessment');
        fldNames.add('Protocol');
        fldNames.add('Ancillary Documents');
        
        for(Integer i=0; i<trigger.new.size(); i++){
            for(Integer j=0; j<fldNames.size(); j++){
                Folder__c fld = new Folder__c(Opportunity__c = trigger.new[i].Id,Name=fldNames[j]);    
                foldersList.add(fld);
            }
        }
        if(!foldersList.isEmpty()){
            insert foldersList;
        }
    }
}