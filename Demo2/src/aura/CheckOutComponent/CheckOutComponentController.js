({
 saveDetails : function(component, event) 
    { 
        // First Name validation
      var flag = 0;  
      var fstnameID = component.find("fname");
      var fvalue = fstnameID.get("v.value");    
      var lstnameID = component.find("lname");
      var lvalue = lstnameID.get("v.value");
      var emailID = component.find("mail");
      var evalue = emailID.get("v.value");
      var phID = component.find("ph");
      var pvalue = phID.get("v.value");
      var addrID = component.find("address");
      var avalue = addrID.get("v.value");
      var cityID = component.find("city");
      var cvalue = cityID.get("v.value");
      var zipcodeID = component.find("zip");
      var zipvalue = zipcodeID.get("v.value");
        
        
        if(!isNaN(fvalue)||fvalue==null)
        {
            fstnameID.set("v.errors", [{message:"Please enter a valid First Name"}]);
            flag=1;
        }
        else
        {
             fstnameID.set("v.errors",null);
        }
        
        if(!isNaN(lvalue)||lvalue==null)
        {
           lstnameID.set("v.errors", [{message:"Please enter a valid Last Name"}]);
            flag=1;
        }
        else {
            
            lstnameID.set("v.errors",null);        
        }
            
        
        if( isNaN(pvalue)||pvalue==null)
        {
             phID.set("v.errors", [{message:"Input not a valid Phone number!!"}]);
            flag=1;
        }
        else {
            
              phID.set("v.errors", null);    
        }
          

         if(isNaN(zipvalue)||zipvalue==null)
           {
               zipcodeID.set("v.errors", [{message:"Input not a valid zip code!!"}]);
               flag=1;               
           }
        else
        {
            zipcodeID.set("v.errors", null);
            
        }
               
             
        if(evalue==null) {
            emailID.set("v.errors", [{message:"Please enter your email Id"}]);
                flag=1;                    
        }
         else
        {
            emailID.set("v.errors",null);
        }
            
       if(cvalue==null){
            cityID.set("v.errors", [{message:"Please enter your city!!"}]);
               flag=1;
        }
         else
        {
            cityID.set("v.errors", null);           
        }
            
        if(avalue==null){
            addrID.set("v.errors", [{message:"Please enter your address!!"}]);
                 flag=1;
         }
         else
        {
           addrID.set("v.errors", null);
            
        }
        
        if(flag!=1)
        {
        var det_info=component.get("v.customerInfo");
        var action = component.get("c.insertCust");
        action.setParams({ "obj" : det_info });              
        action.setCallback(this, function(response){
        var state= response.getState();
        if (state == "SUCCESS"){
           var container=document.getElementById("container");
                      container.style.display="none";
            var thankYou=document.getElementById("thankYou");
                      thankYou.style.display="block";
                      
         }});
           $A.enqueueAction(action); }
 },        
    getValueFromApplicationEvent : function(component, event) {
            var ShowResultValue = event.getParam("Pass_Result");
         alert('total in checkout '+ShowResultValue );
            // set the handler attributes based on event data
            component.set("v.Get_Result", ShowResultValue);
        },
    
    
})