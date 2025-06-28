// Tabs
const tabs = document.querySelector(".tabs");
const tabItems = document.querySelector(".tab-items");
const tabItem = document.querySelectorAll(".tab-item");
const tabContent = document.querySelectorAll(".tab-pane");
function removeActive() {
    tabItem.forEach((tab) => {
        tab.classList.remove("active");
    });
    tabContent.forEach((tab) => {
        tab.classList.remove("active");
    });
}
// nhấn vào tab nào thì active tab đó
tabItems.onclick = function (e) {
    const item = e.target.closest(".tab-item");
    if (item) {
        removeActive();
        item.classList.add("active");
        localStorage.setItem("activeTab", item.dataset.tab);
        const target = item.dataset.tab;
        tabContent.forEach((tab) => {
            if (tab.id === target) tab.classList.add("active");
        });
        checkIndex = item.dataset.index;
    }
};
// Dùng phím để
let checkIndex;
document.body.addEventListener("keydown", (e) => {
    let checkKey = false;
    removeActive();
    tabItem.forEach((tab) => {
        if (tab.dataset.index === e.key) {
            tab.classList.add("active");
            localStorage.setItem("activeTab", tab.dataset.tab);
            checkKey = true;
            checkIndex = tab.dataset.index;
        }
    });
    tabContent.forEach((tab) => {
        if (tab.dataset.index === e.key) {
            tab.classList.add("active");
        }
    });
    if (!checkKey) {
        tabItem[checkIndex - 1].classList.add("active");
        tabContent[checkIndex - 1].classList.add("active");
    }
});

window.addEventListener("DOMContentLoaded", () => {
    const savedTab = localStorage.getItem("activeTab");
    if (savedTab) {
        removeActive();
        tabItem.forEach((tab) => {
            if (tab.dataset.tab === savedTab) tab.classList.add("active");
            tabContent.forEach((tab) => {
                if (tab.id === savedTab) tab.classList.add("active");
            });
        });
    }
});
