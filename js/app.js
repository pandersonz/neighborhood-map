//Attrib
let map, location2=[], locationCoord=[], listTitle = [], listCoord=[], markers = [], flag=false, cc,tt,tFind;
var market, infowindow, infowindows=[];
//inicialize obj viewmodel
tFind=new viewModel();
//Attrib API fourSquare
var  clientID = "U2EL1IZE2JQUXYE1JRS2RXS3KS3UPRJ0NKAB5SSOD5GATE3T";
var  clientSecret ="IPD1HZM0QMIGAVLSDKHBNNFKQ02NEE4RVQ3F2PF222MWO1MC";
//Asigned attribute id and secret to url
function apiUrl(idclient,secretclient,cor,ti)
{
var apiUrl ='https://api.foursquare.com/v2/venues/search?ll=' + cor.lat + ',' + cor.lng + 
            '&client_id=' + idclient +'&client_secret=' + secretclient + '&query=' + ti +
            '&v=20170708' + '&m=foursquare';
return apiUrl.toString();
}
//main
$(document).ready(function(){
$('#txtFind').click(function(e){
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
    zoom: 15
  }); 

  var location = [
    {title: 'Plaza Principal José Ballivián',  location:{lat: -14.834991, lng: -64.903790} },
    {title: 'Saltenas Chingolas',  location:{lat: -14.835045, lng: -64.906800} },
    {title: 'El Tabano',  location:{lat: -14.838037, lng: -64.908804} },
    {title: 'La Estancia',  location:{lat: -14.839857, lng: -64.903700} },
    {title: 'Pacumuto',  location:{lat:  -14.829196, lng: -64.906162} },
    {title: 'Aeropuerto de trinidad',  location:{lat:  -14.821583, lng: -64.917416} },
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
}

function markMessage(x,content){
  markers[x].addListener('click', function() {
    infowindows[x].open(map, markers[x]);
    AnimationMark(x);
    });
}
//create the mark in the map
function mark(title, coord){
 
  
  market= new google.maps.Marker({
    position: coord,
    map: map,
    title: title,
    draggable: true,
    animation: google.maps.Animation.DROP
  });
  markers.push(market); 
  
  infowindow= new google.maps.InfoWindow();
  apiFourSquare(market,coord,title,infowindow);
  infowindows.push(infowindow);
}

function AnimationMark(x) {
  if (markers[x].getAnimation() !== null) {
    markers[x].setAnimation(null);
  } else {
    markers[x].setAnimation(google.maps.Animation.BOUNCE);
  }
}
//show or remove mark dependent of the parameter
function setMapAll(map,c) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
    markMessage(i);
  }
}
//send parameter to setMapAll for remove mark of the map
function resetMark()
{
  setMapAll(null);
  markers = [];
  infowindows=[];
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
  let d, c,co;
  for(let x=0;x<listDestiny.length;x++)
  {
    if(listDestiny[x]!=undefined)
    {
      var idButtom="buttom"+x;
      $('#menuFind').append("<div class='buttom' id='"+idButtom.toString()+"' onClick=onlyOneMark("+x+")><p style='color: white'>"+listDestiny[x]+"</p></div>");    
      d=listDestiny[x];
      c=listCoordMark[x];
      cc=c;
      tt=co;
      mark(d,c,co);
      
    }
  }
  setMapAll(map,cc);
}
//select one mark with one click in its name
function onlyOneMark(id)
{
var idjQuery = "#buttom"+id+" p";
tFind.find=$(idjQuery.toString()).html();
console.log(tFind.find);
desployMenu(0);
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
  else if(e.which===8 && tFind.find==="")
  {   
      resetMark(null);
      removeInMenu(); 
      hideMenu();  
  }
  else {
    showMenu();
    findForChar(tFind.find);
    addInMenu(listTitle, listCoord);
  }
}

//Functions api
//fourSquare
function apiFourSquare(mar,c,t,info)
{
 var url= apiUrl(clientID,clientSecret,c,t).toString();
$.getJSON(url).done(function(mar) {
  var response = mar.response.venues[0];
  self.msgFourSquare =
      '<h4>' + response.name +
      '</h4>' + '<div>' +
      '<p><h6>Address:</h6> ' + response.location.formattedAddress[0] + '</p>' +
      '<p><h6>Category:</h6> ' + response.categories[0].shortName +'</p>' + 
      '</div>';
  info.setContent( self.msgFourSquare);
}).fail(function() {
  //alert for when foursquare fail
  alert(
      "The data could not be loaded from FourSquare, please try to reload the page."
  );
});
}
