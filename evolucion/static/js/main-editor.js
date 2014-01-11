$(document).ready(function(){
    
    var areas =  ['overview', 'prose', 'influences', 'stock-and-flow', 'equations', 'behavior'];
    
    for(i in areas){
        $('#'+areas[i]+'-area').hide();
        $('#'+areas[i]+'-link').click(function(){
            var area = this.id.substring(0, this.id.lastIndexOf('-'));
            var idx = areas.indexOf(area);
            areas.splice(idx,1);
            
            for(j in areas){
                $('#'+areas[j]+'-area').hide();
            }
            areas.splice(idx,0,area);
            $('#'+area+'-area').show();
        });
    }
    
    function adjust(){
        var winHeight = $(window).height();
        var padding_top = parseInt($('body').css('padding-top'));
        $('.work-area').height(winHeight-padding_top);
    }
    
    adjust();
    
    $('#overview-area').show();
    
    $(window).resize(function(){
        adjust();
    });
});