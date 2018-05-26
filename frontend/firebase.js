import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBmErNRB_6zuLdf-MTk03Fa0i1Dx5S-ltM",
  authDomain: "snapdiet-alpha.firebaseapp.com",
  databaseURL: "https://snapdiet-alpha.firebaseio.com",
  storageBucket: "snapdiet-alpha.appspot.com"
};

firebase.initializeApp(config);

export function writeToDatabase(data){
    var database = firebase.database();
    database.ref('/'+data.uid).set(data).then((snapshot) => {
        console.log("Data saved online successfully");
    })
}

export function readFromDatabase(uid){
    return new Promise((resolve,reject) => {
        firebase.database().ref('/'+uid).once('value',(snapshot) => {
            resolve(snapshot.val());   
        });
    });
}


firebase.auth().onAuthStateChanged((user) => {
  if (user != null) {
    console.log("User authentication complete!");
  }
});

export default firebase;

