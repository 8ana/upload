/*
 playname:视频来源名称
 PV:视频ID
*/

var html = '', data, vid, h = 567, td = h + 54, tdswf = ['', 'http://js.tudouui.com/bin/lingtong/PortalPlayer_192.swf'], qyswf = ['http://www.iqiyi.com/common/flashplayer/20160324/MainPlayer_5_3_2_1_c3_3_10_4.swf','http://www.iqiyi.com/common/flashplayer/20160323/3033.swf']; //爱奇艺

var Player = {
    toXmlDom: function(source){
        var xmlDoc = null;
        if (window.ActiveXObject) {
            var ARR_ACTIVEX = ["MSXML4.DOMDocument","MSXML3.DOMDocument","MSXML2.DOMDocument","MSXML.DOMDocument","Microsoft.XmlDom"];
            var XmlDomflag = false;
            for (var i = 0;i < ARR_ACTIVEX.length && !XmlDomflag ;i++) {
                try {
                    var objXML = new ActiveXObject(ARR_ACTIVEX[i]);
                    xmlDoc = objXML;
                    XmlDomflag = true;
                } catch (e) {
                }
            }
            if (xmlDoc) {
                xmlDoc.async = false;
                xmlDoc.loadXML(source);
            }
        }else{
            var parser=new DOMParser();
            var xmlDoc=parser.parseFromString(source,"text/xml");
        }
        return xmlDoc;
    },
    html2: function (pv) {
        data = pv.split('@@');
        html = '<div class="explaywrap" style="height:'+ h +'px;"><a target="_blank" href="'+data[0]+'">亲，请点我播放</a><p>应官方要求<br>该视频被要求下架<br>谢谢合作</p></div>';
    },
    html: function (pv) {
        html = '<div class="explaywrap" style="height:'+ h +'px;"><a target="_blank" href="'+pv+'">亲，请点我播放</a><p>应官方要求<br>该视频被要求下架<br>谢谢合作</p></div>';
    },
    mp4: function (pv) {
        data = pv.split('@@');
        if(data.length>1){
            data = data[0].split(',');
            html = '<object type="application/x-shockwave-flash" data="'+tdswf[1]+'" width="100%" height="'+ td +'" id="tudou" name="movie_player" style="visibility: visible;"><param name="quality" value="high"><param name="allowScriptAccess" value="always"><param name="bgcolor" value="#000000"><param name="allowfullscreen" value="true"><param name="allowNetworking" value="all"><param name="wmode" value="transparent"><param name="flashvars" value="tvcCode=-1&amp;hd=3&amp;abtest=0&amp;iid='+data[0]+'&amp;icode='+data[1]+'&amp;vcode='+data[2]+'"></object>';
        }else{
            html = '<div class="js-media-player"><video id="mp4" width="100%" height="'+h+'" autoplay controls src="'+pv+'"></video></div>';
        }
    },
    flv: function (pv) {
        html = '<div class="js-media-player"><video id="mp4" width="100%" height="'+h+'" autoplay controls src="'+pv+'"></video></div>';
    },
    youku: function (pv) {
        data = pv.split(',');
        var len = data.length;
        if (len == 1) {
            html = '<embed id="youku" type="application/x-shockwave-flash" src="http://player.youku.com/player.php/sid/'+pv+'/partnerid/08fa721d0f5abf37/v.swf" width="100%" height="'+h+'" scale="noborder" allowscriptaccess="never" menu="false" loop="loop" play="true" womode="transparent" pluginspage="http://www.macromedia.com/go/getflashplayer" allowfullscreen="true" flashvars="playMovie=true&amp;auto=1&amp;adss=0&amp;isAutoPlay=true">';
        }else{
            html = '<embed id="youku" type="application/x-shockwave-flash" src="http://player.youku.com/player.php/sid/'+data[2]+'/partnerid/08fa721d0f5abf37/v.swf" width="100%" height="'+h+'" scale="noborder" allowscriptaccess="never" menu="false" loop="loop" play="true" womode="transparent" pluginspage="http://www.macromedia.com/go/getflashplayer" allowfullscreen="true" flashvars="playMovie=true&amp;auto=1&amp;adss=0&amp;isAutoPlay=true">';
        }
    },
    tudou: function (pv) {
        data = pv.split(',');
        var len = data.length;
        if (len == 1) {
            if (/^\d+$/g.test(pv)) {
                html = '<embed id="tudou" allowNetworking="internal" allowFullScreen="true" allowscriptaccess="never" src="http://www.tudou.com/v/'+ pv +'/dW5pb25faWQ9MTAyMTk1XzEwMDAwMV8wMV8wMQ/&videoClickNavigate=false&withRecommendList=false&withFirstFrame=false&autoPlay=true/v.swf" type="application/x-shockwave-flash" width="100%" height="'+ h +'"></embed>';
            } else {
                html = '<div id="tudoudiv" style="overflow: hidden;height:'+ h +'px;"><object type="application/x-shockwave-flash" data="'+tdswf[1]+'" width="100%" height="'+ td +'" id="tudou" name="movie_player" style="visibility: visible;"><param name="quality" value="high"><param name="allowScriptAccess" value="always"><param name="bgcolor" value="#000000"><param name="allowfullscreen" value="true"><param name="allowNetworking" value="all"><param name="wmode" value="transparent"><param name="flashvars" value="tvcCode=-1&amp;hd=2&amp;abtest=0&amp;vcode='+ pv +'"></object></div>';
            }
        } else if(len==2) {
            html = '<div id="tudoudiv" style="overflow: hidden;height:'+ h +'px;"><iframe id="tudou" src="http://js.tudouui.com/bin/lingtong/PortalPlayer.swf?tvcCode=-1&amp;hd=2&amp;iid='+data[0]+'&amp;icode='+data[1]+'" frameborder="0" marginheight="0" marginwidth="0" scrolling="auto" id="tudou" name="movie_player" width="100%" height="'+ td +'"></iframe></div>';
        } else if (len >= 3) {
            html = '<div id="tudoudiv" style="overflow: hidden;height:'+ h +'px;"><object type="application/x-shockwave-flash" data="'+tdswf[1]+'" width="100%" height="'+ td +'" id="tudou" name="movie_player" style="visibility: visible;"><param name="quality" value="high"><param name="allowScriptAccess" value="always"><param name="bgcolor" value="#000000"><param name="allowfullscreen" value="true"><param name="allowNetworking" value="all"><param name="wmode" value="transparent"><param name="flashvars" value="tvcCode=-1&amp;hd=3&amp;abtest=0&amp;iid='+data[0]+'&amp;icode='+data[1]+'&amp;vcode='+data[2]+'"></object></div>';
        }
    },
    iqiyi: function (pv) {
        html = '<iframe id="iqiyi" scrolling="no" frameborder="0" width="100%" height="' + h + '" src="" fullscreen="yes"></iframe>';
        setTimeout(function() {
            if(pv.indexOf(",")>0){
                data = pv.split(',');
                var v = qyswf[0] +'?definitionID='+data[1]+'&amp;tvId='+data[0]+'&amp;menu=false&amp;autoplay=true&amp;cid=qc_100001_100100&amp;flashP2PCoreUrl='+ qyswf[1] +'&amp;=undefined';
            }else if(pv.indexOf("&tvid=")>0){
                data = pv.split('&tvid=');
                var v = qyswf[0] +'?definitionID='+data[0]+'&amp;tvId='+data[1]+'&amp;menu=false&amp;autoplay=true&amp;cid=qc_100001_100100&amp;flashP2PCoreUrl='+ qyswf[1] +'&amp;=undefined';
            }
            var pframe = $('#iqiyi');
            if (pframe.length) {
                var h = pframe.attr('height');
                pframe.attr('src', '');
                setTimeout(function() {
                    var pdoc = pframe[0].contentDocument || pframe[0].contentWindow.document;
                    pdoc.body.innerHTML = '<iframe style="margin:-9px;" scrolling="no" frameborder="0" id="iqiyi" width="102%" height="' + h + '" src="' + v + '" fullscreen="yes"></iframe>';
                }, 20);
            }
        },500);
    },
    letv: function (pv) {
        data = pv.split(',');
        var len = data.length;
        if (len == 1) {
            html = '<embed codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,45,0" id="letv" width="100%" height="' + h + '" src="http://player.letvcdn.com/lc02_p/201509/25/23/57/23/newplayer/LetvPlayer.swf" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" align="middle" play="true" loop="true" scale="noscale" wmode="direct" devicefont="false" id="www_player" bgcolor="#000000" name="www_player" menu="true" allowscriptaccess="always" allowfullscreen="true" allowfullscreeninteractive="true" salign="TL" flashvars="vid=' + pv + '&amp;callbackJs=callback_365789&amp;typeFrom=letv_music&amp;ark=100&amp;autoplay=1&amp;autoReplay=0&amp;continuration=0" type="application/x-shockwave-flash">';
        } else if (len == 2) {
            html = '<embed id="letv" type="application/x-shockwave-flash" src="http://yuntv.letv.com/bcloud.swf?uu=' + data[0] + '&amp;vu=' + data[1] + '&amp;auto_play=1&amp;gpcflag=1&amp;allowFullScreen=true&amp;quality=high&amp;allowScriptAccess=always&amp;type=application/x-shockwave-flash" width="100%" height="' + h + '" style="undefined" id="acgobject" name="acgobject" bgcolor="#000000" quality="high" allowfullscreen="true" allownetworking="internal" allowscriptaccess="always" wmode="opaque" flashvars="MMControl=false&amp;MMout=false">';
        }
    },
    sohu: function (pv) {
        if(pv.indexOf("@@") > 0){
            var data2 = pv.split('@@');
            data = data2[0].split(',');
            html = '<embed id="letv" type="application/x-shockwave-flash" src="http://yuntv.letv.com/bcloud.swf?uu='+data[0]+'&amp;vu='+data[1]+'&amp;auto_play=1&amp;gpcflag=1&amp;allowFullScreen=true&amp;quality=high&amp;allowScriptAccess=always&amp;type=application/x-shockwave-flash" width="100%" height="'+h+'" style="undefined" id="acgobject" name="acgobject" bgcolor="#000000" quality="high" allowfullscreen="true" allownetworking="internal" allowscriptaccess="always" wmode="opaque" flashvars="MMControl=false&amp;MMout=false">';
        }else {
            if (pv.indexOf('_') > 0) {
                data = pv.split('_');
                html = '<object id="sohu" width="100%" height="' + h + '"><param name="movie" value="http://share.vrs.sohu.com/my/v.swf&topBar=0&id=' + data[0] + '&skinNum=1&showRecommend=0&autoplay=true&api_key=b24ab6248dace426097bb7b35df84c7c&sogouBtn=0"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><param name="wmode" value="Transparent"></param><embed id="sohu" width="100%" height="' + h + '" wmode="Transparent" allowfullscreen="true" allowscriptaccess="always" quality="high" src="http://share.vrs.sohu.com/my/v.swf&topBar=0&id=' + data[0] + '&skinNum=1&showRecommend=0&autoplay=true&api_key=b24ab6248dace426097bb7b35df84c7c&sogouBtn=0" type="application/x-shockwave-flash"/></embed></object>';
            } else {
                html = '<embed id="sohu" width="100%" height="' + h + '" allownetworking="internal" allowfullscreen="true" allowscriptaccess="never" src="http://share.vrs.sohu.com/' + pv + '/v.swf&amp;skinNum=1&amp;topBar=0&amp;showRecommend=0&amp;autoplay=true&amp;api_key=b24ab6248dace426097bb7b35df84c7c&amp;sogouBtn=0" name="player" id="player" type="application/x-shockwave-flash">';
            }
        }
    },
    pptv: function (pv) {
        data = pv.split(',');
        var len = data.length;
        if(len == 2){
            html = '<embed id="letv" src="http://player.pptv.com/v/' + data[1] + '.swf" quality="high" width="100%" height="' + h + '" align="middle" allowScriptAccess="always" allownetworking="all" type="application/x-shockwave-flash" wmode="window" allowFullScreen="true" play="true"></embed>';
        }else{
            if (/^\d+$/g.test(pv)) {
                html = '<iframe id="letv" src="http://player.pptv.com/iframe/index.html#id=' + pv + '&ctx=o%3Dv_share" allowtransparency="true" width="100%" height="' + h + '" scrolling="no" frameborder="0" ></iframe>';
            } else {
                $('#players').attr('data-url','http://v.pptv.com/show/'+ pv +'.html');
                html = '<embed id="letv" src="http://player.pptv.com/v/' + pv + '.swf" quality="high" width="100%" height="' + h + '" align="middle" allowScriptAccess="always" allownetworking="all" type="application/x-shockwave-flash" wmode="window" allowFullScreen="true" play="true"></embed>';
            }
        }
    },
    qq: function (pv) {
        //html = '<embed id="vqq" wmode="opaque" flashvars="vid=' + pv + '&amp;autoplay=1&amp;list=2&amp;adplay=1&amp;cid=qxrqtmduiy9m41i&amp;showcfg=0&amp;tpid=0&amp;share=1&amp;ptag=vclt.board.ff.xzhd" src="http://imgcache.qq.com/tencentvideo_v1/player/TPout.swf?max_age=86400&amp;v=20130507" quality="high" name="tenvideo_flash_player_1441215871161" id="tenvideo_flash_player_1441215871161" bgcolor="#000000" width="100%" height="' + h + '" align="middle" allowscriptaccess="always" allowfullscreen="true" type="application/x-shockwave-flash" pluginspage="http://get.adobe.com/cn/flashplayer/">';
        html = '<div class="js-media-player"><video id="mp4" width="100%" height="'+h+'" autoplay controls src=""></video></div>';
        setTimeout(function () {
            $.get("http://www.99496.com/api/qq.php?v="+pv, function(data){
                console.log(data);
                var s = Player.toXmlDom(data);
                console.log(s);
                console.log($(s).find('video').find('file').text());
                $('#mp4').attr('src',$(s).find('video').find('file').text());
            });
        },1000);
    },
    bilibili: function (pv) {
        data = pv.split(',');
        var len = data.length;
        if (len == 2) {
            html = '<object id="bilibili" name="movie_player" height="' + h + '" style="visibility:visible;" width="100%" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"><param value="http://static.hdslb.com/miniloader.swf?aid=' + data[0] + '&amp;page=' + data[1] + '" name="movie"><param value="high" name="quality"><param value="never" name="allowScriptAccess"><param value="true" name="allowFullScreen"><param value="playMovie=true&amp;auto=1&amp;adss=0" name="flashvars"><param value="transparent" name="wmode"><embed id="bilibili" height="' + h + '" allowscriptaccess="never" style="visibility:visible;" pluginspage="http://get.adobe.com/cn/flashplayer/" flashvars="playMovie=true&amp;auto=1&amp;autostart=true" width="100%" allowfullscreen="true" quality="high" src="http://static.hdslb.com/miniloader.swf?aid=' + data[0] + '&amp;page=' + data[1] + '" type="application/x-shockwave-flash" wmode="transparent"></object>';
        } else {
            html = '<object id="bilibili" name="movie_player" height="' + h + '" style="visibility:visible;" width="100%" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"><param value="http://static.hdslb.com/miniloader.swf?aid=' + pv + '&amp;page=1" name="movie"><param value="high" name="quality"><param value="never" name="allowScriptAccess"><param value="true" name="allowFullScreen"><param value="playMovie=true&amp;auto=1&amp;adss=0" name="flashvars"><param value="transparent" name="wmode"><embed id="bilibili" height="' + h + '" allowscriptaccess="never" style="visibility:visible;" pluginspage="http://get.adobe.com/cn/flashplayer/" flashvars="playMovie=true&amp;auto=1&amp;autostart=true" width="100%" allowfullscreen="true" quality="high" src="http://static.hdslb.com/miniloader.swf?aid=' + pv + '&amp;page=1" type="application/x-shockwave-flash" wmode="transparent"></object>';
        }
    },
    acfun: function (pv) {
        data = pv.split(',');
        var len = data.length;
        if (len == 3) {
            html = '<embed id="acfun" height="' + h + '" width="100%" class="player" allowFullScreenInteractive="true" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" AllowScriptAccess="always" rel="noreferrer" flashvars="type=page&url=http://www.acfun.tv/v/ac' + data[0] + '_' + data[1] + '" src="http://cdn.aixifan.com/player/ACFlashPlayer.out.swf" type="application/x-shockwave-flash" allowfullscreen="true" quality="high" wmode="window"></embed>';
        } else if (len == 2 && pv.indexOf("ac") > 0) {
            html = '<embed id="acfun" height="' + h + '" width="100%" class="player" allowFullScreenInteractive="true" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" AllowScriptAccess="always" rel="noreferrer" flashvars="type=page&url=http://www.acfun.tv/v/ac' + data[0] + '" src="http://cdn.aixifan.com/player/ACFlashPlayer.out.swf" type="application/x-shockwave-flash" allowfullscreen="true" quality="high" wmode="window"></embed>';
        } else if (len == 2) {
            html = '<embed id="acfun" height="' + h + '" width="100%" class="player" allowFullScreenInteractive="true" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" AllowScriptAccess="always" rel="noreferrer" flashvars="type=page&url=http://www.acfun.tv/v/ac' + data[0] + '_' + data[1] + '" src="http://cdn.aixifan.com/player/ACFlashPlayer.out.swf" type="application/x-shockwave-flash" allowfullscreen="true" quality="high" wmode="window"></embed>';
        } else {
            html = '<embed id="acfun" height="' + h + '" width="100%" class="player" allowFullScreenInteractive="true" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" AllowScriptAccess="always" rel="noreferrer" flashvars="type=page&url=http://www.acfun.tv/v/ac' + pv + '" src="http://cdn.aixifan.com/player/ACFlashPlayer.out.swf" type="application/x-shockwave-flash" allowfullscreen="true" quality="high" wmode="window"></embed>';
        }
    },
    pan: function (pv) {
        data = pv.split(',');
        var len = data.length;
        if (len == 2) {
            html = '<div style="position:absolute;left:50%;top:50%;margin-top:-33px;margin-left:-533px;height:66px;line-height:66px;color:#666;font-size:24px;text-align:center;width:888px;"><a style="color:#fff;text-decoration: underline;" target="_blank" href="' + data[1] + '" title="点击下载">' + data[0] + '</a></div>';
        } else if (len == 3) {
            html = '<div style="position:absolute;left:50%;top:50%;margin-top:-33px;margin-left:-533px;height:66px;line-height:66px;color:#666;font-size:24px;text-align:center;width:888px;"><a style="color:#fff;text-decoration: underline;" target="_blank" href="' + data[1] + '" title="点击下载">' + data[0] + '提取码（<span style="color:#fff">' + data[2] + '</span></a> ）</div>';
        } else if (len == 4) {
            html = '<div style="position:absolute;left:50%;top:50%;margin-top:-33px;margin-left:-533px;height:66px;line-height:66px;color:#666;font-size:24px;text-align:center;width:888px;"><a style="color:#fff;text-decoration: underline;" target="_blank" href="' + data[1] + '" title="点击下载">' + data[0] + '：提取码（<span style="color:#fff">' + data[2] + '</span></a> ）解压密码（<span style="color:#fff">' + data[3] + '</span></a> ）</div>';
        }
    }
}

if(pv.indexOf(".html")>0 && pv.indexOf("@@")>0){
    Player.html2(pv);
}else if(pv.indexOf(".html")>0){
    Player.html(pv)
}else if(pv.indexOf(".mp4")>0){
    Player.mp4(pv);
}else if(pv.indexOf("@@youku")>0){
    pv = pv.split('@@')[0];
    Player.youku(pv);
}else if(pv.indexOf("@@tudou")>0){
    pv = pv.split('@@')[0];
    Player.tudou(pv);
}else if(pv.indexOf("@@iqiyi")>0){
    pv = pv.split('@@')[0];
    Player.iqiyi(pv);
}else if(pv.indexOf("@@letv")>0){
    pv = pv.split('@@')[0];
    Player.letv(pv);
}else if(pv.indexOf("@@sohu")>0){
    pv = pv.split('@@')[0];
    Player.sohu(pv);
}else if(pv.indexOf("@@pptv")>0){
    pv = pv.split('@@')[0];
    Player.pptv(pv);
}else if(pv.indexOf("@@qq")>0){
    pv = pv.split('@@')[0];
    Player.qq(pv);
}else if(pv.indexOf("@@bilibili")>0){
    pv = pv.split('@@')[0];
    Player.bilibili(pv);
}else if(pv.indexOf("@@acfun")>0){
    pv = pv.split('@@')[0];
    Player.acfun(pv);
}else if(playname === 'flv') {
    Player.flv(pv);
}else if(playname === 'yuku'){
    Player.youku(pv);
}else if(playname === 'tudou'){
    Player.tudou(pv);
}else if(playname === 'qiyi'){
    Player.iqiyi(pv);
}else if(playname === 'letv') {
    Player.letv(pv);
}else if(playname === 'sohu'){
    Player.sohu(pv);
}else if(playname === 'pptv') {
    Player.pptv(pv);
}else if(playname === 'qq') {
    Player.qq(pv);
}else if(playname === 'bilibili') {
    Player.bilibili(pv);
}else if(playname === 'acfun') {
    Player.acfun(pv);
}else if(playname === 'pan') {
    Player.pan(pv);
}

$('#playleft').html(html);

function play_click(){
    var $cura = $('a.list_on');
    var posi=$cura.position();
    $("#list").animate({scrollTop:posi.top},200);
}

function closefull(){
    $('.p10idt').attr('style','');
    $('#playleft').removeClass('full').attr('style','');
    $('.webfull').removeClass('fulltext').text('网页全屏');
    $('.quit').remove();
    $('.gbtn').show();
    $('body,#sohu,#tudou,#playleft,#letv,#iqiyi,#vqq,#dilidili,#acfun,#bilibili,#youku,#mp4').attr('style','');
    $('#tudoudiv').css({'overflow':'hidden','height':h + 'px'});
    $('#players').css({'position':'relative'});
    if($('#playleft').find('iframe').attr('id') == 'iqiyi'){
        document.getElementById('iqiyi').contentWindow.document.getElementById('iqiyi').style.height= h + 'px';
    }
}
function openfull(){
    $('.p10idt').css('z-index','1');
    var wH = $(window).height();
    $('#playleft').addClass('full').attr('style','');
    $('body').css({'overflow':'hidden'}).append('<span class="webfull quit fulltext fulltexttop">退出全屏</span>');
    $('#tudoudiv').attr('style','');
    $('#tudou').height(wH+54);
    $('#sohu,#letv,#iqiyi,#dilidili,#acfun,#bilibili,#youku,#vqq,#mp4').height(wH);
    $('.gbtn').hide();
    $('#__jx_fm_Div,#cs_left_couplet,#cs_right_couplet,#HMCOVER_ID1,#ft_right_bottom,#buffer').remove();
    $('#players').css({'position':'static'});
    if($('#playleft').find('iframe').attr('id') == 'iqiyi'){
        document.getElementById('iqiyi').contentWindow.document.getElementById('iqiyi').style.height= wH + 'px';
    }
}
function webfull(time) {
    setTimeout(function () {
        $(document).on('click','.webfull',function(){
            if($('#playleft').hasClass('full')){
                closefull();
            }else{
                openfull();
            }
        });
        $(document).keydown(function(e){
            var code = e.keyCode ? e.keyCode : e.which;
            if(code == 27 || code == 96){
                closefull();
            }
        });

        // var TimeFn = null;
        // $('#playleft').click(function () {
        //     clearTimeout(TimeFn);
        //     TimeFn = setTimeout(function(){
        //         //alert('click')
        //     },300);
        // });
        //
        // $('#playleft').dblclick(function () {
        //     clearTimeout(TimeFn);
        //     if($('#playleft').hasClass('full')){
        //         closefull();
        //     }else{
        //         openfull();
        //     }
        // });
    },time);
}
//全屏后,根据窗口改化改变视频大小
function fullResize() {
    if($('#playleft').hasClass('full')){
        var w = $(window).width();
        var h = $(window).height();
        $('.full').width(w);
        $('.full').height(h);
        $('#sohu,#letv,#iqiyi,#dilidili,#acfun,#bilibili,#youku,#vqq,#mp4').height(h);
        $('#tudou').height(h+54);
        if($('#playleft').find('iframe').attr('id') == 'iqiyi'){
            document.getElementById('iqiyi').contentWindow.document.getElementById('iqiyi').style.height= h + 'px';
        }
    }
}
fullResize();
$(window).resize(function () {
    fullResize();
});

$(function(){
    play_click();
    $('#topright a').click(function () {
        if($('#list').css('display') == 'none'){
            $('#topright').attr('style','');
            $('.playleft').attr('style','');
            $(this).find('i').html('&#xe61c;');
            $('#list').show();
        }else {
            $('#topright').css('right','0');
            $('.playleft').css('margin-right',0);
            $(this).find('i').html('&#xe60e;');
            $('#list').hide();
        }
    });
    $('#playright').height(h);
    $('#list').height(h+5);
    $('#playleft').hover(function() {
        $('.fulltexttop').show();
    }, function() {
        $('.fulltexttop').hide();
    });
});

if(playname == 'flv' || playname == 'qq' || pv.indexOf(".mp4") > 0){
    document.onkeydown = pageEvent;
    function pageEvent(evt) {
        var player = document.querySelector('.js-media-player').plyr;
        evt = evt || window.event;
        var key = evt.which || evt.keyCode;
        if (key == 37) player.rewind(10);
        if (key == 39) player.forward(10);
        if (key == 38) player.setVolume(10);
        if (key == 40) player.setVolume(0);
        if (key == 32) player.togglePlay();
        return false;
    };

    document.querySelector('.js-media-player').addEventListener('enterfullscreen', function () {
        $('.gbtn').hide();
        $('.p10idt').css('z-index','1');
    });
    document.querySelector('.js-media-player').addEventListener('exitfullscreen', function () {
        $('.gbtn').show();
        if($('#playleft').hasClass('full')){
            $('.p10idt').css('z-index','1');
        }else{
            $('.p10idt').attr('style','');
        }
    });
    document.querySelector('.js-media-player').addEventListener('ended', function () {
        if (NextWebPage === '0') {
            return;
            //alert('最后一集了,点击确定,返回首页');
            //window.location.href = window.location.origin;
        } else {
            window.location.href = NextWebPage;
        }
    });
}