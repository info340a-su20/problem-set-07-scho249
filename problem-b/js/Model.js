'use strict';

import allTweets from './uw_ischool_tweets';

let tweets = allTweets.map((content) => {
    return {
        text : content.text,
        timestamp : Date.parse(content.created_at)
    } 
});

export function getRecentTweets() {
    tweets.sort((a,b) => {
        return b.timestamp - a.timestamp;
    });
    
    return tweets.slice(0,5);
}

export function searchTweets(search) {
    search = search.toLowerCase();
    let result = tweets.filter((tweet) => {
        return tweet.text.toLowerCase().indexOf(search) != -1;
    });

    return result;
}

