﻿//This class produces a unique indetifer.
var UUID = function () {

    this.uniqueID = 0;

    this.createUUID = function () {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

    //gets the unique id
    this.getUUID = function () {
        return this.uniqueID;
    }

    // generates the unique id using create function.
    this.generateUUID = function () {
        this.uniqueID = this.createUUID();
        console.log(this.uniqueID + " has been generated");
    }

}

module.exports = UUID;