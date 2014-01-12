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
        var workAreaHeight = $(window).height() - parseInt($('body').css('padding-top'));
        $('.work-area').height(workAreaHeight);
        $('#influences-area .sidebar').height(workAreaHeight);
        
        var infToolbarHeight = ($('#influences-area .toolbar').outerHeight()|46);        
        $('#influences-area .language').height(workAreaHeight - infToolbarHeight);   
    }
    
    $(window).resize(function(){
        adjust();
    });
    
    adjust();
    
    $('#overview-area').show();
    
    $('#influences-area .toolbar .btn-group [title]').tooltip({
      container: 'body'
    });
    
    $('#influences-area .toolbar .btn').hover(
      function() {  $(this).removeClass('btn-primary'); 
                    $(this).addClass('btn-info'); },
      function() {  $(this).removeClass('btn-info');
                    $(this).addClass('btn-primary'); }
    );
    
});