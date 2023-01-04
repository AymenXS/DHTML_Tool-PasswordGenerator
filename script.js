const lengthSlider = document.querySelector(".pass-length input"),
  options = document.querySelectorAll(".option input"),
  copyIcon = document.querySelector(".input-box span"),
  passwordInput = document.querySelector(".input-box input"),
  passIndicator = document.querySelector(".pass-indicator"),
  generateBtn = document.querySelector(".generate-btn");

const characters = {
  //* Object of letters, numbers & symbols
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "^!$%&|[](){}:;.,*+-#@<>~",
};

const generatePassword = () => {
  let staticPassword = "",
    randomPassword = "",
    excludeDuplicate = false,
    passLength = lengthSlider.value;

  options.forEach((option) => {
    //* Looping through each option's checkbox
    if (option.checked) {
      if (option.id !== "exc-duplicate" && option.id !== "spaces") {
        //* If duplicate and spaces aren't checked
        staticPassword += characters[option.id]; //* Adding particular Key Value from the {characters} Object to staticPassword
      } else if (option.id === "spaces") {
        staticPassword += ` ${staticPassword} `; //* Adding space at the beginning & end of staticPassword
      } else {
        excludeDuplicate = true;
      }
    }
  });

  for (let i = 0; i < passLength; i++) {
    let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];

    if (excludeDuplicate) {
      //* if randomPassword doesn't contain the current random character or randomChar
      //* is equal to space " " then add random character to randomPassword else decrement i by -1
      !randomPassword.includes(randomChar) || randomChar == " " ? (randomPassword += randomChar) : i--;
    } else {
      //* else add random character to randomPassword
      randomPassword += randomChar;
    }
  }
  passwordInput.value = randomPassword; // passing randomPassword to passwordInput value
};

const updatePassIndicator = () => {
  passIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong";
};

const updateSlider = () => {
  //* Passing Slider Value as counter text
  document.querySelector(".pass-length span").innerHTML = lengthSlider.value;
  generatePassword();
  updatePassIndicator();
};

const copyPassword = () => {
  navigator.clipboard.writeText(passwordInput.value);
  copyIcon.innerText = "check";
  setTimeout(() => {
    copyIcon.innerText = "copy_all";
  }, 1000);
};

updateSlider();
copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);
