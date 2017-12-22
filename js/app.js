//Attrib
let map, location2=[], locationCoord=[], listTitle = [], listCoord=[], markers = [], flag=false;
//main
$(document).ready(function(){
$('#txtFind').click(function(e){
  //alert('entro');
  if($('#menuFind').hasClass('MenuFind'))
  {
    $('#menuFind').removeClass();
    $('#menuFind').addClass('MenuFindHidden');
  }
  else {
    $('#menuFind').removeClass();
    $('#menuFind').addClass('MenuFind');
  }
});
$('#txtFind').keyup(function(e){
  desployMenu(e);
});
});
//function
//initialize the map
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -14.834991, lng: -64.903790},
    zoom: 13
  }); 
  var location = [
    {title: 'Central Place',  location:{lat: -14.834991, lng: -64.903790} },
    {title: 'School Cuadrangular',  location:{lat: -14.826528, lng: -64.891210} },
    {title: 'Areoport',  location:{lat: -14.822927, lng: -64.919311} },
    {title: 'Stream San Juan',  location:{lat: -14.836302, lng: -64.901967} },
    {title: 'Church Cuadrangular',  location:{lat: -14.835098, lng: -64.907695} },
  ]; 
  inizileArray(location);
}
//initialize the array
function inizileArray(location){
  for(let x=0;x<location.length;x++)
  {
    location2[x]=location[x].title;
    locationCoord[x] = location[x].location;
  }
  console.log(location2);
  console.log(locationCoord);
}
//create the mark in the map
function mark(title, coord, pos){
  console.log(coord);
  var market;
  market= new google.maps.Marker({
    position: coord,
    map: map,
    title: title
  });
    markers.push(market); 
}
//show or remove mark dependent of the parameter
function setMapAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}
//send parameter to setMapAll for remove mark of the map
function resetMark()
{
  setMapAll(null);
  markers = [];
}
//search for a string given by the input
function findForChar(val)
{
  listTitle=[];
  listCoord=[];
  let flag = false;
    for(let x=0; x<location2.length;x++)
    {       
      if(location2[x].toUpperCase().indexOf(val.toUpperCase())>-1)
      {
          listTitle[x]=location2[x];    
          listCoord[x]=locationCoord[x]; 
          flag=true;  
      }
  }
}
//create the links in the menu
function addInMenu(listDestiny,listCoordMark)
{
  resetMark();
  removeInMenu();
  let d, c;
  for(let x=0;x<listDestiny.length;x++)
  {
    if(listDestiny[x]!=undefined)
    {
      $('#menuFind').append("<p style='color: white'>"+listDestiny[x]+"</p>");    
      d=listDestiny[x];
      console.log(d);
      c=listCoordMark[x];
      console.log(c);
      mark(d,c,x);
    }
  }
  setMapAll(map);
}
function removeInMenu(){
  $('#menuFind').empty();
}
//unfold the menu
function desployMenu(e){

  if(e.which===13)
  { 
    if(flag===false){
      addInMenu(location2, locationCoord);
      flag=true;
    }   
    else{
      resetMark(null);
      flag=false;
      removeInMenu();
    }
    
  }
  else if(e.which===8)
  {
    if($('#txtFind').val()==="")
    {
      resetMark(null);
      removeInMenu();
    }
  }
  else {
    findForChar($('#txtFind').val());
    addInMenu(listTitle, listCoord);
  }
}
