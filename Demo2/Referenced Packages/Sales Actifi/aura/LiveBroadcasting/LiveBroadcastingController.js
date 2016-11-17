({
	bmJsLoaded : function(component, event, helper) {
		
        var action = component.get('c.getbroadcastmessages');
        action.setCallback(this,function(response){
            if(response.getState() =='SUCCESS'){ 
                var eventData = response.getReturnValue();
                var bgColor = 'Black'; var BMfontColor = '#fff'; var BMFontName = 'Arial';
                if(eventData.length > 0){ 
                    if(eventData[0].Score_Card__Background_Color__c != '')
                     bgColor = eventData[0].Score_Card__Background_Color__c ; 
                    if(eventData[0].Score_Card__Font_Color__c != '')
                     BMfontColor = eventData[0].Score_Card__Font_Color__c ;
                    if(eventData[0].Score_Card__Font_Name__c != '')
                     BMFontName = eventData[0].Score_Card__Font_Name__c ;                                           
                }
               // console.log(bgColor+BMfontColor );               
                var bmStyle = {
                    'background' : bgColor,
                    'color' : BMfontColor,
                    'font' : BMFontName,
                    'speed' : 0.1
                };
                
                var eventData = response.getReturnValue();
                //console.log('eventData'+eventData);
                helper.populateEventData(eventData, bmStyle);              
            }
        }); 
        $A.enqueueAction(action);
	}
})