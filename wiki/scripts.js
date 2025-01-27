function openTab(event, tabName) {
    var i, tabContent, tabButtons;
    tabContent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }
    tabButtons = document.getElementsByClassName("tab-button");
    for (i = 0; i < tabButtons.length; i++) {
        tabButtons[i].className = tabButtons[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.className += " active";
}



// 获取模态框
var modal = document.getElementById("imageModal");

// 获取图片和模态框中的图片
var modalImg = document.getElementById("modalImage");
var captionText = document.getElementById("caption");

// 获取所有图片
var images = document.querySelectorAll("img");

// 为每个图片添加点击事件
images.forEach(function (img) {
    img.onclick = function () {
        openModal(this);
    }
});

// 获取关闭按钮
var span = document.getElementById("closeModal");

// 当用户点击关闭按钮时，关闭模态框
span.onclick = function () {
    modal.style.display = "none";
}

// 当用户点击模态框外部时，关闭模态框
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// 添加 ESC 键关闭模态框的功能
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") { // 检测 ESC 键
        modal.style.display = "none"; // 关闭模态框
    }
});

function openModal(img) {
    modal.style.display = "block"; // 显示模态框
    modalImg.src = img.src; // 设置模态框中的图片源
    captionText.innerHTML = img.alt; // 设置图片说明
}
