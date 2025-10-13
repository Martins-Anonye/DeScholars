const databaseFirebaselink = require('./FirebaseConnectionUse.js');
const { getDatabase, ref, onValue, onChildAdded, onChildChanged, onChildRemoved, set, child, get } = require("firebase/database");
const { makeid } = require("./MY_GenerateRandomID.js.js.js.js");
const app = databaseFirebaselink.app;
const database = getDatabase(app);
const fs = require('fs');

var dataModelForScreenEmailData = [];


function FetchAllScreen_EmailData_For_Specific_Country(yesToSaveToFile, req, res) {


    //var country = req.query.CountryType;
    var country = "Nigeria";

    //const ref = ref().child('SupportedMedial');
    const reef = ref(database);
    const usersRef = child(reef, 'Tools/Country/' + country + "/ScreenTargetAndEmailAccount");
    // Retrieve new posts as they are added to our database
    onValue(usersRef, (snapshot) => {
        //const newPost = snapshot.val();
        if (snapshot.exists()) {
            myClearAndResetObjectModelForScreenandEmail();


            snapshot.forEach(snapshot2 => {
                // uniqe id push level = snapshot4.key
                console.log(" snapshot2 Key : " + snapshot2.key);


                // var listOfDataInTheKey = [];// array
                var objectOfDataAccessibleByKey = {}; //object
                snapshot2.forEach((child) => {
                    console.log(child.key + ", " + child.val());
                    //we add both key and value
                    //  listOfDataInTheKey.push(child.key + ":" + child.val()); //add to array
                    //listOfDataInTheKey.push(child.val()); // add to array
                    objectOfDataAccessibleByKey[child.key] = child.val();
                    // console.log("intVal", this.intVal);
                });

                myObjectDataModelForScreenEmail(country, snapshot2.key, objectOfDataAccessibleByKey);

            });


            if (yesToSaveToFile == true) {
                writeEmailandPasswordToFileData(dataModelForScreenEmailData, req, res);
            } else {
                res.locals.dataModelForScreenEmailData = dataModelForScreenEmailData;

                res.status(200).render("ScreenAndEmailManager", {});

            }

        } else {
            console.log("Error: No  email and password tols  available");
            res.locals.message = "Error : No  Client Data  available";
            res.status(200).render("PannelControler", {});

        }
    });

}







function FetchAllScreen_EmailData_For_Specific_Country_Customiz(res, req, functionCallBack) {


    var country = req.query.CountryType;
    // var country = "Nigeria";

    //const ref = ref().child('SupportedMedial');
    const reef = ref(database);
    const usersRef = child(reef, 'Tools/Country/' + country + "/ScreenTargetAndEmailAccount");
    // Retrieve new posts as they are added to our database
    onValue(usersRef, (snapshot) => {
        //const newPost = snapshot.val();
        if (snapshot.exists()) {
            myClearAndResetObjectModelForScreenandEmail();


            snapshot.forEach(snapshot2 => {
                // uniqe id push level = snapshot4.key
                console.log(" snapshot2 Key : " + snapshot2.key);


                // var listOfDataInTheKey = [];// array
                var objectOfDataAccessibleByKey = {}; //object
                snapshot2.forEach((child) => {
                    console.log(child.key + ", " + child.val());
                    //we add both key and value
                    //  listOfDataInTheKey.push(child.key + ":" + child.val()); //add to array
                    //listOfDataInTheKey.push(child.val()); // add to array
                    objectOfDataAccessibleByKey[child.key] = child.val();
                    // console.log("intVal", this.intVal);
                });

                myObjectDataModelForScreenEmail(country, snapshot2.key, objectOfDataAccessibleByKey);

            });


            functionCall: (function exe() {
                res.locals.dataModelForScreenEmailData = dataModelForScreenEmailData;
                functionCallBack();
            })();


        }
    });

}



function myClearAndResetObjectModelForScreenandEmail() {
    dataModelForScreenEmailData = [];// empty
}
function myObjectDataModelForScreenEmail(CountryType, listKey, listofItemInTheKey) {
    dataModelForScreenEmailData.push({ CountryType, listKey, listofItemInTheKey });
}






function GetPhonumberInformation(req, res) {
    var phonenuber = req.query.phonenuber;
    var country = req.query.country;

    const reef = ref(database);

    const usersRef = child(reef, 'Tools/Country/' + country + "/PhoneNumber/" + phonenuber);
    set(usersRef, {
        id: phonenuber
    }).then(() => {
        // Data saved successfully!
        res.locals.InsertUserDataSaved = "Data is added successfully";
        res.status(200).render("InsertUserDataToFirebase", {});
    })
        .catch((error) => {
            // The write failed...
            res.locals.InsertUserDataError = "Error while add data :" + error;
            res.status(200).render("InsertUserDataToFirebase", {});
        });


}



function writeEmailandPasswordToFileData(dataToWrite, req, res) {

    let jsonDataSettings = fs.readFileSync('assets/json/SettingsMakers.json');
    //ServerJSDataModel / Fetch_Screen_N_Email_Tools_For_Specific_Country.js
    let settingsData = JSON.parse(jsonDataSettings);
    console.log(settingsData);
    fs.writeFile(settingsData[1].FolderAndFileLocationForScreenEmailAndPassword, JSON.stringify(dataToWrite), function (err) {

        if (err) {
            console.log(err);
            res.locals.message = err;
            res.status(200).render("PannelControler", {});
        }
        // console.log("");

        res.locals.message = "The file was saved successfully!";
        res.status(200).render("PannelControler", {});

    });
}
module.exports = { FetchAllScreen_EmailData_For_Specific_Country };