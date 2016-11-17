({

	/* Object data
	 * Function to populate news updates scroll on footer
	 */
    populateEventData : function(data, style){
        var footerObject = $('footer.ftr_01');
        var generatedDom = "<li></li>";
        var totalWidth = 0;
        var speed = style.speed;
        speed = this.checkForOverSpeed(speed);
        if(data.length > 0){
            var scrollDom = footerObject.find('.marquee ul').first();
            var window_width    = parseFloat($(window).width());
            var scrollDomParent = scrollDom.closest('.marq_container');
            var marqueeLabelDom  = footerObject.find('.marquee-sibling');
            var marqueeLabelWidth= parseFloat(marqueeLabelDom.width()) + parseFloat(marqueeLabelDom.css('padding-left'))+ parseFloat(marqueeLabelDom.css('padding-left'));
            if(style.background != ''){
                scrollDomParent.css('backgroundColor', style.background);
                footerObject.css('backgroundColor', style.background);
            }
            if(style.color != ''){
                scrollDomParent.css('color', style.color);
            }
            if(style.font != ''){
                scrollDomParent.css('font-family', style.font);                
            }
            /* Set marquee container width */
            scrollDomParent.css({
	            'margin-left' : marqueeLabelWidth + 'px',
	            'width': window_width - marqueeLabelWidth + 'px'
	        });

            scrollDom.attr('data-event-speed',speed);
            $.each(data, function(index, item){
                generatedDom = $('<li>'+item.Score_Card__Message__c+'</li>');
                generatedDom.attr('data-item-index',index);
                if(index == 0){
                    generatedDom.css('marginLeft', (window_width - marqueeLabelWidth) + 'px');                    
                }
                scrollDom.append(generatedDom);
                totalWidth += parseFloat(generatedDom.width()) + parseFloat(generatedDom.css('padding-left'));
            });
            if(!totalWidth){
                totalWidth = "100%";
            }
            else{
                totalWidth = totalWidth * 2 + 'px';
            }
            scrollDom.css('width',totalWidth);
            footerObject.css('display','block');
            this.startEventAnimation();
        }
        else{
            footerObject.css('display','none');
        }
    },
    /* 
	 * Limit the speed of event animation so that the browser dont crash on overspeed or readability is not having any problem
	 */
    checkForOverSpeed: function(speed){
        if(speed > 0.3){
            speed = 0.3;
        }
        return speed;
    },  
    /*
	 * Animate Event list on footer
	 */
    startEventAnimation: function(){
        var fadeInSpeed   = 100;
        var eventWrapper  = $('footer.ftr_01 .marquee ul');
        var speed         = this.checkForOverSpeed(eventWrapper.attr('data-event-speed'));
        var modifiedDelay = 3000;
        var helperObj     = this;
        var eventItems    = eventWrapper.find('li');
        
        if(eventItems.length > 0){
            var firstEventItem = eventItems.first();
            var widthOfItem = parseFloat(firstEventItem.width()) + parseFloat(firstEventItem.css('padding-left'));
            var firstItemLeft = parseFloat(firstEventItem.css('margin-left'));
            var window_width    = parseFloat($(window).width());
            var footerObject = $('footer.ftr_01');
            var marqueeLabelDom  = footerObject.find('.marquee-sibling');
            var marqueeLabelWidth= parseFloat(marqueeLabelDom.width()) + parseFloat(marqueeLabelDom.css('padding-left'))+ parseFloat(marqueeLabelDom.css('padding-left'));
            modifiedDelay = (widthOfItem +firstItemLeft)/speed;
            firstEventItem.animate({
                'margin-left' : '-'+widthOfItem+'px'
            }, modifiedDelay, 'linear', function(){
                var obj = $(this);
                obj.remove();
                obj.css({marginLeft: '0px', display: 'none' });
                if(obj.attr('data-item-index') == 0){
                    obj.css('marginLeft', (window_width - marqueeLabelWidth) + 'px');                    
                }
                eventWrapper.append(obj);
                eventWrapper.find('li').last().fadeIn(fadeInSpeed);
                helperObj.startEventAnimation();
            });            
            
        }
        
    },
})