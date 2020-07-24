const search = document.querySelector("input");
const weatherForm = document.querySelector("form");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  fetch(`http://localhost:3000/weather?address=${search.value}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
        } else {
          console.log(data);
          messageOne.textContent = data.location;
          messageTwo.textContent = `${data.description}. Its ${data.temperature} degree here but it feels like ${data.feels_like} degree`;
        }
      });
    }
  );
});
