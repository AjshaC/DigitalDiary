const titalInput = document.querySelector(".TitalInput");
const textInput = document.querySelector(".TextInput");
const datum = document.querySelector(".date");
const btn = document.querySelector(".Submit");
const body = document.querySelector("body");
const oldPosts = document.querySelector(".OldPosts");

datum.valueAsDate = new Date();

let StoredPost = [];

function PushToArray() {
  let UserInfo = {
    tital: titalInput.value,
    text: textInput.value,
    datum: datum.value,
  };

  if (UserInfo.tital.length === 0) {
    titalInput.style.borderColor = " red";
  } else {
    StoredPost.push(UserInfo);
    titalInput.style.borderColor = " #4db588";
  }

  localStorage.setItem("Stored", JSON.stringify(StoredPost));
  datum.value = "";
  titalInput.value = "";
  textInput.value = "";
}

btn.addEventListener("click", () => {
  PushToArray();
  CreateUI();
});

function CreateUI() {
  let Stored = JSON.parse(localStorage.getItem("Stored"));

  if (!Stored) {
    StoredPost = [];
  } else {
    StoredPost = Stored;
  }
  oldPosts.innerHTML = "";
  StoredPost.sort((a, b) => new Date(b.datum) - new Date(a.datum));

  for (const item of StoredPost) {
    const OldText = document.createElement("div");
    const time = document.createElement("h1");
    const Tiatl = document.createElement("p");
    const PostText = document.createElement("p");

    OldText.className = " OldText";
    time.innerHTML = item.datum;
    Tiatl.innerHTML = item.tital;
    PostText.innerHTML = item.text;
    OldText.append(time, Tiatl, PostText);
    oldPosts.appendChild(OldText);
  }
}

CreateUI();
