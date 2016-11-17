({    
    /*
	 * return the data required to render the scoreCard template
	 */   
    getLeadersData : function(currentTemplateData,i,component) {
        var TittleColor = currentTemplateData.Score_Card__Tittle_Color__c;       
        var videoUrl = ''; var audioUrl = '';
        var imageUrl = '/resource/1471865614000/Score_Card__sampleBackgroundImage';
        if(currentTemplateData.Score_Card__Image_Url__c != null )
        {
           imageUrl = currentTemplateData.Score_Card__Image_Url__c;
        }
        var globalVdoUrl = component.get('v.GlobalvideoUrl');
        //alert('gjhfgj'+globalVdoUrl);
        if( globalVdoUrl != null && i == 0 ){
             videoUrl = '/apex/Video_VF?VideoId='+ globalVdoUrl +'&imgurl='+imageUrl;
        }        
        else if( globalVdoUrl == null && currentTemplateData.Score_Card__Video_Url__c != null ){
                videoUrl = '/apex/Video_VF?VideoId='+currentTemplateData.Score_Card__Video_Url__c+'&imgurl='+imageUrl;          
        } 
        else if(globalVdoUrl == '' && currentTemplateData.Score_Card__Video_Url__c == null  ) {
                audioUrl = currentTemplateData.Score_Card__Audio_Url__c;
        }      
        var userstiles = [];
        var gradientNo = "";
        var ActiveGradient = "";
        var gradientNormalNo =  "10"; 
        var nameListBgColor;
        var choosedNormalGradient =currentTemplateData.Score_Card__Gradient__c;
        if(!currentTemplateData.Score_Card__Name_List_Background_Active_Color__c){
            ActiveGradient = "lst_li_clr_12";
        }
        if(!currentTemplateData.Score_Card__Name_List_Background_Color__c){
              gradientNo =  "lst_li_clr_11" ;                 
        }
        var leadersData = {
            'style' : {
                'listing' : {
                    'background' : currentTemplateData.Score_Card__Name_List_Background_Color__c,
                    'backgroundActive' : currentTemplateData.Score_Card__Name_List_Background_Active_Color__c,
                    'listClass' : gradientNo,
                    'listActiveClass': ActiveGradient,
                    'borderColor' : currentTemplateData.Score_Card__Name_List_Border_Color__c,
                    'color' : currentTemplateData.Score_Card__Name_List_Font_Color__c,
                    'font' : currentTemplateData.Score_Card__Font_Name__c //'Times New Roman'
                },
                'details' : {
                    'background' : currentTemplateData.Score_Card__Details_Box_Background_Color__c,
                    'color' : currentTemplateData.Score_Card__Details_Box_Font_Color__c,
                    'borderColor' : '',
                    'font' : currentTemplateData.Score_Card__Font_Name__c //'Times New Roman'
                },
                'title' : {
                    'color' : TittleColor 
                },
                'background' : {
                    'video' : videoUrl,
                    'audio' : audioUrl,
                    'image' : imageUrl,
                    'color' : ''//#71baf2
                }
            },
            'slideInfo' : {
                'title'    : currentTemplateData.Score_Card__Head1__c,
                'subTitle' : currentTemplateData.Score_Card__Head2__c,
                'noOfVisibleSlide' : 5, //currentTemplateData.Records_To_Display_At_a_Time__c,
                'slideChangeDelay' : currentTemplateData.Score_Card__Scrolling_Duration__c
            }		
        };
        leadersData.items = userstiles;            
        return leadersData;
    },
    /*
	 * populate background data on the template
	 * this includes background color, image, video
	 */
    populateBackgroundData: function(component, data){
        ////console.log('  15.1  ');
        var wrapper = $('.leaders_wrapper.videoContainer');
        if(data.style.background.color != ''){
           ////console.log('  15.2  ');
            wrapper.css('backgroundColor', data.style.background.color);
        }
        if(data.style.background.video != ''){
           ////console.log('  15.3  ');
            var video = wrapper.find('video').first();
            component.set('v.videoUrl', data.style.background.video);
            video[0].load();
        }
        if(data.style.background.audio != ''){
            ////console.log('  15.4  ');
            var audio = wrapper.find('audio').first();			
            component.set('v.audioUrl', data.style.background.audio);
            audio[0].load();
        }
        if(data.style.background.image != ''){	
            ////console.log('  15.5  ');
            wrapper.css('background-image', 'url('+data.style.background.image+')');
        }
        //console.log('  15.6  ');
        return data.style.background;
    },  
    
    /*
	 * Populate template title
	 */
    populateTitleArea : function(data, style){
         //console.log('  15.19  ');
        var titleWrapperDom = $('.leaders_wrapper header.leaders_title');
        if(style.color != ""){
             //console.log('  15.20  ');
            titleWrapperDom.css('color', style.color);
        }
        if(style.background != ""){
             //console.log('  15.21  ');
            var ribbonDom = titleWrapperDom.find('.ribbon');
            //console.log('  15.21.1 ');
            ribbonDom.css('background','red');
            //console.log('  15.21.2 ');
            //titleWrapperDom.find('.ribbon:before').css('border-color',style.background);
            //console.log('  15.21.3  ');
            //titleWrapperDom.find('.ribbon:after').css('border-color',style.background);
            //console.log('  15.21.4  ');
        }
        var titleDom = titleWrapperDom.find('.mainTitle');
        //console.log('  15.21.5  ');
        titleDom.first().html('');
        //console.log('  15.21.6  ');
        titleWrapperDom.find('.subTitle').first().html('');
        //console.log('  15.21.7  ');
        titleDom.first().append(data.title);
        //console.log('  15.21.8  ');
        var width = titleDom.closest('.ribbon-content').width();
        //console.log('  15.21.9  ');
        titleDom.closest('.ribbon').width(width);
        //console.log('  15.21.10  ');
        titleWrapperDom.find('.subTitle').first().append(data.subTitle);
         //console.log('  15.22.11  ');
        return;
    },
    
    /*
	 * Create leaders list element
	 */
    createLeaderListDom: function(index, name, style){
        //console.log('  15.26  ');
        var liDom = $('<li></li>').append($('<span></span>').append($('<i></i>').html(index+1)).append(name));
        liDom.addClass('lst_li_clr_01');
        if(style.borderColor != ''){
            //console.log('  15.27  ');
            liDom.css('borderColor', style.borderColor);
        }
        if(style.color != ''){
            //console.log('  15.28  ');
            liDom.css('color', style.color);
        }
        if(style.font != ''){
            //console.log('  15.29  ');
            liDom.css('font-family', style.font);
        }

        if(index == 0){
            //console.log('  15.30  ');
            liDom.addClass('active');
            if(style.listActiveClass != ''){
                //console.log('  15.31  ');
                liDom.addClass(style.listActiveClass);
            }
            if(style.backgroundActive){
                //console.log('  15.32  ');
                liDom.css('backgroundColor', style.backgroundActive);
            }
        }
        else{ 
            //console.log('  15.33  ');
            if(style.listClass != ''){
                //console.log('  15.34  ');
                liDom.addClass(style.listClass);
            }
            else{
                //console.log('  15.35  ');
                liDom.css('backgroundColor', style.background);
            }
        }
        //console.log('  15.36  ');
        return liDom;
    },
    
    /*
	 * create leader details one dom item
	 */
    createLeaderDetailsDom: function(index, item, style){
        //console.log('  15.39  ');
        var liDom = $('<li/>');
        var ulWrapper = $('.content_wrapper .leaders_details ul');
        //ulWrapper.html('');
        if(!index){
            //console.log('  15.40  ');
            liDom.addClass('leader_active');
        }
        if(style.background != ''){
             //console.log('  15.41  ');
            liDom.css('backgroundColor', style.background);
        }
        if(style.color != ''){
             //console.log('  15.42  ');
            ulWrapper.css('color', style.color);
        }
        if(style.font != ''){
             //console.log('  15.43  ');
            liDom.css('font-family', style.font);
        }
        var image = item.img;
        var imgDom = $('<div></div>');
        imgDom.addClass('img-responsive_01 title_img');
        imgDom.attr('style','background-image:url('+image+')');
        if(style.borderColor != ''){
             //console.log('  15.44  ');
            ulWrapper.css('borderColor', style.borderColor);
            imgDom.css('borderColor', style.borderColor);
        }
        var wrapperRowDom = $('<aside/>').addClass('row');
        var col5Dom = $('<aside/>').addClass('col-xs-5');       
        col5Dom.append(imgDom);
        col5Dom.append($('<p/>').addClass('big_01').html('Leader'));
        var leaderName = item.name ;
        col5Dom.append($('<p/>').addClass('').html(''+ leaderName +''));
        wrapperRowDom.append(col5Dom.append(imgDom));
        var clo7Dom = $('<aside/>').addClass('col-xs-7');
       
        var titleDom = $('<h2/>');
        if(style.color != ''){
             //console.log('  15.45  ');
            titleDom.css('borderColor', style.color);
        }
        clo7Dom.append($('<p/>').addClass('big_01').html('ITEM DETAILS'));
        clo7Dom.append(titleDom.addClass('leader_title leader_clr_01').html(item.title));
                      
    	$.each(item.info, function(k, v){ 
            //console.log('  15.46  ');
         clo7Dom.append($('<p/>').html(v.key + ' : ' + v.value));
        });
       // clo7Dom.append($('<p/>').html(item.info[1].key + ' : ' + item.info[1].value));
     
        wrapperRowDom.append(clo7Dom);
        ulWrapper.append(liDom.append(wrapperRowDom));
         //console.log('  15.47  ');
        return;
    },
    
    /*
	 * Populate leaders list data
	 */
    populateLeadersData : function(data) {
        //console.log(data);
        var itemDom = "";
        var itemInfoDom = "";
        var helperObject = this;
        var leaderListWrapper = $('.content_wrapper .leaders_list ul');
        //for resetting the dom
        leaderListWrapper.html('');
        var ulWrapper = $('.content_wrapper .leaders_details ul');
        ulWrapper.html('');
        $.each(data.items, function( index, item ) {	
             //console.log('  15.25  ');
            itemDom = helperObject.createLeaderListDom(index, item.name, data.style.listing);
            //console.log('  15.37  ');
            leaderListWrapper.append(itemDom);
            leaderListWrapper.attr('data-background-inactive', data.style.listing.background);
            leaderListWrapper.attr('data-background-active', data.style.listing.backgroundActive);
            leaderListWrapper.attr('data-active-class', data.style.listing.listActiveClass);
            leaderListWrapper.attr('data-inactive-class', data.style.listing.listClass);
            //console.log('  15.38  ');
            helperObject.createLeaderDetailsDom(index, item, data.style.details);
                //console.log('  15.48  ');
        });
            //console.log('  15.49  ');
        return;
    },
    /*
	 * Adjust the screen component size and positions based on screen size and content count
	 */
    adjustForScreen : function(){
        //console.log('  17 ');
        var window_height    = parseFloat($(window).height());
        //console.log('  17.1  ');
        var window_width    = parseFloat($(window).width());
        //console.log('  17.2  ');
        var headerDom   = $('.content_wrapper header.leaders_title');
        //console.log('  17.3  ');
        var headerHeight     = parseFloat(headerDom.height()) + parseFloat(headerDom.css('margin-bottom')) + parseFloat(headerDom.css('margin-top'));
        //console.log('  17.4  ');
        var dataWrapper      = $('.leaders_wrapper.leaders_data');
        //console.log('  17.5  ');
        var maxContentHeight = parseFloat(dataWrapper.height());
        //console.log('  17.6  ');
        maxContentHeight     = maxContentHeight - headerHeight;
        //console.log('  17.7  ');
        var leaderList       = $('.leaders_wrapper .leaders_list').first();
        //console.log('  17.8  ');
        var leadersDetails   = $('.leaders_wrapper .leaders_details').first();
        //console.log('  17.9.  ');
        var listItemHeight   = parseFloat(leaderList.height());
        //console.log('  17.10  ');
        var leaderDetailsHeight = parseFloat(leadersDetails.height());	
        //console.log('  17.11  ');;
        var leaderListMargin    = (maxContentHeight - listItemHeight)/2;
        //console.log('  17.12  ');
        var leaderDetailsMargin = (maxContentHeight - leaderDetailsHeight)/2;
        //console.log('  17.13  ');
        
        
        /* Adjust video width and height to keep it in background */
        $(".videoContainer").css('height', window_height+'px');
        //console.log('  17.14  ');
        var videoTag = $(".videoContainer").children();
        //console.log('  17.15  ');
        videoTag.attr('width', $(".videoContainer").width() + 'px');
        //console.log('  17.16  ');
        videoTag.attr('height', window_height+'px');
        //console.log('  17.17  ');
        /* adjust margin-top of listing and details to keep in in middle of screen */
        if(leaderListMargin<0){ leaderListMargin = 0;}
        //console.log('  17.18  ');
        if(leaderDetailsMargin<0){ leaderDetailsMargin = 0;}
        //console.log('  17.19  ');
        leaderList.css('margin-top', leaderListMargin+'px');
        //console.log('  17.20  ');
        leadersDetails.css('margin-top', leaderDetailsMargin+'px');
        //console.log('  17.21  ');
        return;
    },
    
    /*
	 * Change the highlited section. This function works inside a setInterve function
	 */
    startAnimation : function(AllAdminConsoleData,component,AllSeletedLeaders,i){
        "use strict";       
        var handler = this;
        //alert(next);
        //this.getAdminConsoleData(next,component,nextIteration);
        var leadersListWrapper = $('.leaders_wrapper .leaders_list');
        //console.log(leadersListWrapper);
        var leaderList  = leadersListWrapper.find('ul').first();
        //console.log(leaderList);
        var maxListToDisplay   = leadersListWrapper.attr('data-visible-count');       
        var activeListItem     = leaderList.find('li.active');       
        var nextActiveListItem = activeListItem.next();    
        var style = {
            'inactiveBackground' : leaderList.attr('data-background-inactive'),
            'activeBackground' :  leaderList.attr('data-background-active'),
            'activeClass' :  leaderList.attr('data-active-class'),
            'inactiveClass' :  leaderList.attr('data-inactive-class')
        };
        activeListItem.removeClass('active');
        if(style.inactiveClass){           
            activeListItem.addClass(style.inactiveClass);
        }
        if(style.activeClass){           
            activeListItem.removeClass(style.activeClass);
        }
        
        if(style.inactiveBackground){            
            activeListItem.css('backgroundColor', style.inactiveBackground);
        }        
        if(nextActiveListItem.length == 0){             
            nextActiveListItem = leaderList.find('li').first();                     
        }
        nextActiveListItem.addClass('active');
        if(style.activeClass){
            nextActiveListItem.addClass(style.activeClass);
        }
        if(style.inactiveClass){
            nextActiveListItem.removeClass(style.inactiveClass);
        }
        if(style.activeBackground){
            nextActiveListItem.css('backgroundColor', style.activeBackground);
        }       
        this.limitListItemDisplay(leaderList, maxListToDisplay);
        this.switchDetailInfo();      
        return;
    },    
    /*
	 * To switch the score card leader info
	 */
    switchDetailInfo : function(){
        //console.log('  28  ');
        var leaderItems = $('.leaders_wrapper .leaders_details ul');
        var activeLeaderItem = leaderItems.find('li.leader_active');
        var nextActiveLeaderItem = activeLeaderItem.next();
        activeLeaderItem.removeClass('leader_active');
        if(nextActiveLeaderItem.length == 0){
            //console.log('  28.1  ');
            nextActiveLeaderItem = leaderItems.find('li').first();
        }
        nextActiveLeaderItem.addClass('leader_active');
        //console.log('  29  ');
        return;
    },
    /*
	 * Restrict the visibllity of leaders list based on visible list count
	 */
    updateMaxVisibleLeadersList: function(visibleCount){
        //console.log('  15.51  ');
        var leadersListWrapper = $('.leaders_list');
        //console.log('  15.52  ');
        var leaderListItemHeight = this.getHeightOfOneItem(leadersListWrapper.find('li').not('.active').first());
         //console.log('  15.55  ');
        leadersListWrapper.height(leaderListItemHeight * visibleCount);
        leadersListWrapper.attr('data-visible-count', visibleCount);
         //console.log('  15.56  ');
        return;
    },
    /*
	 * return the height of one leaders listing item
	 */
    getHeightOfOneItem : function(leaderListLi){
         //console.log('  15.53  ');
        var leaderListLiHeight  = parseFloat(leaderListLi.height());
        var leaderListLiPadding = parseFloat(leaderListLi.css('padding-top')) + parseFloat(leaderListLi.css('padding-bottom'));
        var leaderListLiMargin  = parseFloat(leaderListLi.css('margin-top')) + parseFloat(leaderListLi.css('margin-bottom'));
        var borderHeight        = parseFloat(leaderListLi.css('border-top-width')) + parseFloat(leaderListLi.css('border-bottom-width'));
        var totalHeight = leaderListLiHeight + leaderListLiPadding + leaderListLiMargin + borderHeight;
         //console.log('  15.54  ');
        return totalHeight;
    },
    
    
    /*
	 * Change the foucs of the leaders list
	 */
    limitListItemDisplay : function(leaderList, visibleListCount){
	    //console.log('  26  ');        
        var leadersListWrapper  = leaderList.parent();
        var leaderListLi        = leaderList.find('li').not('.active').first();
        var leaderListLiCount   = leaderList.find('li').length;
        var leaderListItemHeight = this.getHeightOfOneItem(leaderListLi);
        
        var leaderListItemTotalHeight = leaderListItemHeight * leaderListLiCount;
        
        var leaderListTop = parseFloat(leaderList.css('top'));
        var leaderListWrapperHeight = parseFloat(leadersListWrapper.height());
        var FractionToChange = null;
        
        var indexOfActiveitem = leaderList.find('li.active').index();
        var maxVisibleHeight  = indexOfActiveitem * leaderListItemHeight;
        var minVisibleHeight  = ((indexOfActiveitem -1) * leaderListItemHeight);
        
        var leaderListHeightDiff = leaderListWrapperHeight + leaderListTop;
        if(visibleListCount - 1 < indexOfActiveitem){
            FractionToChange = '-='+leaderListItemHeight;
        }
        if(indexOfActiveitem == 0){
            FractionToChange = '0px';
        }
        if(FractionToChange !== null){
            leaderList.animate({
                top: FractionToChange,
            }, 200, "linear");
        }
        //console.log('  27  ');  
        return;
    },
    
    /*
	 * Return the no of sliders that should be displayed in the animation
	 */
    getNoOfSlideToDisplay: function(leadersData){
        //console.log('  15.13  ');
        var no = 5;
        if(leadersData.slideInfo.noOfVisibleSlide !== 'undefined'){
            //console.log('  15.14  ');
            if(parseInt(leadersData.slideInfo.noOfVisibleSlide)){
                 //console.log('  15.15  ');
                no = parseInt(leadersData.slideInfo.noOfVisibleSlide);
            }
        }
        var totalItems = leadersData.items.length;
        if(no > totalItems){
            //console.log('  15.16  ');
            no = totalItems;
        }
        //console.log('  15.17  ');
        return no;
       
    },
    /* 
	 * return the animation delay duration
	 */
    getAnimationDelay: function(leadersData){
        //console.log('  15.9  ');
        var delay = 2000;
        if(leadersData.slideInfo.slideChangeDelay !== 'undefined'){
             //console.log('  15.10  ');
            if(parseInt(leadersData.slideInfo.slideChangeDelay)){
                 //console.log('  15.11  ');
                delay = parseInt(leadersData.slideInfo.slideChangeDelay);
            }
        }
         //console.log('  15.12  ');
        return delay;
    },     
    getAdminConsoleData : function(AllAdminConsoleData,component,AllSeletedLeaders,i){
        //console.log('	8	');
        AllAdminConsoleData =  component.get('v.AvailableAdminConsoleData'); 
        AllSeletedLeaders =  component.get('v.lstleadres'); 
        var CurentIndex = i;
        var NewAdminConsoleData = AllAdminConsoleData[i];
        var SeletedLeaders1 = AllSeletedLeaders[0].LeaderData; 
        //console.log(AllSeletedLeaders);
        $.each(AllSeletedLeaders , function(index, item){ 
             //console.log('	9	');
             //console.log(NewAdminConsoleData.Id);
             if(item.LeaderDataKey == NewAdminConsoleData.Id){   
                 //console.log('	10	');
                 SeletedLeaders1 = item.LeaderData; 										                                     
             }
        });                  
        var helperhandle = this;
        var leaders_data = this.getLeadersData(NewAdminConsoleData,i,component);                 
        $('.leaders_title').removeClass('hide');
        $('.leaders_details').removeClass('hide');
        $('.loader_01').fadeOut("slow");        
            var seletedLeaders = SeletedLeaders1; 
            if(seletedLeaders == ''){
                //console.log('	11	');
                component.set('v.ErrorMsg', 'No Data found Based on your Configuration');               
            }               
            var userstiles = [];                       
            $.each(seletedLeaders , function(index, LeaderItem){
                //console.log('	12	');
                var info = [];                
                var currentDataItem = LeaderItem.dataItem ;
                var userDeails =  LeaderItem.leader;
                var displayFields = LeaderItem.fiedsToDisplay;                                
                $.each(displayFields, function(k, v){
                    //console.log('	13	');
                    if(!currentDataItem[v]){
                        //console.log('	14	');
                        var infoItem = {
                            'key'   : LeaderItem.labelsOfDisplayingFields[v],
                            'value' : ''
                        };    
                    }
                    else{
                        //console.log('	15	');
                        var infoItem = {
                            'key'   : LeaderItem.labelsOfDisplayingFields[v],
                            'value' : currentDataItem[v]
                        };
                    }
                    info.push(infoItem);
                });                                                                                                              
                var item = {
                    'name' : userDeails.Name,
                    'title' : currentDataItem.Name,
                    'img'   :  userDeails.FullPhotoUrl                             
                };
                item.info = info;
                userstiles.push(item);
            } );
            leaders_data.items = userstiles;
         	//console.log('	15.0	');
            helperhandle.populateBackgroundData(component, leaders_data); 
            //console.log('	15.7	');
            var ScoreAnimationDelay  = helperhandle.getAnimationDelay(leaders_data);
       	    //console.log('  15.12  ');
            var maxListToDisplay = helperhandle.getNoOfSlideToDisplay(leaders_data);
           //console.log('  15.18  ');
            helperhandle.populateTitleArea(leaders_data.slideInfo, leaders_data.style.title);
            //console.log('  15.23  ');
            helperhandle.populateLeadersData(leaders_data);
         	//console.log('  15.50  ');
            helperhandle.updateMaxVisibleLeadersList(maxListToDisplay); 
        	//console.log('  15.57  ');
            helperhandle.adjustForScreen();           
            $(window).resize(function() {
                //console.log('	16	');
                helperhandle.adjustForScreen();
            }).resize();                           
        	var Dtime = ScoreAnimationDelay;
        	//var animationIntervel = setInterval(function(){ helperhandle.startAnimation(AllAdminConsoleData,component,AllSeletedLeaders,CurentIndex)}, ScoreAnimationDelay);
        	$.each(seletedLeaders, function(k, v){               
                if(seletedLeaders.length-1 != k ){                   
        			setTimeout(function(){                        
                        helperhandle.startAnimation(AllAdminConsoleData,component,AllSeletedLeaders,CurentIndex); }, Dtime );                   
                }
                else{
                  if(AllAdminConsoleData.length-1 == CurentIndex ){                     
                      //setTimeout(function(){ helperhandle.getAdminConsoleData(AllAdminConsoleData,component,AllSeletedLeaders,0) }, Dtime );                      
                  }
                  else{                      
                    	setTimeout(function(){ 
                            helperhandle.getAdminConsoleData(AllAdminConsoleData,component,AllSeletedLeaders,CurentIndex+1); 
                            $('.leaders_wrapper .leaders_list').find('ul').first().animate({
                                top: 0 + 'px',
                            }, 200, "linear");
                        }, Dtime );   
                  }
                }
                Dtime += ScoreAnimationDelay ;                
            });        
        return;
    }
})