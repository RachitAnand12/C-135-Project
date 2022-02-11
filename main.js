objects = 0;
status = "";


function setup() {
  canvas = createCanvas(450, 400);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(450,400);
  video.hide();
}

function modelLoaded() {
  console.log("Model Loaded!")
}

function start()
{
  objectDetector = ml5.objectDetector("cocossd", modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
  object_name = document.getElementById("object_name").value;
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}

function draw() {
  image(video, 0, 0, 450, 400);
      if(status != ""){

        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "Status : Object has been found!!";
          
          fill("#FF0000");
          percentange = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percentange + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke("#FF0000");
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

         
          if(objects[i].label == object_name)
          {
            video.stop();
            objectDetector.detect(gotResult);
            document.getElementById("object_status").innerHTML = object_name + " Found";
            synth = window.speechSynthesis;
            utterThis = new SpeechSynthesisUtterance(object_name + "Found");
            synth.speak(utterThis);
          }
          else
          {
            document.getElementById("object_status").innerHTML = object_name + " Not Found";
          }          
         }
      }
}

