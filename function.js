
//const database = firebase.firestore();
//const database = firebase.database();
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;

function text(url) {
    return fetch(url).then(res => res.text());
}
  
text('https://www.cloudflare.com/cdn-cgi/trace').then(data => {
  let ipRegex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/
  let ip = data.match(ipRegex)[0];
  
  console.log(ip);

  firebase.firestore().collection("visit-ip-record").doc(dateTime).set({
    
    "ip-address": ip,
    "dateTime": dateTime
  
  })
  .then((docRef) => {
      console.log("ip: ", ip);
  })
  .catch((error) => {
      console.error("Error adding ip: ", error);
  });
});

