import { writeFileSync } from 'fs';
import { readFileSync } from 'fs';

const sourceFilePath = './mock_application.json';
const destinationFilePath = './clean_application.json';

let rawdata = readFileSync(sourceFilePath);
let data = JSON.parse(rawdata);
//Supplied readme defines places in the schema that need to be
//cleaned as the objects and scenes within the versions key

var objectKeys = [];
//Objects
for(var i in data.versions[0].objects) {
    if (objectKeys.includes(data.versions[0].objects[i].key)) {
        delete data.versions[0].objects[i];
    } else {
        objectKeys.push(data.versions[0].objects[i].key);
        //Believe I need to check fields in the objects
        var fieldKeys = [];
        for(var k in data.versions[0].objects[i].fields) {
            if (fieldKeys.includes(data.versions[0].objects[i].fields[k].key)) {
                delete data.versions[0].objects[i].fields[k];
            } else {
                fieldKeys.push(data.versions[0].objects[i].fields[k].key);
            }
        }
    }
}

var sceneKeys = [];
//Scenes
for(var i in data.versions[0].scenes) {
    if (sceneKeys.includes(data.versions[0].scenes[i].key)) {
        delete data.versions[0].scenes[i];
    } else {
        sceneKeys.push(data.versions[0].scenes[i].key);
        //Believe I need to check views in the scenes
        var viewKeys = [];
        for(var k in data.versions[0].scenes[i].views) {
            if (viewKeys.includes(data.versions[0].scenes[i].views[k].key)) {
                delete data.versions[0].scenes[i].views[k];
            } else {
                fieldKeys.push(data.versions[0].scenes[i].views[k].key);
            }
        }
    }
}

let jsondata = JSON.stringify(data, null, 2);
writeFileSync(destinationFilePath, jsondata);
