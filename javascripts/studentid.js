document.addEventListener('DOMContentLoaded', async function () {
    const studentIdInput = document.getElementById('student-id-input');
    const pasteAndGoButton = document.getElementById('paste-and-go');
    const copyStudentIdButton = document.getElementById('copy-student-id');

    console.log("页面加载完成，按钮获取情况:", pasteAndGoButton, copyStudentIdButton);

    function extractStudentId(text) {
        const matches = text.match(/\d+/g);
        if (matches) {
            for (const match of matches) {
                if (match.length >= 1 && match.length <= 10) {
                    console.log("匹配到 studentId:", match);
                    return match;
                }
            }
        }
        console.log("未匹配到有效 studentId");
        return null;
    }

    async function handlePasteAndGo() {
        try {
            let studentId = extractStudentId(studentIdInput.value);

            if (!studentId) {
                try {
                    const clipboardText = await navigator.clipboard.readText();
                    console.log("剪贴板内容:", clipboardText);
                    studentId = extractStudentId(clipboardText);
                } catch (error) {
                    console.error("无法读取剪贴板:", error);
                    alert("无法读取剪贴板，请手动输入 Student ID。");
                    return;
                }
            }

            if (studentId) {
                studentIdInput.value = studentId;
                const url = `https://paxy.xiaoaitong.com/mb-device:phone_book/student_id-${studentId}`;
                console.log("即将跳转到:", url);
                window.location.href = url;
            } else {
                alert("未找到有效的 Student ID，请输入 1-10 位的数字。");
            }
        } catch (error) {
            console.error("粘贴并跳转时出错:", error);
            alert("发生错误，请检查浏览器权限或尝试手动输入。");
        }
    }

    pasteAndGoButton.addEventListener('click', handlePasteAndGo);
    
    copyStudentIdButton.addEventListener('click', function () {
        const studentId = studentIdInput.value;
        if (studentId) {
            navigator.clipboard.writeText(studentId).then(() => {
                alert('Student ID 已复制到剪贴板。');
            }).catch((error) => {
                console.error('复制 Student ID 时出错:', error);
                alert('复制失败，请检查浏览器权限。');
            });
        } else {
            alert('请先粘贴并跳转，获取 Student ID。');
        }
    });
});
