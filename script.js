var form = document.getElementById("form");
var nombre = document.getElementById("nombre");
var apellido= document.getElementById("apellido");
var email = document.getElementById("email");





function validateForm() {
   
  var NombreOk = checkNombre();
  var EmailOk = checkEmail();
  var SurnameOK = checkApellido();
  var result = NombreOk && EmailOk && SurnameOK;
  
   
  if(result) 
  alert("La incripcion ha sido correcta"); 
  sendDataToServer();
}


form.addEventListener("submit", (e) => {
   e.preventDefault();
  validateForm();
  
 }
 );

 function sendDataToServer() {

  var nombreValue = nombre.value;
  var apellidoValue = apellido.value;
  var emailValue = email.value;

 
  var formData = new FormData();
  formData.append("nombre", nombreValue);
  formData.append("apellido", apellidoValue);
  formData.append("email", emailValue);


  var request = new XMLHttpRequest();
  request.open("POST", "formulario.php", true);
  

  request.onload = function() {
    
    if (request.status >= 200 && request.status < 400) {
      
      var response = request.responseText;
      console.log(response);
    } else {
     
      console.error("Error al enviar los datos al servidor.");
    }
  };

  request.send(formData);
}


function checkNombre() {
  let nameValue = nombre.value.trim();
  if(nameValue==="") { 
    setStatus(nombre, "Rellene este campo", "error");
     return false; 
    }
  const pattern = new RegExp('^[A-Za-z]+$', 'i');
   if (!pattern.test(nameValue)) {
    setStatus(username, "Solo letras", "error");
    return false; 
  }
    setStatus(nombre, null, "success");
    return true;
  
  
};

function checkApellido() {
  let nameValue = apellido.value.trim();
  if(nameValue==="") { 
    setStatus(apellido, "Rellene este campo", "error");
     return false; 
    }
  const pattern = new RegExp('^[A-Za-z]+$', 'i');
   if (!pattern.test(nameValue)) {
    setStatus(apellido, "Solo letras", "error");
    return false; 
  }
    setStatus(apellido, null, "success");
    return true;
  
  
};

function checkEmail() {
  
  let emailValue = email.value;

  if (emailValue === "") {
    setStatus(email, "Rellene este campo", "error");
    return false;
  }  

  const pattern = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");

  if (!pattern.test(emailValue)) {
    setStatus(email, "Email invalido", "error");
    return false;
  }


  
    setStatus(email, null, "success");
    return true;
};



  var setStatus = (field, message, status) => {
  const successIcon = field.parentElement.querySelector(".icon-success");
  const errorIcon = field.parentElement.querySelector(".icon-error");
  const errorMessage = field.parentElement.querySelector(".error-message");

  if (status === "success") {
    if (errorIcon) {
      errorIcon.classList.add("hidden");
    }
    if (errorMessage) {
      errorMessage.innerText = "";
    }

    successIcon.classList.remove("hidden");
    field.classList.add("success");
    field.classList.remove("error-input");
  }

  if (status === "error") {
    if (successIcon) {
      successIcon.classList.add("hidden");
    }
    field.parentElement.querySelector(".error-message").innerText = message;

    errorIcon.classList.remove("hidden");
    field.classList.add("error-input");
    field.classList.remove("success");

  }
};