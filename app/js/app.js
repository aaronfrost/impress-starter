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
//song.on('timeupdate', function(){
//  console.log(song[0].currentTime)
//});

var sliderTimer;
var songStarted = false;

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

  totes.on('impress:stepenter', function(e){
    removeDoneClasses();
    clearTimeout(sliderTimer);
    playSongIfNotPlaying();
    s.currentTime = 0;


    if(timer == undefined){
      timer = setTimeout(function(){
        totes.addClass('done-ready1');
        timer = setTimeout(function(){
          totes.addClass('done-ready2');
          timer = setTimeout(function(){
            totes.addClass('done-ready3');
          }, 20000);
        }, 20000);
      }, 20000);
    }
  }).on('impress:stepleave', function(e){
    removeDoneClasses();
    clearInterval(timer);
    song.off('timeupdate', totesTime1);
  });

  song.on('timeupdate', totesTime1);
  function totesTime1(e){
    if(s.currentTime >= 80.4){
      song.off('timeupdate', totesTime1);
      api.next();
    }
  }
  function removeDoneClasses(){
    totes.removeClass('done-ready1');
    totes.removeClass('done-ready2');
    totes.removeClass('done-ready3');
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
  var s = song[0];
  var stepName = getCurrentStepName();
  var musicMapItem = musicStepMap[stepName];
  console.log(stepName, s.currentTime);
  playSongIfNotPlaying();

  if(musicMapItem){
    if(s.currentTime < musicMapItem.time[0] || s.currentTime > musicMapItem.time[1]){
      s.currentTime = (musicMapItem.time[0] + .44);
    }
  }

  clearTimeout(sliderTimer);
  var delay = parseInt($(this).attr('delay'), 10) || 14000;
  sliderTimer = setTimeout(function(){
    api.next();
  }, delay);
}

var musicStepMap = {
  totes:{
    time : [0, 2]
  },
  'step-3':{
    time:[81, 82]
  },
  'step-4':{
    time:[96, 97]
  },
  'step-5':{
    time:[111, 112]
  },
  'step-6':{
    time:[126, 127]
  },
  'step-7':{
    time:[141, 142]
  },
  'step-8':{
    time:[156, 157]
  },
  'step-9':{
    time:[171, 172]
  },
  'step-12':{
    time:[216, 217]
  },
  'step-15':{
    time:[261, 262]
  },
  'step-18':{
    time:[300, 301]
  },
  'step-21':{
    time:[327, 328]
  }
};

function getCurrentStepName(){
  var name;
  for (var i=0, l=document.body.classList.length; i<l; ++i) {
    if(/impress-on-.*/.test(document.body.classList[i])){
      name = document.body.classList[i];
      break;
    }
  }
  return name.replace('impress-on-', "");
}

function playSongIfNotPlaying(){
  var s = song[0];
  if(!songStarted){
    s.play();
    s.songStarted = true;
  }
}



//48.4 is when rock starts