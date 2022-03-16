

var firebaseConfig = {
    apiKey: "AIzaSyBwV9s3L6XmwBGTlcJOflXMuHHrYizEay0",
    authDomain: "website-record.firebaseapp.com",
    projectId: "website-record",
    storageBucket: "website-record.appspot.com",
    messagingSenderId: "9861550336",
    appId: "1:9861550336:web:d0778cda402e84e96be3e5",
    measurementId: "G-N7MRM28KJP"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


var db = firebase.firestore();

function get_time(){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date+' '+time;
  
  }

function text(url) {
    return fetch(url).then(res => res.text());
}

document.getElementById('downloadform').addEventListener('submit',
submitForm);

function submitForm(e){
    
    e.preventDefault();
    console.log("check1");

    var name = getInputVal('Name');
    console.log("checkname");
    var email = getInputVal('Email' );
    console.log("checkemail");
    var institution = getInputVal('Institution');
    console.log("checkinsti");
    var dataset_choice = document.getElementById('Dataset');
    var dataset = dataset_choice.options[dataset_choice.selectedIndex].value
    var date = get_time();
 
    console.log(dataset);
     
    // console.log(dataset.options[dataset.selectedIndex].value);
    
    console.log(name);
    console.log(email);
    console.log(date);

    console.log("checked")
    alert("You request is submitted! Dataset information will be sent to your email.");

    location.href = "index.html";
    add_data(name,email,institution,dataset,date);

    


}



function getInputVal(id){

    return document.getElementById(id).value;

}


function add_data(name, email,institution,dataset,date){


  text('https://www.cloudflare.com/cdn-cgi/trace').then(data => {
    
    let ipRegex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/;
    ip = data.match(ipRegex)[0];
    
    db.collection("download_register").orderBy("", "desc").doc(email).add({
       Name:name,
       Email:email,
       Institution:institution,
       Dataset:dataset,
       Date:date,
       IP:ip

    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
  });


}

