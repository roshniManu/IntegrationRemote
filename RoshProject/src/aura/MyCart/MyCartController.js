({
	VegList : function(component, event, helper) {
        
		var action=component.get("c.getVegList");       
        action.setCallback(this, function(response){
            var state= response.getState();
            if (state == "SUCCESS"){
                component.set("v.veg",response.getReturnValue());
                var t = [];
                for(var i = 0; i<response.getReturnValue().length;i++){
                  t.push(response.getReturnValue()[i].Weight__c)  ;
                }  
                component.set("v.temp",t);
                var pTag=document.getElementById("priceTag");
        		pTag.style.display="none";
            }});
        $A.enqueueAction(action);
	},
    
    close : function (component,event){
      
       //var divElem = document.getElementById("myModal");       
      //  divElem.style.display = "none";
      document.getElementById("myModal").classList.remove("m");
    },
     popUp : function (component,event){
      
       var divElem = document.getElementById("myModal");      
       divElem.style.display = "block";
    },
    addToCartNewItem : function(component,event){
       // alert("n");
        var divElem = document.getElementById("myModal");  
       // alert(    divElem.style.display );
       // divElem.style.display = "block"; 
        //document.getElementById("myModal").style.display = "none";
        document.getElementById("myModal").classList.add("m");
        //alert(    divElem.style.display );
        var selectedveg = event.target.id; 
        //alert(selectedveg);
        var myCartItems = component.get("v.cart");
        var allVegData = component.get("v.veg"); 
        //alert(allVegData.length);
        var newTotal = component.get("v.total");
        var flag = false; 
        for(var i=0;i<allVegData.length;i++){
            if(allVegData[i].Name == selectedveg){
                if(myCartItems.length >0){
                    for(var j=0;j<myCartItems.length;j++){
                        if(myCartItems[j].Name == selectedveg){
                            myCartItems[j].Quantity__c++;
                            var d = component.get("v.temp")[i];
                            myCartItems[j].Weight__c=  parseInt(d) + parseInt(myCartItems[j].Weight__c);
                            newTotal = parseInt(newTotal) + parseInt(allVegData[i].Price__c) ;
                            flag = true;
                            
                            break;
                        }                       
                    }
                    
                }                        
                if( !flag ){ 
                    allVegData[i].Quantity__c = 1;
                	myCartItems.push(allVegData[i]);  
                	newTotal = parseInt(newTotal) + parseInt(allVegData[i].Price__c) ; 
                    
                }
            }  
        }
        
        component.set("v.total",newTotal);
        component.set("v.cart",myCartItems);
        
    },
    displayCart:function(component,event){
        var divElem = document.getElementById("myModal");      
        divElem.style.display = "none";
        var cartForm = document.getElementById("cartForm");
        cartForm.style.display="block";
        var maindiv=document.getElementById("cont");
        maindiv.style.display="none";
        var error=document.getElementById("noItem");
        error.style.display="none";
        var ftr=document.getElementById("footer");
        ftr.style.display="none";
        var pTag=document.getElementById("priceTag");
        pTag.style.display="block";
        var myCartItems = component.get("v.cart");
        if(myCartItems.length <=0)
        {
        	cartForm.style.display="none";
            error.style.display="block";
        }
    },
    
    search : function(component,event){
            var elemVal = document.getElementById('searchInput').value;
            var currentVeg = component.get("v.veg");
            var action = component.get("c.searchComp");
            var w=[];
         var catjs=component.get("v.cat");
                action.setParams({ "searchKey" : elemVal ,"c":catjs});
                action.setCallback(this, function(response){
                    var state= response.getState();
                    if (state == "SUCCESS"){
                       var tempSearch=response.getReturnValue();
                       for(var i=0;i<tempSearch.length;i++)
                       {
                           w.push(response.getReturnValue()[i].Weight__c);
                       }
                       component.set("v.veg",response.getReturnValue());
                       component.set("v.temp",w);
                    }});
                $A.enqueueAction(action);
    },
    
   /* show:function(component,event){
        var clearDetails=document.getElementById("cl");
        clearDetails.style.display="block";},
*/    
    clear:function(component,event){
        
        document.getElementById("searchInput").value= "";
        
       // var clear=document.getElementById("cl");
       // clear.style.display="none";
        var elemVal = document.getElementById('searchInput').value;
            var currentVeg = component.get("v.veg");
            var action = component.get("c.searchComp");
            var w=[];
         var catjs=component.get("v.cat");
                action.setParams({ "searchKey" : elemVal ,"c":catjs});
                action.setCallback(this, function(response){
                    var state= response.getState();
                    if (state == "SUCCESS"){
                       var tempSearch=response.getReturnValue();
                       for(var i=0;i<tempSearch.length;i++)
                       {
                           w.push(response.getReturnValue()[i].Weight__c);
                       }
                       component.set("v.veg",response.getReturnValue());
                       component.set("v.temp",w);
                    }});
                $A.enqueueAction(action);
       
    },
    
    displayHome:function(component,event){
        document.getElementById("searchInput").value= "";
         component.set("v.cat",'home');
        var action=component.get("c.getVegList");  
        var divElem = document.getElementById("myModal");      
        divElem.style.display = "none";
        var cartForm = document.getElementById("cartForm");
        cartForm.style.display="none";
        var maindiv=document.getElementById("cont");
        maindiv.style.display="block";
        var error=document.getElementById("noItem");
        error.style.display="none";
        var ftr=document.getElementById("footer");
        ftr.style.display="block";
        var pTag=document.getElementById("priceTag");
        pTag.style.display="none";
        action.setCallback(this, function(response)
        {
            var state= response.getState();
            if (state == "SUCCESS")
            {
        		var f = [];
                component.set("v.veg",response.getReturnValue());
            }
            var t=[];
            for(var i = 0; i<response.getReturnValue().length;i++)
            {
                    
              	t.push(response.getReturnValue()[i].Weight__c);
                    
            }
                  
            component.set("v.temp",t);
           
        });
         
         $A.enqueueAction(action);
    },
    removeItem: function(component,event){
       	var myCartItems = component.get("v.cart");
        //var allVegData = component.get("v.veg");
       	var removedElem =event.target.id;
        var newWeight;
        
        var action=component.get("c.getVegList");
        action.setCallback(this, function(response)
        {
            component.set("v.vegtemp",response.getReturnValue());
            var allVegData = component.get("v.vegtemp");
        var t = [];
        
        for(var i = 0; i<response.getReturnValue().length;i++)
        {
               t.push(response.getReturnValue()[i].Weight__c);
        } 
            component.set("v.temp",t);
        for(var i=0;i<allVegData.length;i++){
            if(allVegData[i].Name==removedElem){
                var newWeight = component.get("v.temp")[i];
                //var newWeight = allVegData[i].Weight__c;
            }
        }
       for(var i=0;i<myCartItems.length;i++)
       {
           if(myCartItems[i].Name==removedElem)
           {
               var newTotal = component.get("v.total");
               
               if(myCartItems[i].Quantity__c>1)
               {
                   newTotal=newTotal-parseInt(myCartItems[i].Price__c);
                   myCartItems[i].Weight__c=parseInt(myCartItems[i].Weight__c)-parseInt(newWeight);
                   myCartItems[i].Quantity__c--;
               }
               else
               {
                   newTotal=parseInt(newTotal)-parseInt(myCartItems[i].Price__c);
                   myCartItems.splice(i,1);
               	     	
               }
           }
           
       }
       component.set("v.cart",myCartItems);
        component.set("v.total",newTotal);
        //component.set("v.temp",newWeight);
        });
        $A.enqueueAction(action);     
    },
    displayFruits:function(component,event){
        document.getElementById("searchInput").value= "";
         component.set("v.cat",'Fruit');
		var action=component.get("c.getVegList");   
        var cartForm = document.getElementById("cartForm");
        cartForm.style.display="none";
        var maindiv=document.getElementById("cont");
        maindiv.style.display="block";
        var error=document.getElementById("noItem");
        error.style.display="none";
        action.setCallback(this, function(response){
            var state= response.getState();
            if (state == "SUCCESS"){
                var f = [];
                for(var t=0;t<response.getReturnValue().length;t++)
                {
                    
                    if(response.getReturnValue()[t].Category__c=="Fruit")
                    f.push(response.getReturnValue()[t]);
                }
                component.set("v.veg",f);
                
                var t = [];
                for(var i = 0; i<response.getReturnValue().length;i++)
                {
                    if(response.getReturnValue()[i].Category__c=="Fruit")
                    {
                  		t.push(response.getReturnValue()[i].Weight__c);
                    }
                }
                  
                component.set("v.temp",t);         
            }});
        $A.enqueueAction(action);        
    },
    
    displayVegetable:function(component,event){
    document.getElementById("searchInput").value= "";
         component.set("v.cat",'Vegetable');
        var action=component.get("c.getVegList");  
        
        action.setCallback(this, function(response){
        var cartForm = document.getElementById("cartForm");
        cartForm.style.display="none";
        var maindiv=document.getElementById("cont");
        maindiv.style.display="block";
        var error=document.getElementById("noItem");
        error.style.display="none";
            var state= response.getState();
            if (state == "SUCCESS"){
                var f = [];
                for(var j=0;j<response.getReturnValue().length;j++)
                {
                    if(response.getReturnValue()[j].Category__c=="Vegetable")
                    f.push(response.getReturnValue()[j]);
                }
                component.set("v.veg",f);
                
                var t = [];
                for(var i = 0; i<response.getReturnValue().length;i++)
                {
                    if(response.getReturnValue()[i].Category__c=="Vegetable")
                    {
                  		t.push(response.getReturnValue()[i].Weight__c);
                
                    }
                }    
                component.set("v.temp",t);         
            }});
        $A.enqueueAction(action);     
    },  
    pass:function(component,event,helper){
        var totalvar = component.get("v.total");
        //alert('total'+totalvar);
        var evt = $A.get("e.c:passTotal");
        evt.setParams({ "Pass_Result": totalvar});
        evt.fire();
    },
    
})