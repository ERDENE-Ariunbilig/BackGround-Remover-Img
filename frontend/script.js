async function uploadImage() {
    const fileInput = document.getElementById("uploadInput");
    const file = fileInput.files[0];
    if (!file) return alert("Please select an image!");

    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData
    });
    const data = await response.json();

    document.getElementById("outputImage").src = "http://localhost:5000" + data.filePath;
    document.getElementById("outputImage").style.display = "block";
}
