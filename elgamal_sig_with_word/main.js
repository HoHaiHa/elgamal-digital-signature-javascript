


var vanBanKy1 = document.querySelector('.texarea-1');

var btnky = document.querySelector('.button__ky1')

var chuky1 = document.querySelector('.contain__content-box1')

var btnchuyen = document.querySelector('.button11')

var vanBanKy2 = document.querySelector('.texarea-2')

var chuky2 = document.querySelector('.texarea-3')

var btnkiemTra = document.querySelector('.button22')

var thongBao = document.querySelector('.contain__content-box3')

var btnluu = document.querySelector('.button12')




// muc 1.......................

btnky.onclick = function () {
    var x = md5(vanBanKy1.value);
    chuky1.value = xuatKetQua(x, a, alpha, k, p);
    chuky1.textContent = xuatKetQua(x, a, alpha, k, p);
    console.log(x);

}

btnchuyen.onclick = function () {
    vanBanKy2.textContent = vanBanKy1.value;
    chuky2.textContent = chuky1.value;
    vanBanKy2.value = vanBanKy1.value;
    chuky2.value = chuky1.value;
}

//kiem tra chu ky
btnkiemTra.onclick = function () {
    var x = md5(vanBanKy2.value);

    var kt = xuatKetQua(x, a, alpha, k, p);
    if (kt == chuky2.value)
        thongBao.textContent = 'Chữ ký đúng!';
    else
        thongBao.textContent = 'Chữ ký sai!';
}



// muc 2.............................


var btnFILE = document.querySelector(".button1-input");

function readFile1(btnFILE) {
    let file = btnFILE.files[0]
    let reader = new FileReader();

    reader.onload = function (e) {
        let contents = e.target.result;
        vanBanKy1.value = contents;
    }

    reader.readAsText(file);

    //muc3..............................
    let fileName = file.name.toLowerCase();
    if (fileName.endsWith('.doc') || fileName.endsWith('.docx')) {
        console.log('2');
        muc3o1()
    }

}



var btnFILEvanban = document.querySelector("button21")

function readFile2(btnFILEvanban) {
    let file = btnFILEvanban.files[0]
    let reader = new FileReader();

    reader.onload = function (e) {
        let contents = e.target.result;
        vanBanKy2.value = contents;
    }

    reader.readAsText(file);

    //muc3.........................
    let fileName = file.name.toLowerCase();
    if (fileName.endsWith('.doc') || fileName.endsWith('.docx')) {
        console.log('2');
        muc3o3()
    }
}

var btnFILEchuky = document.querySelector("button23")

function readFile3(btnFILEchuky) {
    let file = btnFILEchuky.files[0]
    let reader = new FileReader();

    reader.onload = function (e) {
        let contents = e.target.result;
        chuky2.value = contents;
    }

    reader.readAsText(file);
}



function savaFile() {
    const textareaValue = chuky1.value;


    const blob = new Blob([textareaValue], { type: 'text/plain' });

    const url = window.URL.createObjectURL(blob);


    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'file.txt');


    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}


btnluu.addEventListener('click', savaFile);




//muc 3.......................



var boxiframe = document.querySelector('.addiframe')
var boxiframe2 = document.querySelector('.addiframe2')
var boxiframe3 = document.querySelector('addiframe3')

function muc3o1() {
    boxiframe.innerHTML = '<iframe src="https://docs.google.com/document/d/10pMK2xnFTPtwGUl5A6Ajxaf5WtTHNpnf/edit" class = "iframe" frameborder="1" height="500px" width="980px"></iframe>';
    document.querySelector(".contain").style.flexDirection = 'column';
    vanBanKy1.style.display = 'none';
    document.querySelector(".button1").style.position = 'absolute';
    document.querySelector(".button1").style.transform = 'translateX(1100px)';

    btnchuyen.onclick = function () {
        boxiframe2.innerHTML = '<iframe src="https://docs.google.com/document/d/10pMK2xnFTPtwGUl5A6Ajxaf5WtTHNpnf/edit" class = "iframe" frameborder="1" height="500px" width="980px"></iframe>'
        vanBanKy2.textContent = vanBanKy1.value;
        chuky2.textContent = chuky1.value;
        vanBanKy2.value = vanBanKy1.value;
        chuky2.value = chuky1.value;
        vanBanKy2.style.display = 'none';
    }
}

function muc3o3() {
    document.querySelector(".contain").style.flexDirection = 'column';
    boxiframe2.innerHTML = '<iframe src="https://docs.google.com/document/d/10pMK2xnFTPtwGUl5A6Ajxaf5WtTHNpnf/edit" class = "iframe" frameborder="1" height="500px" width="980px"></iframe>'
    vanBanKy2.style.display = 'none';
}

















// var p = 463;
// var a = 211;
// var alpha = 2;
// //var x = 112;

// var k = 235;
//var x = md5(vanBanKy1.value);



//random các tham số truyền vào ..............................

// random số nguyên tố P
function randomP() {
    while (true) {
        // Tạo số ngẫu nhiên từ 100 đến 999
        const number = Math.floor(Math.random() * 900) + 100;

        if (isPrime(number)) {
            return number;
        }
    }
}

// Kiểm tra số nguyên tố
function isPrime(number) {
    if (number <= 1) {
        return false;
    }

    // Kiểm tra từ 2 đến căn bậc hai của số
    for (let i = 2; i <= Math.sqrt(number); i++) {
        if (number % i === 0) {
            return false;
        }
    }

    return true;
}




// random số K có gcd(k,p-1) = 1 trong khoảng {1,p-2}
function randomK(p) {
    while (true) {
        // Tạo số ngẫu nhiên từ 1 đến p - 2
        const k = Math.floor(Math.random() * (p - 2)) + 1;

        if (gcd(k, (p - 1)) == 1) {
            return k;
        }
    }
}

// random alpha thuộc Zp+
function randomAlpha(p) {
    // Tạo số ngẫu nhiên từ 1 đến p 
    return Math.floor(Math.random() * (p)) + 1;
}

//random a thuộc khoảng {2,p-2}
function randomA(p) {
    // Tạo số ngẫu nhiên từ 2 đến p - 2
    return Math.floor(Math.random() * (p - 3)) + 2;
}

// Sử dụng hàm để tạo số nguyên tố ngẫu nhiên có 3 chữ số
const p = randomP();
const k = randomK(p);
const alpha = randomAlpha(p);
const a = randomA(p);

console.log('các tham số')
console.log(p);
console.log(k);
console.log(alpha);
console.log(a);


var x = md5(vanBanKy1.value);
















//xử lý toán học
// kiem tra gcd
function gcd(a, b) {
    if (a % b == 0) return b
    else return gcd(b, a % b)
}


//hàm bình phương và nhân
function binhPhuongVaNhan(base, exponent, modulus) {
    if (exponent === 0) {
        return 1;
    }

    let result = 1;
    base = base % modulus;

    while (exponent > 0) {
        if (exponent % 2 === 1) {
            result = (result * base) % modulus;
        }

        exponent = Math.floor(exponent / 2);
        base = (base * base) % modulus;
    }

    return result;
}

//tim phan tu nghich dao
function nghichDao(a, m) {
    if (gcd(a, m) !== 1)
        return -1;
    else {
        let q = [], r = [], s = [], t = [];
        let i = 0;
        r[i] = m, r[i + 1] = a;
        while (r[i + 1] !== 0) {
            q[i + 1] = Math.floor(r[i] / r[i + 1]);
            r[i + 2] = r[i] % r[i + 1];
            if (i === 0) {
                s[i] = 1;
                t[i] = 0;
            } else if (i === 1) {
                s[i] = 0;
                t[i] = 1;
            } else {
                s[i] = s[i - 2] - q[i - 1] * s[i - 1];
                t[i] = t[i - 2] - q[i - 1] * t[i - 1];
            }
            i++;
        }
        t[i] = t[i - 2] - q[i - 1] * t[i - 1];
        if (t[i] < 0)
            t[i] += m;
        return t[i];
    }
}

// phần tử r trong chữ ký
function r(alpha, k, p) {
    return binhPhuongVaNhan(alpha, k, p);
}

// phần tử s trong chữ ký
function s(x, a, alpha, k, p) {
    if ((x - a * r(alpha, k, p)) * nghichDao(k, (p - 1)) % (p - 1) < 0)
        return (x - a * r(alpha, k, p)) * nghichDao(k, (p - 1)) % (p - 1) + (p - 1);
    else
        return (x - a * r(alpha, k, p)) * nghichDao(k, (p - 1)) % (p - 1)
}


//xuất kết quả
function xuatKetQua(x, a, alpha, k, p) {
    return '(' + r(alpha, k, p) + ',' + s(x, a, alpha, k, p) + ')';
}


//kiểm tra chữ ký
function verify(x, a, alpha, k, p) {
    var part1 = binhPhuongVaNhan(binhPhuongVaNhan(alpha, a, p), r(alpha, k, p), p);
    var part2 = binhPhuongVaNhan(r(alpha, k, p), s(x, a, alpha, k, p), p)

    var all = (part1 * part2) % p;
    console.log(binhPhuongVaNhan(alpha, x, p))
    console.log(all)


    if (all == binhPhuongVaNhan(alpha, x, p)) {
        console.log("chữ ký đúng")
        return true;
    }
    else {
        console.log("chữ ký sai")
        return false
    }


}




// hàm băm md5
function md5(string) {

    function RotateLeft(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }

    function AddUnsigned(lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }

    function F(x, y, z) {
        return (x & y) | ((~x) & z);
    }
    function G(x, y, z) {
        return (x & z) | (y & (~z));
    }
    function H(x, y, z) {
        return (x ^ y ^ z);
    }
    function I(x, y, z) {
        return (y ^ (x | (~z)));
    }

    function FF(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function GG(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function HH(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function II(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function ConvertToWordArray(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWords_temp1 = lMessageLength + 8;
        var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
        var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        var lWordArray = Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    };

    function WordToHex(lValue) {
        var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
        }
        return WordToHexValue;
    };

    function Utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    };

    var x = Array();
    var k, AA, BB, CC, DD, a, b, c, d;
    var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
    var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
    var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
    var S41 = 6, S42 = 10, S43 = 15, S44 = 21;

    string = Utf8Encode(string);

    x = ConvertToWordArray(string);

    a = 0x67452301;
    b = 0xEFCDAB89;
    c = 0x98BADCFE;
    d = 0x10325476;

    for (k = 0; k < x.length; k += 16) {
        AA = a;
        BB = b;
        CC = c;
        DD = d;
        a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
        d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
        a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
        c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
        d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = AddUnsigned(a, AA);
        b = AddUnsigned(b, BB);
        c = AddUnsigned(c, CC);
        d = AddUnsigned(d, DD);
    }

    var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);

    //return temp.toLowerCase();
    //chuyển đổi từ hex sang dec
    return parseInt(temp.toLowerCase(), 16)
}


console.log(md5('hello'));


