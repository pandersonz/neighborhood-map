//Attrib
let map, location2=[], locationCoord=[], listTitle = [], listCoord=[], markers = [], flag=false,arrayContent;
var market;
var infowindow=[];
arrayContent=["plaza principal de trinidad","colegio cuadrangular fundado el xxxx","areopuerto de la ciudad","arroyo san juan","iglesia cuadrangular"];
//main
$(document).ready(function(){
$('#txtFind').click(function(e){
  //alert('entro');
  if($('#menuFind').hasClass('MenuFind'))
  {
    hideMenu();
    resetMark(null);
    flag=false;
    removeInMenu();
  }
  else {
    showMenu();
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
function showMenu()
{
  $('#menuFind').removeClass();
  $('#menuFind').addClass('MenuFind');
}
function hideMenu()
{
  $('#menuFind').removeClass();
  $('#menuFind').addClass('MenuFindHidden');
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
//SOLUCIONAR NO SALEN LOS MENSAGES QUE DEBEN CUANDO SE HACE BUSQUEDA
function markMessage(x,content){
  //alert(x);
  infowindow[x]= new google.maps.InfoWindow({
    content: content[x]
  });
  markers[x].addListener('click', function() {
    infowindow[x].open(map, markers[x]);
    toggleBounce(x);
    });
}
//create the mark in the map
function mark(title, coord, pos){
  console.log(coord);
  
  market= new google.maps.Marker({
    position: coord,
    map: map,
    title: title,
    draggable: true,
    animation: google.maps.Animation.DROP
  });
    markers.push(market); 
    
}
//SOLUCIONAR NO SALTAN LOS QUE DEBEN
function toggleBounce(x) {
  if (markers[x].getAnimation() !== null) {
    markers[x].setAnimation(null);
  } else {
    markers[x].setAnimation(google.maps.Animation.BOUNCE);
  }
}
//show or remove mark dependent of the parameter
function setMapAll(map,content) {
  //alert(markers.length);
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
    markMessage(i,arrayContent);
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
      var idButtom="buttom"+x;
      $('#menuFind').append("<div class='buttom' id='"+idButtom.toString()+"' onClick=onlyOneMark("+x+")><p style='color: white'>"+listDestiny[x]+"</p></div>");    
      d=listDestiny[x];
      console.log(d);
      c=listCoordMark[x];
      console.log(c);
      mark(d,c,x);
    }
  }
  setMapAll(map);
}
//select one mark with one click in its name
function onlyOneMark(id)
{
var idjQuery = "#buttom"+id+" p";
$('#txtFind').val($(idjQuery.toString()).html());
desployMenu($('#txtFind').val());
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
      showMenu();
      flag=true;
    }   
    else{
      resetMark(null);
      flag=false;
      removeInMenu();
      hideMenu();
    }
    
  }
  else if(e.which===8 && $('#txtFind').val()==="")
  {   
      resetMark(null);
      removeInMenu(); 
      hideMenu();  
  }
  else {
    showMenu();
    findForChar($('#txtFind').val());
    addInMenu(listTitle, listCoord);
  }
}
