
function read_text() {
    var text1 = document.getElementById('input_box_1').value.split("\n");
    const test_str1 = /^\\u[a-fA-F0-9]{4}$/ ; 
    const test_str2 = /^\\u[a-fA-F0-9]{4}~\\u[a-fA-F0-9]{4}$/;
    var str1 = "";
    for (let index1 = 0; index1 < text1.length; index1++) {
        if (text1[index1].search(test_str1) == -1 && text1[index1].search(test_str2) == -1){
            set_timer("第" + (index1 + 1).toString() + "行出错\n3秒后自动返回......");
            return null;
        }
    }
    for (let index1 = 0; index1 < text1.length; index1++) {
        if (text1[index1].search(test_str1) != -1){
            str1 += String.fromCharCode(parseInt(text1[index1].replace("\\u",""), 16)) ;
        }
        else if (text1[index1].search(test_str2) != -1){
            var start1 = parseInt(text1[index1].split("~")[0].replace("\\u",""), 16);
            var end1 = parseInt(text1[index1].split("~")[1].replace("\\u",""), 16);
            while(start1 <= end1) {str1 += String.fromCharCode(start1);start1+=1;}
        }
    }
    copyTextToClipboard(str1);
    set_timer("字符已复制到剪切板\n3秒后自动返回......");
}

const timer_list = [];
function set_timer(text1){
    if (timer_list.length){
        clearTimeout(timer_list[0]);
        timer_list.pop();
    }
    if (timer_list.length < 1){
        let mid1 = document.getElementById('input_box_1').value;
        document.getElementById('input_box_1').value = "";
        document.getElementById('input_box_1').placeholder = text1;
        timer_list.push(setTimeout(()=>{
            document.getElementById('input_box_1').placeholder = "请使用\\uXXXX或\n\\uXXXX~\\uXXXX格式填写\nXXXX为4位16进制，可多行";
            document.getElementById('input_box_1').value = mid1;
        },3000))
    }
}

async function copyTextToClipboard(text) {
    try {
    await navigator.clipboard.writeText(text);
    console.log('文本已复制到剪贴板');
    } catch (err) {
    console.error('无法复制文本: ', err);
    }
}