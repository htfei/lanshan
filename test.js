
var hostlist = [{
    "baseUrl": "http://66yy.in",
    "chapterFind": ".lazy&&data-original;.tab-jq&&Text;body&&.videourl@li;a&&Text;a&&href;body&&.h1@Text!无需安装任何插件!倒序↓!顺序↑",
    "forFearch": false,
    "id": 1208,
    "movieFind": "",
    "pinYinTitle": "66yingyuan",
    "searchFind": "body&&li;a&&title;a&&href;.other&&Text",
    "searchUrl": "http://66yy.in/index.php?m=vod-search&wd=**",
    "title": "66影院",
    "weight": 676
  },
  {
    "baseUrl": "http://www.o8ys.com",
    "chapterFind": ".fed-deta-images&&a&&data-original;.fed-part-both&&Text;.fed-matp-v,1&&.fed-play-item@li,2:;a&&Text;a&&href;.fed-matp-v&&li@Text",
    "forFearch": false,
    "id": 1200,
    "movieFind": "",
    "pinYinTitle": "oubayingshi",
    "searchFind": ".fed-part-layout&&dl;h1&&Text;a&&href;span,1&&Text",
    "searchUrl": "http://www.o8ys.com/vodsearch/-------------.html?wd=**",
    "title": "欧八影视",
    "weight": 668
  },
  {
    "id": 2,
    "name": "玖玖资源站",
    "uri": "https://www.sesejiu.com",
    "classapi": "http://99zxcj.com/inc/jsonsapi.php?ac=list",
    "listapi": "http://99zxcj.com/inc/jsonsapi.php?ac=videolist",
    "type": "综合性资源"
  }
]

var vm = new Vue({
  el: '#app-4',
  data: {
    "hostlist": hostlist,
    "getlist_url": "http://66yy.in/index.php?m=vod-search&wd=**", //&pg=&t=
    "getlist_rsp": {
		"page":1,
		"pagecount":1,
		"counts":1,
		"data":[{		
			"title":"",
			"url":"",
			"msg":"",
			"imageUrl":""
			}]
	},
    "classid": "",
    "querywd": null,
	"placeholder": "西行纪",
    "currenthostindex": 0
  },

  methods: {
    querypage: function () {
      var url = this.getlist_url.replace("**", this.querywd||this.placeholder);
      console.log(url);
      this.getlist(url);
    },
    getlist: function (url) {
      this.getlist_rsp.page=1;
      this.getlist_rsp.pagecount=1;
      (async () => {
        try {
          let response = await fetch(url);
          var html = await response.text();
          //const $ = cheerio.load(html);
		  var doc = new DOMParser().parseFromString(html, "text/html");
          var list = [].map.call($(doc).find('body li.p1.m1'), function (item) {
            return {
              title: $(item).find('a').attr('title'),
              url: hostlist[0].baseUrl+$(item).find('a').attr('href'),
              msg: $(item).find('.other').text().trim(),
              imageUrl: hostlist[0].baseUrl+$(item).find('img.lazy').attr('src')
            };
          });
          console.log(list);
          this.getlist_rsp.data = list;
        } catch (e) {
          console.log("Oops, error", e);
        }
      })();
    }
  }
});