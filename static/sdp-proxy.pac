
var SDP_LIST = [
"am-cloud.mss.ctc.com",
"artifact.srdcloud-ee.cn",
"artifact.srdcloud.cn",
"bi-ops.srdcloud.cn",
"bi.srdcloud.cn",
"bytebase.srdcloud.cn",
"cicd.srdcloud.cn",
"code.srdcloud-ee.cn",
"code.srdcloud.cn",
"code1.srdcloud.cn",
"codehub.srdcloud.cn",
"consul.srdcloud-ee.cn",
"ctyun-artifact.srdcloud.cn",
"ctyun-cicd.srdcloud.cn",
"ctyun-code.srdcloud.cn",
"datahub.srdcloud.cn",
"dev-artifact.srdcloud.cn",
"dev-cicd.srdcloud.cn",
"dev-code.srdcloud.cn",
"dev-consul.srdcloud.cn",
"dev-ops.srdcloud.cn",
"dev-srd-ui.srdcloud.cn",
"dev.srdcloud.cn",
"dev01-artifact.srdcloud.cn",
"docs.srdcloud.cn",
"docview.srdcloud.cn",
"file.srdcloud.cn",
"fortify.srdcloud.cn",
"git-scm01.ctyundao.cn",
"git-scm02.ctyundao.cn",
"gz01-srdart.srdcloud.cn",
"gz02-artifact.srdcloud.cn",
"gzperf-artrepo.srdcloud.cn",
"iam-cloudtest.mss.ctc.com",
"ops.srdcloud-ee.cn",
"ops.srdcloud.cn",
"pit.srdcloud.cn",
"resource.srdcloud.cn",
"sdp.user.plugin1.com",
"sonar.srdcloud.cn",
"srd-ui.srdcloud.cn",
"test-api.srdcloud.cn",
"test-artifact.srdcloud.cn",
"test-bytebase.srdcloud.cn",
"test-cicd.srdcloud.cn",
"test-code.srdcloud.cn",
"test-code1.srdcloud.cn",
"test-code2.srdcloud.cn",
"test-codehub.srdcloud.cn",
"test-docs.srdcloud.cn",
"test-file.srdcloud.cn",
"test-fortify.srdcloud.cn",
"test-ops.srdcloud.cn",
"test-resource.srdcloud.cn",
"test-sonar.srdcloud.cn",
"test-srd-ui.srdcloud.cn",
"test-yd-artifact.srdcloud.cn",
"test-yd-code.srdcloud.cn",
"test-yd-ops.srdcloud.cn",
"test-yd.srdcloud.cn",
"test.srdcloud.cn",
"test01-artifact.srdcloud.cn",
"traefik.srdcloud.cn",
"www.ctgpaas.cn",
"www.srdcloud-ee.cn",
"www.srdcloud.cn",
"yd-artifact.srdcloud.cn",
"yd-code.srdcloud.cn",
"yd-ops.srdcloud.cn",
"yd-qbi.srdcloud.cn",
"yd.srdcloud.cn",
"yd02-artifact.srdcloud.cn",
"10.128.20.32",
"10.128.86.86",
"10.142.101.156",
"10.158.231.15",
"10.158.231.20",
"10.158.231.3",
"10.158.231.50",
"10.158.231.66",
"10.158.231.9",
"10.17.33.244",
"10.17.51.156",
"10.200.1.249",
"10.251.53.129",
"124.127.117.227",
"172.29.1.197",
"172.29.1.201",
"172.29.1.205",
"172.29.2.104",
"172.29.2.113",
"172.29.2.130",
"172.29.2.140",
"172.29.2.154",
"172.29.2.18",
"172.29.2.198",
"172.29.2.22",
"172.29.2.23",
"172.29.2.238",
"172.29.2.24",
"172.29.2.25",
"172.29.2.28",
"172.29.2.29",
"172.29.2.38",
"172.29.2.43",
"172.29.2.45",
"172.29.2.65",
"172.29.2.79",
"172.29.2.82",
"192.168.38.44",
"192.168.39.103",
"192.168.39.104",
"192.168.40.153",
"192.168.40.16",
"192.168.40.40",
"14.18.60.9",
"14.18.87.79"

];

var proxy ="PROXY chens.netbird.local:12333;";
var direct = "DIRECT;";

function _endsWith(target, str){
    if(str == null || str == "" || target.length == 0 || str.length > target.length){
        return false;
    }
    if(target.substring(target.length - str.length) == str){
        return true;
    } else {
        return false;
    }
    return false;
}

var ipBinary = function (ip){
    var resultArr = [];
    var arr = ip.split('.');
    var digit = 8;
    if (arr.length != 4) {
        digit = 16;
        arr = ip.split(':');
    }
    for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        var b = parseInt(item, digit == 16 ? 16:10).toString(2);
        var fd = b;
        if (b.length < digit) {
            for (var j = 0; j < digit - b.length; j++) {
                fd = "0"+fd;
            }
        }
        resultArr.push(fd);
    }
    return resultArr
};

var isContain = function (start, end, ip) {
    var star_d = ipBinary(start);
    var end_d = ipBinary(end);
    var ip_d = ipBinary(ip);
    if (star_d.length != ip_d.length || end_d.length != ip_d.length) { return false }
    for (var i = 0; i < 4; i++) {
        var ip_item = ip_d[i];
        var start_item = star_d[i];
        var end_item = end_d[i];
        var flag = parseInt(ip_item) <= parseInt(end_item) && parseInt(ip_item) >= parseInt(start_item);
        if (!flag) { return false }
    }
    return true
};


function targetInPacList(target){
    var originTarget = target;
    var pos = target.split(".");
    if (pos.length > 2){
        target = pos[pos.length-2] + "."  + pos[pos.length-1] ;
    }
    var _tTarget = "";
    if (pos.length >= 3) {
        _tTarget = pos[pos.length-3] + "."  + pos[pos.length-2] + '.' + pos[pos.length-1] ;
    }
    var result = 0;
    for(var i = 0; i < SDP_LIST.length; i++) {
        var _pacItem = SDP_LIST[i];
        _pacItem = _pacItem.replace("*.","");
        if (originTarget == _pacItem || target == _pacItem || _tTarget == _pacItem || _endsWith(target, _pacItem)==true) {
            result = 1;
            return result;
        }

        if (_pacItem.indexOf("#") != -1) {
            var cidr = _pacItem.split("#");
            if (isContain(cidr[0], cidr[1], originTarget) == true) {
                result = 1;
                return result;
            }
        }
    }
    return result;
}

function FindProxyForURL(url, host) {
    var target = host;
    if (targetInPacList(target) == 1) {
        return proxy;
    }else{
        return direct;
    }
}
