<aura:application access="global" extends="ltng:outApp" >  
    <aura:dependency resource="Score_Card:LiveLeadersBoardTemplate"/>
    <aura:dependency resource="Score_Card:LiveBroadcasting"/>   
    <div>       
       <Score_Card:LiveLeadersBoardTemplate > </Score_Card:LiveLeadersBoardTemplate>       
       <Score_Card:LiveBroadcasting ></Score_Card:LiveBroadcasting> 
    </div>
</aura:application>