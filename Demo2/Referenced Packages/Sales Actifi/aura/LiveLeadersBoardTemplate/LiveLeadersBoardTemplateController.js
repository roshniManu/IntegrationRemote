({
    initTemplate : function(component, event, helper) {
        //console.log('data initilizing');
        return;
    },
    jsLoaded : function(component, event, helper){        
        //console.log('	1	');
        var action = component.get('c.getRelevantAdminConsole');
        component.set('v.ErrorMsg', '');
        action.setCallback(this, function(response){
            if(response.getState() == 'SUCCESS'){   
                //console.log('	2	');
                var resultdata = response.getReturnValue(); 
                component.set('v.AvailableAdminConsoleData',resultdata);
                //console.log('resultdata'+resultdata);
                if(resultdata == ''){                    
					//console.log('	3	');
                	component.set('v.ErrorMsg', 'No Leader Board Configuration Defined For The Time.');                    
                    $('#loader_01').fadeOut("slow");  
					return;                    
                }
                component.set('v.Runningtemplates', resultdata);               
                    var getAllLeaderAction = component.get('c.getAllLeadreData');
                    getAllLeaderAction.setCallback(this, function(response){
                        if(response.getState() == 'SUCCESS'){
                            //console.log('	4	');
                            var AllSeletedLeaders = response.getReturnValue();  
                            //console.log('AllSeletedLeaders'+AllSeletedLeaders);
                            if(AllSeletedLeaders.length > 0 ){
                                //console.log('	5	');
                                var i= 0;  
                                component.set('v.lstleadres',AllSeletedLeaders);
                                //alert(AllSeletedLeaders[0].generalSetings);
                                if(AllSeletedLeaders[0].generalSetings != null){									
                                    //component.set('v.generalSettings',AllSeletedLeaders[0].generalSetings);
                                	component.set('v.GlobalvideoUrl',AllSeletedLeaders[0].generalSetings.Score_Card__LeaderBoard_Common_Url__c);
                                }
                                helper.getAdminConsoleData(resultdata,component,AllSeletedLeaders,i);
                       		}
                            else{
                                //console.log('	6	');
                                component.set('v.ErrorMsg', 'No Data Found Based On Your Configuration');
                                $('#loader_01').fadeOut("slow");
                            }                           
                        }
           			});  
              		//console.log('	7	');
            		$A.enqueueAction(getAllLeaderAction);                                                                                                   
            }              
        });     
        //console.log('	8	');
        $A.enqueueAction(action); 
        return;
    }
                     
})