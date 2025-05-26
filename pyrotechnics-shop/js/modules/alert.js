// for resuing show alert 
export  function showAlert(message, type)
 {
    const alertPlaceholder = document.getElementById('formAlerts');
  const wrapper = document.createElement('div');
  
  alertPlaceholder.innerHTML="";
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('');

//property of Dom firstChild
  if (alertPlaceholder.firstChild)
     {
        // insert a new node before a reference node
        alertPlaceholder.insertBefore(wrapper, alertPlaceholder.firstChild);
    }
     else
      {
        alertPlaceholder.appendChild(wrapper);
    }
}
