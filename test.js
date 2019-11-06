
var hostlist = [{
    "baseUrl": "http://66yy.in",
    "chapterFind": ".lazy&&data-original;.tab-jq&&Text;body&&.videourl@li;a&&Text;a&&href;body&&.h1@Text!无需安装任何插件!倒序↓!顺序↑",
    "forFearch": false,
    "id": 1208,
    "movieFind": "",
    "pinYinTitle": "66yingyuan",
    "searchFind": ".index-area&&li;a&&title;a&&href;.other&&Text",
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
    "baseUrl": "http://www.8gw.com",
    "chapterFind": ".moviedteail_img&&img&&src;.txt&&Text;.scrollbox@li;a&&Text;a&&href;.box_tt@Text",
    "forFearch": false,
    "id": 1202,
    "movieFind": "js:setMovieFindResult(url);",
    "pinYinTitle": "bagewang_mianxiutan_",
    "searchFind": "body&&li;.tit&&Text;.tit&&href;.ver&&Text",
    "searchUrl": "http://www.8gw.com/search.asp?searchword=**;get;gb2312",
    "title": "八哥网（免嗅探）",
    "weight": 670
}, {
    "baseUrl": "https://www.osqqz.com",
    "chapterFind": ".fed-deta-images&&a&&data-original;.fed-deta-content&&li,6&&Text;body&&.fed-play-item@.fed-btns-info;Text;href;body&&.fed-drop-btns@Text",
    "forFearch": false,
    "id": 1192,
    "movieFind": "",
    "pinYinTitle": "oushangyingshi",
    "searchFind": ".fed-part-layout&&dl;h1&&a&&Text;h1&&a&&href",
    "searchUrl": "https://www.osqqz.com/index.php/vod/search.html?wd=**",
    "title": "欧尚影视",
    "weight": 660
},{
    "baseUrl": "https://www.jyys6.cn/",
    "chapterFind": ".fed-list-info&&a&&data-original;.fed-part-esan&&Text;body&&.fed-drop-item@li,2:;a&&Text;a&&href;.fed-drop-info&&li@Text;",
    "forFearch": false,
    "id": 1196,
    "movieFind": "",
    "pinYinTitle": "jingyuyingshi",
    "searchFind": "body&&dl;h1&&Text;a&&href;span&&.fed-list-remarks",
    "searchUrl": "https://www.jyys6.cn/jysou/-------------.html?wd=**",
    "title": "鲸鱼影视",
    "weight": 664
}
]

var vm = new Vue({
  el: '#app-4',
  data: {
    "hostlist": hostlist,
    "getlist_url": "http://66yy.in/index.php?m=vod-search&wd=**", //&pg=&t=
    "getlist_rsp": {
		"page":0,
		"pagecount":0,
		"counts":0,
		"data":[{		
			"title":"",
			"url":"",
			"msg":"",
			"imageUrl":"",
			"hosttitle":""
			}]
	},
    "classid": "",
    "querywd": null,
	"placeholder": "西行纪",
    "currenthostindex": 0
  },

  methods: {
    querypage: function () {
		
	  this.currenthostindex = 0;
	  this.getlist_rsp.page = 0;
      this.getlist_rsp.pagecount = 0;
	  this.getlist_rsp.data = [];
	  
      var wd = this.querywd||this.placeholder;
      this.getlist_from_hosts(hostlist,wd,5);
    },
	getlist_from_hosts: function (hostlist,wd,nums) {
		for(var i=0;i<nums;i++){
			if(this.currenthostindex < hostlist.length){
				this.getlist(hostlist[this.currenthostindex],wd);
				this.currenthostindex +=1;
			}else{
				console.log("没有更多的host了");
			}
		}
	},
    getlist: function (host,wd) {
      this.getlist_rsp.page+=1;
      this.getlist_rsp.pagecount+=1;
	  var url = host.searchUrl.replace("**",wd);
	  var str =host.baseUrl;
	  var baseurl_fix = str;
	  if(str[str.length-1] =='/'){
		  baseurl_fix = str.substring(0,str.length-1)
	  }
	  var s = host.searchFind.split(";");
	  var list_q = s[0].replace("&&"," ");
	  var title_ql = s[1].split("&&");
	  var url_ql = s[2].split("&&");
	  var msg_ql = (s.length>=4)?s[3].split("&&"):"span&&.fed-list-remarks".split("&&");
	  //console.log("%s,list_query=$('%s')",host.title,list_q);
		
      (async () => {
        try {
          let response = await fetch(url);
          var html = await response.text();
          //const $ = cheerio.load(html);
		  var doc = new DOMParser().parseFromString(html, "text/html");		  
          var list = [].map.call($(doc).find(list_q), function (item) {
			
			//get title
			var titlestr="";
			var t1 = $(item).find(title_ql[0]).attr(title_ql[1]);
			var t2 = $(item).find(title_ql[0]+" "+title_ql[1]).text().trim();
			var t3 = $(item).find(title_ql[0]).text().trim();
			if(t1){
				titlestr = t1;
				//console.log("%s,t1=$('%s').find('%s').attr('%s')",host.title,item,title_ql[0],title_ql[1]);
			}else if(t2){
				titlestr = t2;
				//console.log("%s,t2=$('%s').find('%s %s').text().trim()",host.title,item,title_ql[0],title_ql[1]);
			}else if(t3){
				titlestr = t3;
				//console.log("%s,t3=$('%s').find('%s').text().trim()",host.title,item,title_ql[0]);
			}
			
			//get msg
			var msgstr="";
			var msg_ql_fix = msg_ql[0].split(",");
			if(msg_ql_fix.length>1){
				var m0 = msg_ql_fix[0];
				var m1 = msg_ql_fix[1];
				msgstr = $($(item).find(m0)[m1]).text().trim();
				//console.log("%s,msg0=$($('%s').find('%s')[%s]).text().trim()",host.title,item,m0,m1);
			}else{
				msgstr1 = $(item).find(msg_ql[0]).attr(msg_ql[1]);
				msgstr2 = $(item).find(msg_ql[0]+msg_ql[1]).text().trim();
				msgstr3 = $(item).find(msg_ql[0]).text().trim();
				if(msgstr1){
					msgstr = msgstr1;
					//console.log("%s,msg1=$('%s').find('%s').attr('%s') ",host.title,item,msg_ql[0],msg_ql[1]);
				}else if(msgstr2){
					msgstr = msgstr2;
					//console.log("%s,msg2=,$('%s').find('%s%s').text().trim()",host.title,item,msg_ql[0],msg_ql[1]);				
				}else if(msgstr3){
					msgstr = msgstr3;
					//console.log("%s,msg3=,$('%s').find('%s').text().trim()",host.title,item,msg_ql[0],msg_ql[1]);			
				}
			}
			
			//get url
			var urlstr = "";
			var url1 = $(item).find(url_ql[0]).attr(url_ql[1]);
			var url2 = (url_ql.length>2)?$(item).find(url_ql[0]+" "+url_ql[1]).attr(url_ql[2]):"";
			if(url1){
				urlstr = baseurl_fix + url1;
				console.log("%s,url1=$('%s').find('%s').attr('%s')",host.title,item,url_ql[0],url_ql[1]);
			}else if(url2){
				urlstr = baseurl_fix + url2;
				console.log("%s,url2=$('%s').find('%s %s').attr('%s')",host.title,item,url_ql[0],url_ql[1],url_ql[2]);				
			}
						
			//get imageUrl
			var imageUrlstr = "";
			var img1 = $(item).find('img').attr('src');
			var img2 = $(item).find('dt a').attr('data-original');
			if(img1){
				imageUrlstr = baseurl_fix + img1;
				//console.log("%s,img1=$('%s').find('img').attr('src')",host.title,item);
			}else if(img2){
				imageUrlstr = baseurl_fix + img2;
				//console.log("%s,img2=$('%s').find('dt a').attr('data-original')",host.title,item);
			}
			
            return {
              title: titlestr,
              url: urlstr,
              msg: msgstr,
              imageUrl: imageUrlstr,
			  hosttitle:host.title
            };
			
          });
          console.log(host.title,list);
		  var old = this.getlist_rsp.data;
          this.getlist_rsp.data.push.apply(old,list);
        } catch (e) {
          console.log("Oops, error", e);
        }
      })();
    }
  }
});