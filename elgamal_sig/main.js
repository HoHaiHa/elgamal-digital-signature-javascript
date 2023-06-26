


var vanBanKy1 = document.querySelector('.texarea-1');

var btnky = document.querySelector('.button__ky1')

var chuky1 = document.querySelector('.contain__content-box1')

var btnchuyen = document.querySelector('.button11')

var vanBanKy2 = document.querySelector('.texarea-2')

var chuky2 = document.querySelector('.texarea-3')

var btnkiemTra = document.querySelector('.button22')

var thongBao = document.querySelector('.contain__content-box3')

var btnluu = document.querySelector('.button12')

// muc 1

btnky.onclick = function () {
    var x = crc32(vanBanKy1.value);
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

btnkiemTra.onclick = function () {
    var x = crc32(vanBanKy2.value);
    var kt1 = xuatKetQua(x, a, alpha, k, p);
    if (kt1 == chuky2.value)
        thongBao.textContent = 'Chữ ký đúng!';
    else
        thongBao.textContent = 'Chữ ký sai!';
}



// muc 2


var btnFILE = document.querySelector(".button1-input");

function readFile1(btnFILE) {
    let file = btnFILE.files[0]
    let reader = new FileReader();

    reader.onload = function (e) {
        let contents = e.target.result;
        vanBanKy1.value = contents;
    }

    reader.readAsText(file);
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







var p = 463;
var a = 211;
var alpha = 2;
//var x = 112;

var k = 235;
var x = crc32(vanBanKy1.value);

























//hàm bình phương và nhân
function powerMod(base, exponent, modulus) {
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
function euclideanAlgorithm(a, m) {
    let [oldR, r] = [a, m];
    let [oldS, s] = [1, 0];
    let [oldT, t] = [0, 1];

    while (r !== 0) {
        const quotient = Math.floor(oldR / r);
        [oldR, r] = [r, oldR - quotient * r];
        [oldS, s] = [s, oldS - quotient * s];
        [oldT, t] = [t, oldT - quotient * t];
    }

    if (oldR !== 1) {
        throw new Error("Không có số nghịch đảo modulo.");
    }


    if (oldS < 0) {
        oldS = oldS + m;
    }

    return oldS;
}

// phần tử r trong chữ ký
function r(alpha, k, p) {
    return powerMod(alpha, k, p);
}

// phần tử s trong chữ ký
function s(x, a, alpha, k, p) {
    if ((x - a * r(alpha, k, p)) * euclideanAlgorithm(k, (p - 1)) % (p - 1) < 0)
        return (x - a * r(alpha, k, p)) * euclideanAlgorithm(k, (p - 1)) % (p - 1) + (p - 1);
    else
        return (x - a * r(alpha, k, p)) * euclideanAlgorithm(k, (p - 1)) % (p - 1)
}


//xuất kết quả
function xuatKetQua(x, a, alpha, k, p) {
    return '(' + r(alpha, k, p) + ',' + s(x, a, alpha, k, p) + ')';
}


//kiểm tra chữ ký
function auth(x, a, alpha, k, p) {
    var part1 = powerMod(powerMod(alpha, a, p), r(alpha, k, p), p);
    var part2 = powerMod(r(alpha, k, p), s(x, a, alpha, k, p), p)

    var all = (part1 * part2) % p;
    console.log(powerMod(alpha, x, p))
    console.log(all)


    if (all == powerMod(alpha, x, p)) {
        console.log("chữ ký đúng")
        return true;
    }
    else {
        console.log("chữ ký sai")
        return false
    }


}



//hàm băm crc32 để giảm dộ phức tạp của chương trình
function crc32(input) {
    const table = new Uint32Array(256);
    const polynomial = 0xEDB88320;
    let crc = 0xFFFFFFFF;

    for (let i = 0; i < 256; i++) {
        let c = i;
        for (let j = 0; j < 8; j++) {
            if (c & 1) {
                c = (c >>> 1) ^ polynomial;
            } else {
                c >>>= 1;
            }
        }
        table[i] = c;
    }

    for (let i = 0; i < input.length; i++) {
        const byte = input.charCodeAt(i) & 0xFF;
        crc = (crc >>> 8) ^ table[(crc ^ byte) & 0xFF];
    }

    crc ^= 0xFFFFFFFF;
    return crc >>> 0;

}


