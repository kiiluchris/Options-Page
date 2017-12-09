'use strict';

const webtoons = {
  webtoons: {
    "0":[
      {"link":"http://www.webtoons.com/en/fantasy/magician/list?title_no=70","title":"Magician"},
      {"link":"http://www.webtoons.com/en/comedy/new-normal-class-8/list?title_no=100","title":"New Normal: Class 8"},
      {"link":"http://www.webtoons.com/en/comedy/hapi-buni/list?title_no=362","title":"HAPI BUNI"},
      {"link":"http://www.webtoons.com/en/comedy/randomphilia/list?title_no=386","title":"RANDOMPHILIA"},
      {"link":"http://www.webtoons.com/en/slice-of-life/average-adventures-of-an-average-girl/list?title_no=401","title":"Average Adventures of an Average Girl"},
      {"link":"http://www.webtoons.com/en/comedy/live-with-yourself/list?title_no=919","title":"Live with Yourself!"}
    ],
  },
  extraWebtoons: {
    "0": [
      {"link":"http://www.webtoons.com/en/fantasy/magic345ian/list?title_no=70","title":"Magician"},
      {"link":"http://www.webtoons.com/en/comedy/new-normal-class-8/list?title_no=100","title":"New 3453 Normal: Class 8"},
      {"link":"http://www.webtoons.com/en/comedy/hapi-b35uni/list?title_no=362","title":"HAPI BUNI"},
    ]
  },
  mergedWebtoons: {
    "0":[
      {"link":"http://www.webtoons.com/en/fantasy/magician/list?title_no=70","title":"Magician"},
      {"link":"http://www.webtoons.com/en/comedy/new-normal-class-8/list?title_no=100","title":"New 3453 Normal: Class 8"},
      {"link":"http://www.webtoons.com/en/comedy/hapi-buni/list?title_no=362","title":"HAPI BUNI"},
      {"link":"http://www.webtoons.com/en/comedy/randomphilia/list?title_no=386","title":"RANDOMPHILIA"},
      {"link":"http://www.webtoons.com/en/slice-of-life/average-adventures-of-an-average-girl/list?title_no=401","title":"Average Adventures of an Average Girl"},
      {"link":"http://www.webtoons.com/en/comedy/live-with-yourself/list?title_no=919","title":"Live with Yourself!"},
      {"link":"http://www.webtoons.com/en/fantasy/magic345ian/list?title_no=70","title":"Magician"},
      {"link":"http://www.webtoons.com/en/comedy/hapi-b35uni/list?title_no=362","title":"HAPI BUNI"},
    ]
  }
};

module.exports = {
  deepObj: {
    g: "asd", 
    h: {
      f: {
        e:"OLD"
      }
    }
  },
  deepObjNew: {
    g: 234, 
    t: [45],
    h: {
      f: {
        e:"NEW"
      }
    }
  },
  mergedDeepObj: {
    g:234,
    h: {
      f:{
        e:"NEW"
      }
    }
    ,t:[45]
  },
  deepArray: {
    x: [[webtoons.webtoons]]
  },
  deepArrayExtras: {
    x: [[webtoons.extraWebtoons]]
  },
  mergedDeepArray: {
    x: [[webtoons.mergedWebtoons]]
  },
  ...webtoons
}