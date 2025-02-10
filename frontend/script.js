async function uploadImage() {
    let fileInput = document.getElementById("upload");
    let file = fileInput.files[0];

    let formData = new FormData();
    formData.append("image", file);

    let response = await fetch("http://localhost:3000/remove-bg", {
        method: "POST",
        body: formData
    });

    let blob = await response.blob();
    document.getElementById("output").src = URL.createObjectURL(blob);
}
