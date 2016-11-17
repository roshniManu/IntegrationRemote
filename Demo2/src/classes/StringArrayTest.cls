public with sharing class StringArrayTest{
    
    public StringArrayTest(){
    
    }
    public static List<string> generateStringArray(integer n){
     List<string> mystring= new list<string>();
     integer i=0;
         while(i<n){
      
        mystring.add('Test '+i);
       
         i++;
         }
         system.debug('THIS IS MY FIRST TRAILHEAD OF APEX - '+mystring);
         return mystring;
         
    }
}