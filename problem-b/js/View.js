"use strict";

import { getRecentTweets } from "./Model";

export function printTweets(tweets) {
    if (tweets.length < 1) {
        console.log("No tweets found");
    } else {
        tweets.forEach((element) => {
            let date = new Date(element.timestamp);
            console.log("- \"" + element.text + "\" (" + date.toLocaleString("en-US") + ")");
        })
    }   
}

printTweets(getRecentTweets());