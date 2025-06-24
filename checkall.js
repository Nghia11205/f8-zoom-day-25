// CheckAll
const checkbox = document.querySelector(".checkbox");
const checkboxList = document.querySelector(".checkbox-list");
const checkAllElement = document.createElement("label");
// Thêm checkAll vào
checkAllElement.classList.add("checkbox-item");
checkAllElement.classList.add("checkbox-all");
checkAllElement.id = "check-all";
const inputAll = document.createElement("input");
inputAll.type = "checkbox";
const spanAll = document.createElement("span");
spanAll.textContent = "Chọn tất cả";
checkAllElement.append(inputAll, spanAll);
checkbox.insertBefore(checkAllElement, checkboxList);
// Lấy toàn bộ checkbox-item
const items = document.querySelectorAll(".item");

checkAllElement.addEventListener("change", () => {
    items.forEach((item) => {
        item.checked = inputAll.checked;
    });
});
items.forEach((item) => {
    item.addEventListener("change", () => {
        const allChecked = Array.from(items).every((item) => item.checked); // Nodelist không có every với some nên em chuyển sang mảng.
        const someChecked = Array.from(items).some((item) => item.checked);
        inputAll.checked = allChecked;
        inputAll.indeterminate = !allChecked && someChecked; // inderminat true thì nó mới gạch ngang
    });
});

//-------------------------------------------------------------------------------------------------------------------------------------------
