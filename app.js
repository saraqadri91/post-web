function addPost() {
    var postTitle = document.getElementById("postTitle").value;
    var postDesc = document.getElementById("postDesc").value;
    var newPost = document.getElementById("newPost");
    
   if(postTitle==="" && postDesc==="")
   {Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in both the title and description!",
             });}
      else if(postDesc.trim() && postTitle.trim()){ newPost.innerHTML += `
        <div class="card mb-3">
            <div class="card-header fontStyle">
                @Posts
            </div>
            <div class="card-body">
                <h5 class="card-title fontStyle">${postTitle}</h5>
                <p class="card-text fontStyle">${postDesc}</p>
            </div>
            <div>
            <button type="button"  class="btn mt-4 fontStyle edit-btn" onclick="editPost()">Edit</button>
            <button type="button"  class="btn mt-4 fontStyle delete-btn" onclick="dltPost(event)"  >Delete</button>
        </div>
    `;
    
    
    document.getElementById("postTitle").value = "";
    document.getElementById("postDesc").value = "";}

}
function dltPost(event){
event.target.parentNode.parentNode.parentNode.remove()
}
function editPost(){
    const { value: formValues } =  Swal.fire({
        title: "Multiple inputs",
        html: `
          <input id="swal-input1" class="swal2-input">
          <input id="swal-input2" class="swal2-input">
        `,
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById("swal-input1").value,
            document.getElementById("swal-input2").value
          ];
        }
      });
      if (formValues) {
        Swal.fire(JSON.stringify(formValues));
      }
}