

var firebaseConfig = {
  apiKey: "AIzaSyC1OxUG4b6B12CEXTkA_jlT6hGv_nGYK3c",
  authDomain: "website-record-f6fc7.firebaseapp.com",
  projectId: "website-record-f6fc7",
  storageBucket: "website-record-f6fc7.appspot.com",
  messagingSenderId: "5233576507",
  appId: "1:5233576507:web:fbf9cc410935549a8aea1e",
  measurementId: "G-Q5LDR0WJ7S"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


var db = firebase.firestore();

function get_time(){
  var today = new Date();
  var date = today.getFullYear()+'-'+('00'+(today.getMonth()+1)).slice(-2)+'-'+('00'+today.getDate()).slice(-2);
  var time = today.getHours() + ":" + ('00'+today.getMinutes()).slice(-2) + ":" + ('00'+today.getSeconds()).slice(-2);
  return [date,time];

}



function text(url) {
    // console.log("Testing1")
    return fetch(url).then(res => res.text());
}

document.getElementById('downloadform').addEventListener('submit',
submitForm);

function submitForm(e){
    
    e.preventDefault();
    // console.log("check1");

    var name = getInputVal('Name');
    // console.log("checkname");
    var email = getInputVal('Email' );
    // console.log("checkemail");
    var institution = getInputVal('Institution');
    // console.log("checkinsti");
    var dataset_choice = document.getElementById('Dataset');
    var dataset = dataset_choice.options[dataset_choice.selectedIndex].value
    var dateTime=get_time();
    var date = dateTime[0], time=dateTime[1]
    // console.log(date,time);
 
    // console.log(dataset);
     
    // console.log(dataset.options[dataset.selectedIndex].value);
    
    // console.log(name);
    // console.log(email);


    // console.log("checked")
    

    
    add_data(name,email,institution,dataset,date,time);

    


}



function getInputVal(id){

    return document.getElementById(id).value;

}


function add_data(name, email,institution,dataset,date,time){


  text('https://www.cloudflare.com/cdn-cgi/trace').then(data => {
    
    let ipRegex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/;
    ip = data.match(ipRegex)[0];
    // console.log(docRef)
    db.collection("download_register").doc(email).collection(dataset).add({
       Name:name,
       Email:email,
       Institution:institution,
       Dataset:dataset,
       Date:date,
       Time:time,
       IP:ip

    })
    .then((email) => {
        console.log("Document written with ID: ", email);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
  });
  var docRef = db.collection("Dataset").doc('Link');
  
  docRef.get().then((doc) => {
    if (doc.exists) {
      
      console.log("Document data:", doc.data()[dataset]);
      // postToURL("https://formspree.io/f/xdobdkzy","q","a");
      
      
      if (window.confirm("Request Succeeded! Click OK to download "+dataset+ " Dataset."))
      {
        document.getElementById('downloadform').action = 'https://formspree.io/f/xdobdkzy';
        document.getElementById('downloadform').submit();
        console.log("getting document:");
        // window.open(
        //   doc.data()[dataset],
        //   // '_blank' // <- This is what makes it open in a new window.
        // );
        
        location.href = doc.data()[dataset];
        
      }

    }else {
      // doc.data() will be undefined in this case
    console.log("No such document!");
    }
  }).catch((error) => {
    console.log("Error getting document:", error);
  });



  

}


// import { doc, getDoc } from "firebase/firestore";

// })

// const docSnap = db.getDoc(docRef)
// console.log(docSnap)


