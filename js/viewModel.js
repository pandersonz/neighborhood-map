var idMenu ="";
var flagV = false
var viewModel = {      
        filterQuery : ko.observable(''),
        ArrayMenu: ko.observableArray([]),
        functFilter : function (){
        desployMenu();
        },
        functSelectOne: function(title){        
            idMenu=title();
            
            if(flagV===true)
            {
                if(flagSearch===false)
                {
                onlyOneMark(idMenu,locationTitle);
                }
                else
                {
                onlyOneMark(idMenu,listDest);
                }
            }
        }
};

function viewMenu(ti){
    this.title=ko.observable(ti)
}
ko.applyBindings(viewModel);
viewModel.filterQuery.subscribe(function(){
    viewModel.functFilter();
});

