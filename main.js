function setup() {
    canvas = createCanvas(700, 600);
    canvas.center();
    Video = createCapture(VIDEO);
    Video.hide();
    poseNet = ml5.poseNet(Video, modelLoaded);
    poseNet.on("pose", gotPoses);
}
leftwristx = "";
leftwristy = "";
rightwristx = "";
rightwristy = "";
scoreleftwrist = "";
scorerightwrist = "";
sound1 = "";
sound2 = "";
songstatus = "";
song2status = "";

function modelLoaded() {
    console.log("model has loaded");
}

function gotPoses(results) {
    if (results.length > 0) {
        leftwristx = results[0].pose.leftWrist.x;
        leftwristy = results[0].pose.leftWrist.y;
        scorerightwrist = results[0].pose.keypoints[10].score;
        scoreleftwrist = results[0].pose.keypoints[9].score;
        console.log("score left wrist=" + scoreleftwrist + ", score right wrist=" + scorerightwrist);
        console.log("left wrist x=" + leftwristx + ", left wrist y=" + leftwristy);
        rightwristx = results[0].pose.rightWrist.x;
        rightwristy = results[0].pose.rightWrist.y;
        console.log(" right wrist x=" + rightwristx + ",  right wrist y=" + rightwristy);
    }

}



function draw() {
    image(Video, 0, 0, 700, 600);
    sound.play();
    sound.setVolume(0.5);
    sound.rate(1);
    stroke("#ff4d88");
    fill("#ff4d88");
    if (scoreleftwrist > 0.2) {
        circle(leftwristx, leftwristy, 30);
        if (leftwristy > 0 && leftwristy <= 600) {
            song2status = song2.isPlaying();
            if (soundstatus = true) {
                sound.stop();
                sound2.play();
                sound2.setVolume(0.5);
                sound2.rate(1);
            }
        }
    }
    if (scorerightwrist > 0.2) {
        circle(rightwristx, rightwristy, 30);
        if (rightwristy > 0 && rightwristy <= 600) {
            songstatus = song.isPlaying();
            if (sound2status = true) {
                sound2.stop();
                sound.play();
                sound.setVolume(0.5);
                sound.rate(1);
            }

        }
    }
}

function preload() {
    sound = loadSound("Empire.mp3");
    sound2 = loadSound("How You Like That.mp3");
}