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
    

    var name = getInputVal('name');
    var email = getInputVal('email' );
    var organiztion = getInputVal('organization');


    console.log(name);
    console.log(email);

    add_data(name,email,organiztion);

    


}



function getInputVal(id){

    return document.getElementById(id).value;

}


function add_data(name, email,organiztion){

    db.collection("download_register").add({
       name:name,
       email:email,
       organiztion:organiztion

    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });



}

