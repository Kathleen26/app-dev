const form = document.querySelector('form');

const button = document.querySelector('button');
if (button) {
  button.addEventListener('click', () => {
    console.log('Button clicked!');
  });
  
  if (captchaResponse.length > 0) {
        throw new Error("Captcha not completed");
    }

const fd = new FormData(e.target);
     const params = new URLSearchParams(fd);

    fetch('http://localhost:3000/upload', {
        method: "POST",
        body: params,
    })

    .then(res => res.json())
    .then(data => {
        if(data.captchaSuccess) {
            console.log("Validation successful");
        } else {
            console.error("Validation failed");
        }
       })
    .catch(err => console.error(err))
}
