({
    doInit : function(component, event, helper) {
        $A.createComponent(
            "c:MyCart",
            {
                
            },
            function(newCmp){
                if (component.isValid()) {
                    component.set("v.body", newCmp);
                }
            }
        );
    },
    NavigateComponent : function(component,event,helper) {
        $A.createComponent(
            "c:CheckOutComponent",
            {
                "Get_Result" : event.getParam("Pass_Result")
            },
            function(newCmp){
                if (component.isValid()) {
                    component.set("v.body", newCmp);
                }
            }
            // alert('total in main component:'+ v.Get_Result);
        );
        
    }
})