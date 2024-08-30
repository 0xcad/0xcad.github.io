/*var characters = "¢£§©¶áëy÷ȿͳÜiÐúødsΣXcd•aĕņġ!#*";*/
/*var characters = "Cassidy";*/
var characters = "Cassidy¢£§©¶áëy÷ȿͳÜiÐúødsΣXcd•aĕņġ!#*";
scrambles = document.getElementsByClassName("scramble");
function doScramble(){
  setTimeout(doScramble, 150);
  if (scrambles) {
    for(var i=0; i<scrambles.length; i++) {
      newText = '';
      for(var j=0; j<scrambles[i].innerText.length; j++) {
        newText += characters[Math.floor(Math.random() * characters.length)];
      }
      scrambles[i].innerText = newText;
    }
  }
}
doScramble();
