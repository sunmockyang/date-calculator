function mdl(){
  if(!document.body.classList.contains('mdl-visible')){
    document.getElementsByClassName("close")[0].focus();
  }else{
    document.getElementsByClassName("mdl-launch")[0].focus();
  }
	document.body.classList.toggle('mdl-visible');
}

