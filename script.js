import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyB3XTAc3PxCrUwCs9HHanGH5plJcgtgmoo",
    authDomain: "test-50e33.firebaseapp.com",
    databaseURL: "https://test-50e33-default-rtdb.firebaseio.com",
    projectId: "test-50e33",
    storageBucket: "test-50e33.appspot.com",
    messagingSenderId: "883655491563",
    appId: "1:883655491563:web:b5890cc140c02dda05e3ae"
  };

  // Initialize Firebase
  //const app = initializeApp(firebaseConfig);
  firebase.initializeApp(firebaseConfig);


let tweetsJSON = {
  "tweet": "Tweet 1",
  "author": "User1",
  "pic": "https://www.kindpng.com/picc/m/111-1114911_person-icon-png-download-icono-usuario-png-transparent.png"
};


//TODO: implement date, new Date().getTime()
let renderTweet = (tweetObject, uuid)=>{
  $("#tweets").prepend(`
  <div class="card mb-3 tweet" data-uuid="${uuid}" style="max-width: 540px; margin: auto; min-height: 50px; padding: 5px 5px; background-color: #A8B2E7; border: 10px;">
    <div class="col-md-4">
      <img src="${tweetObject.pic}" class=img-fluid rounded-start" alt="...">
    </div>
    <div class="row g-0">
    <div class="col-md-0">
      <div class="card-body">
        <p1>${tweetObject.tweet}</p1>
        <h6 style="text-align: right">- ${tweetObject.author}</h6>
        <h6 style="text-align: right">- ${tweetObject.time}</h6>
      </div>
    </div>
    </div>
  </div>
  `);
}

let tweetsRef = firebase.database().ref("tweets");

 firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    $("#postbutton").on("click", ()=>{
  
  var thetweet = $("#addtweet").val();
  var theuser = user.displayName;
  var theimage = user.photoURL;
      var month = new Date().getMonth();
      var date = new Date().getDate();
      var year = new Date().getFullYear();
  var thetime = month + "/" +  date + "/" + year;
  var atweet = {
    tweet: thetweet,
    author: theuser,
    pic: theimage,
    time: thetime
  }
  let newTweetRef = tweetsRef.push();
  firebase.database().ref(newTweetRef).set(atweet);
});
    $("#signoutbutton").on("click", ()=>{
      firebase.auth().signOut();
    });
  } else {
    var provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().signInWithRedirect(provider);
firebase.auth().getRedirectResult().then((result) => {
  if (result.credential) {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // ...
    }
    // The signed-in user info.
    var user = result.user;
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
});
  }
})

  
  //create account



firebase.database().ref(tweetsRef).on('child_added', (ss)=>{
  let tweetsObject = ss.val();
  
  renderTweet(tweetsObject, ss.key);
  
  });
  

  
  //let tweetIDs = Object.keys(tweetsObj);
  //$("#tweets").html('');
  //tweetIDs.map(anID=>{
    //let theTweet = tweetsObj[anID];
    //$("#tweets").append(`<div>${theTweet.tweet}</div>`);
  //});