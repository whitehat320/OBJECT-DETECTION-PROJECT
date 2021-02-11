img = '';
status = '';
object1_confidence = 0;
object1_name = "";
object2_confidence = 0;
object2_name = "";


function preload(){
    img = loadImage('room.jpg');
}

function modelLoaded(){
    console.log('Model Loaded !');
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results){
    document.getElementById("status").innerHTML = "Status : DETECTED Object";

    object1_confidence = results[0].confidence.toFixed(2);
    object1_name = results[0].label;
    object2_confidence = results[1].confidence.toFixed(2);
    object2_name = results[1].label;

    if(error){
        console.log(error);
    }
    console.log(results);

    console.log("Confidence = " + object1_confidence + " name = " + object1_name)
    
}

function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();

    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Object";
}

function draw(){
    image(img , 0 , 0 , 640 , 420);
    textSize(30);


    fill("#FF0000");
    text(object1_name + " " + object1_confidence*100 + "%", 355 , 175);
    noFill();
    stroke("#FF0000");
    rect(120,150,370,230);
}