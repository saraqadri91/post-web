var background;

function addPost() {
  var postTitle = document.getElementById("postTitle").value;
  var postDesc = document.getElementById("postDesc").value;
  var newPost = document.getElementById("newPost");



  if (!newPost) {
    console.error("Element with id 'newPost' not found!");
    return;
  }
  if (postTitle === "" && postDesc === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please fill in both the title and description!",
    });
  }
  else if (postDesc.trim() && postTitle.trim()) {
    var postId = Date.now()


    newPost.innerHTML += `
        <div class="card mb-3">
            <div class="card-header fontStyle">
                @Posts
            </div>
            <div class="card-body" style="background-image: url('${background}');">
                <h5 class="card-title fontStyle" id="tile-${postId}">${postTitle}</h5>
                <p class="card-text fontStyle" id= "desc-${postId}">${postDesc}</p>
            </div>
            <div class="p-3">
            <button type="button"  class="btn mt-4 fontStyle edit-btn " onclick="editPost(${postId})">Edit</button>
            <button type="button"  class="btn mt-4 fontStyle delete-btn " onclick="dltPost(event)"  >Delete</button>
        </div>
    `;
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500
    });

    document.getElementById("postTitle").value = "";
    document.getElementById("postDesc").value = "";
  }

}
function dltPost(event) {
  var dlt = event.target.parentNode.parentNode;
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      dlt.remove();
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    }
  });
}


async function editPost(postId) {
  var tittleUpdated = document.getElementById(`tile-${postId}`);
  var updatedDes = document.getElementById(`desc-${postId}`);
  console.log(tittleUpdated, updatedDes);

  const result = await Swal.fire({
    title: "Edit Post",
    showCancelButton: true,
    html: `
      <input id="swal-input1" class="swal2-input width" value="${tittleUpdated.innerText}">
      <input id="swal-input2" class="swal2-input width" value="${updatedDes.innerText}">
    `,
    focusConfirm: false,
    preConfirm: () => {
      return [
        document.getElementById("swal-input1").value.trim(),
        document.getElementById("swal-input2").value.trim()
      ];
    },
    // Adding custom CSS
    customClass: {
      container: 'swal2-container',
      popup: 'swal2-popup',
      header: 'swal2-header',
      title: 'swal2-title',
      closeButton: 'swal2-close',
      icon: 'swal2-icon',
      content: 'swal2-content',
      input: 'swal2-input',
      actions: 'swal2-actions',
      confirmButton: 'swal2-confirm',
      cancelButton: 'swal2-cancel'
    }
  });

  if (result.isConfirmed && result.value) {
    const [newTitle, newDesc] = result.value || [];

    if (newTitle && newDesc) {
      tittleUpdated.innerHTML = newTitle;
      updatedDes.innerHTML = newDesc;
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Title and description cannot be empty!",
      });
    }
  }
}
function selectImg(src) {
  background = src
  var images = document.getElementsByClassName('small-Img')
  for (var i = 0; i < images.length; i++){
    images[i].className=' small-Img'
  }
    event.target.className += " selectedImg"

}
