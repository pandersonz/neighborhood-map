//Attrib
let map, locationTitle=[], locationCoord=[], listTitle = [], listCoord=[], markers = [],listDest=[], flag=false;
var market, infowindow, infowindows=[],flagSearch=false;

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
  addInMenu(locationTitle, locationCoord);
  flagV=true;
}

//initialize the array
function inizileArray(location){
  for(let x=0;x<location.length;x++)
  {
    locationTitle[x]=location[x].title;
    locationCoord[x]=location[x].location;
  }
}

function markMessage(x){
  markers[x].addListener('click', function() {
    closeAnimationAndMessage();
    infowindows[x].open(map, markers[x]);
    AnimationMark(x);
    });
}
function closeAnimationAndMessage()
{
  for(let i=0; i<markers.length;i++)
  {
    markers[i].setAnimation(null);
    infowindows[i].close();
  }
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
  
  markers[x].setAnimation(google.maps.Animation.BOUNCE);
}
//show or remove mark dependent of the parameter
function setMapAll(map) {
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
 viewModel.ArrayMenu.length=0;
}
//search for a string given by the input
function findForChar(val)
{

  
  listTitle=[];
  listCoord=[];
  let flag = false;
    for(let x=0; x<locationTitle.length;x++)
    {       
      if(locationTitle[x].toUpperCase().indexOf(val.toUpperCase())>-1)
      {
          listTitle[x]=locationTitle[x];    
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
  let destiny, coordDestiny, pos=0;;
  listDest=[];
  for(let x=0;x<listDestiny.length;x++)
  {
    if(listDestiny[x]!=undefined)
    {
      listDest[pos]=listDestiny[x];
      coordDestiny=listCoordMark[x];   
      viewModel.ArrayMenu.push(new viewMenu(listDest[pos]));     
      mark(listDest[pos],coordDestiny);   
      pos++;  
    }
  }
  console.log(listDest+"addin menu Array"); 
  setMapAll(map);
  
}
//select one mark with one click in its name
function onlyOneMark(id,l)
{
  
  
    for(let x=0;x<l.length;x++)
    {
      if(l[x]===id)
      {       
        closeAnimationAndMessage();
        AnimationMark(x);
        infowindows[x].open(map, markers[x]);
      }
    }
    
 
 
}
function removeInMenu(){
  viewModel.ArrayMenu.length=0;
  $('#menuFind').empty();
}
//unfold the menu
function desployMenu(){

    flagV=false;
    flagSearch=true;
    findForChar(viewModel.filterQuery());  
    console.log(listTitle);    
    addInMenu(listTitle, listCoord);
    flagV=true;
    
 
}

//Functions api
//fourSquare
/* parameter:
mar=Marked
c=Coordenade
t=title
info=infoWindows
*/
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
//error api map
function errorMap(){
  alert("The map could not be loaded from google map, please try to reload the page");
}


