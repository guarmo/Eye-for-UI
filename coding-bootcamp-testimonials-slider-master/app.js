function slide() {
  const client_img = document.querySelector("#testimonial-img");
  const client_testimony = document.querySelector(".lead");
  const client_name = document.querySelector("#name");
  const client_role = document.querySelector("#profession");
  const next_btn = document.querySelector("#next");
  const prev_btn = document.querySelector("#prev");
  const clients = [
    {
      clientName: " Tanya Sinclair",
      clientRole: "UX Engineer",
      clientTestimony:
        "I’ve been interested in coding for a while but never taken the jump, until now. I couldn’t recommend this course enough. I’m now in the job of my dreams and so excited about the future.",
      clientImage: "images/image-tanya.jpg",
    },
    {
      clientName: "   John Tarkpor",
      clientRole: "Junior Front-end Developer",
      clientTestimony:
        "If you want to lay the best foundation possible I’d recommend taking this course.The depth the instructors go into is incredible.I now feel so confident about starting up as a professional developer.",
      clientImage: "images/image-john.jpg",
    },
  ];

  var count = 0;

  function endpoints() {
    if (count < 0) {
      count = clients.length - 1;
    }
    if (count == clients.length) {
      count = 0;
    }
  }

  prev_btn.onclick = function () {
    count -= 1;
    endpoints();
    setClient();
  };

  next_btn.onclick = function () {
    count += 1;
    endpoints();
    setClient();
  };

  function setClient() {
    for (let client of clients) {
      if (clients.indexOf(client) == count) {
        client_img.setAttribute("src", client.clientImage);

        client_name.textContent = client.clientName;
        client_role.textContent = client.clientRole;
        client_testimony.textContent = client.clientTestimony;
      }
    }
  }
}
slide();
