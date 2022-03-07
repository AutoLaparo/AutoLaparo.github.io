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
    var dataset = document.getElementById('Dataset');
    // console.log(dataset);
    
    // console.log(dataset.options[dataset.selectedIndex].value);

    // console.log(name);
    // console.log(email);

    add_data(name,email,institution,dataset);

    


}



function getInputVal(id){

    return document.getElementById(id).value;

}


function add_data(name, email,institution,dataset){

    db.collection("download_register").add({
       Name:name,
       Email:email,
       Institution:institution,
       Dataset:dataset

    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });



}

