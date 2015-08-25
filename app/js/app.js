console.log("LOADED");
var api = impress();
api.init();
var bored = $('#bored');
var totes = $('#totes');
var song = $('#song');
var body = $('body');
var windypic = $('#windypic');
var debug = window.location.href.search(/localhost/) >= 0;
console.log(debug);

setWindyRatio();
setupTotes();
setupStadium();
setupSlides();

function setWindyRatio(){

  $(window).on('resize', doWindyCalc);
  doWindyCalc();

  function doWindyCalc(){
    var width = body.width();
    var height = body.height();

    if(width/height >= 1.85){
      windypic.css({
        width: '100%',
        left: '0px',
        height: '',
        top: '0px'
      })
    } else {
      windypic.css({
        height: '110%',
        top: '-5%',
        width: '',
        left:'0px'
      })
    }
  }
}

function setupTotes(){
  var timer =  undefined;
  var s = song[0];
  totes.removeClass('done-ready1');

  totes.on('impress:stepenter', function(e){

    s.play();
    //if(debug) s.currentTime = 40;
    if(timer == undefined){
      timer = setTimeout(function(){
        totes.addClass('done-ready1');
      }, 22000);
    }
  });
  song.on('timeupdate', totesTime1);
  function totesTime1(e){
    if(s.currentTime >= 48.4){
      song.off('timeupdate', totesTime1);
      console.log('let\'s rock');
      api.next();
    }
  }

}

function setupStadium(){
  $('#stadium').on('impress:stepenter', function(){

  });
}

function setupSlides(){
  $('[class*=slide]').on('impress:stepenter', slider);
}

function slider(){
  var delay = parseInt($(this).attr('delay'), 10) || 12000;
  setTimeout(function(){
    api.next();
  }, delay);
}



//48.4 is when rock starts