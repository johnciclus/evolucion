$(document).ready(function(){
    
    var areas =  ['prose', 'influences', 'stock-and-flow', 'equations', 'behavior'];
    
    for(i in areas){
        $('#'+areas[i]+'-area').hide();
        var area = areas.splice(i,1)[0];
        console.log('#'+area+'-link');
        
        $('#'+area+'-link').click(function(){
            this.area = this.id.substring(0, this.id.lastIndexOf('-'));
            for(j in areas){
                $('#'+areas[j]+'-area').hide();
            }
            $('#'+this.area+'-area').show();
        });
        areas.splice(i,0,area);
    }
    
    /*
     
     $('#influences-link').click(function(){
        $('#influences-area').show();
        $('#prose-area').hide();
        $('#stock-and-flow-area').hide();
        $('#equations-area').hide();
        $('#behavior-area').hide();
        //full-container
    });
    $('#stock-and-flow-link').click(function(){
        $('#stock-and-flow-area').show();
        $('#prose-area').hide();
        $('#influences-area').hide();
        $('#equations-area').hide();
        $('#behavior-area').hide();
        //full-container
    });
    $('#equations-link').click(function(){
        $('#equations-area').show();
        $('#prose-area').hide();
        $('#influences-area').hide();
        $('#stock-and-flow-area').hide();
        $('#behavior-area').hide();
        //full-container
    });
    $('#behavior-link').click(function(){
        $('#behavior-area').show();
        $('#prose-area').hide();
        $('#influences-area').hide();
        $('#stock-and-flow-area').hide();
        $('#equations-area').hide();
        //full-container
    });
     
     * */    
});