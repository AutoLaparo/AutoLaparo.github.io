
//const database = firebase.firestore();
//const database = firebase.database();
function get_time(){
  var today = new Date();
  var date = today.getFullYear()+'-'+('00'+today.getMonth()+1).slice(-2)+'-'+('00'+today.getDate()).slice(-2);
  var time = today.getHours() + ":" + ('00'+today.getMinutes()).slice(-2) + ":" + ('00'+today.getSeconds()).slice(-2);
  return date+' '+time;

}
var dateTime=get_time();
console.log(dateTime);

function text(url) {
    return fetch(url).then(res => res.text());
}

text('https://www.cloudflare.com/cdn-cgi/trace').then(data => {
  let ipRegex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/
  let ip = data.match(ipRegex)[0];
  
  console.log(ip);

  firebase.firestore().collection("visit-ip-record").orderBy("", "desc").doc(dateTime).set({
    
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


