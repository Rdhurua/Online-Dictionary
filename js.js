const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const audio = document.getElementById("sound");
const btn = document.getElementById("search-button");
const details = document.getElementsByClassName(".details");
btn.addEventListener("click", () => {
     let inpwd = document.getElementById("search-input").value;
     //   console.log(inpwd);

     fetch(`${url}${inpwd}`).then((response) => response.json())
          .then((data) => {
               console.log(data);
               let h3 = document.querySelector("h3");
               h3.innerText = inpwd;
               document.getElementById("mean").innerText = data[0].meanings[0].partOfSpeech;
               document.getElementById("pho").innerText = data[0].phonetic;
               document.getElementById("word-meaning").innerText = data[0].meanings[0].definitions[0].definition;
               let i = 0;
               for (let ch of data[0].phonetics) {
                    if (ch.audio != "") { break; }
                    else {
                         i++;
                    }
               }

               let m = 0;
               for (let ch of data[0].meanings[0].definitions) {
                    if (ch.example != undefined) { break; }
                    else {
                         m++;
                    }
               }



               document.getElementById("word-example").innerText = data[0].meanings[0].definitions[m].example || "";

               audio.setAttribute("src", `${data[0].phonetics[i].audio}`);
               console.log(i);
               result.classList.remove("hide");


          })
          .catch((error) => {
               result.innerText = `sorry word couldn't be found`;
          });
     //    let response=await fetch(`${url}${inpwd}`);
     //     let data=await response.json();

});
function playaudio() {
     audio.play();
}





