const getData = async () => {
  const res = await axios.get("https://usersapimongo.herokuapp.com/users");
  var data = res.data;

  // maping data into cards

  const cardBody = document.getElementById("cardRender");

  if (!data.length) {
    cardBody.innerHTML = `<h1 class="text-center" >please Register for Records!</h1>`;
  } else {
    data.map((v, i) => {
      cardBody.innerHTML += ` <div class="col-md-6 my-3">
        <!-- card starts -->
        <div class="card" style="width: 18rem">
          <div class="dropdown text-end">
            <a
              class="btn dropdown-toggle text-end"
              href="#"
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="fa fa-ellipsis-v fs-5"></i>
            </a>
    
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li><a class="dropdown-item" onclick="handleUpdate(${i})" >Edit</a></li>
              <li><a class="dropdown-item" onclick="handleDelete(${i})">Delete</a></li>
            </ul>
          </div>
    
          <img
            src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg"
            class="card-img-top"
            alt="user"
            width="50px"
            height="200px"
          />
          <div class="card-body">
            <h5 class="card-title">${v.name}</h5>
            <p class="card-text">${v.email}</p>
            <p class="card-footer">${v.address}</p>
          </div>
        </div>
        <!-- card ends -->
      </div>`;
    });
  }
};

// function to post data

const sendData = async () => {
  // getting values from form

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;

  if (name && email && address) {
    const res = await axios.post("https://usersapimongo.herokuapp.com/user", {
      name,
      email,
      address,
    });

    console.log(res);

    location.reload();
  } else {
    alert("please fill complete details!");
  }
};

const handleDelete = async (i) => {
  const res = await axios.delete(
    `https://usersapimongo.herokuapp.com/user/${i}`
  );
  console.log(res);
  location.reload();
  //   console.log("i", i);
};

const handleUpdate = async (i) => {
  //   var name = document.getElementById("name").value;
  //   var email = document.getElementById("email").value;
  //   var address = document.getElementById("address").value;
  var res = await axios.get("https://usersapimongo.herokuapp.com/users");
  try {
    document.getElementById("name").value = res.data[i].name;
    document.getElementById("email").value = res.data[i].email;
    document.getElementById("address").value = res.data[i].address;
    var RegisterBtn = document.getElementById("registerBtn");
    var updateBtn = document.getElementById("updateBtn");
    RegisterBtn.disabled = true;
    updateBtn.disabled = false;
    updateBtn.onclick = () => {
      Update(i);
    };
  } catch (error) {
    console.log(error);
  }
};

const Update = async (i) => {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var address = document.getElementById("address").value;

  console.log({ name, email, address });

  const res = await axios.put(`https://usersapimongo.herokuapp.com/user/${i}`, {
    name,
    email,
    address,
  });
  location.reload();
  console.log(res);
};
