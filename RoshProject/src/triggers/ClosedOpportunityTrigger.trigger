trigger ClosedOpportunityTrigger on Opportunity (after insert, after update) {
	List <Task> todoList = new List <Task>();
   
    for (Opportunity opp :Trigger.new){
        if(Trigger.isInsert || Trigger.isUpdate) {
            if(opp.StageName == 'Closed Won') {
                todoList.add(new Task(Subject = 'Follow Up Test Task', WhatId = opp.Id));
            }
        }
    }
    if(todoList.size()>0) {
        insert todoList;
    }
}