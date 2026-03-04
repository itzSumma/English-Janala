
//START FROM HERE------>
const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLoad(json.data));
};

//LEVEL-2 (START)
const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayWord(data.data));
};

const displayWord =(words)=>{
 //get the container & make empty
 const wordContainer =document.getElementById("word-container");
//  wordContainer.innerHTML="";
 // get into every word
 words.forEach (word=>{
     //create new element
// console.log(word)
const card =document.createElement("div")
card.innerHTML=`

`;
wordContainer.append(card)
 });
}

//LEVEL-1 (start)
const displayLoad = (lessons) => {
  //step-1: get the container & make it empty
  const labelContainer = document.getElementById("label-container");
  labelContainer.innerHTML = "";
  //step-2:get into every lessons
  for (let lesson of lessons) {
    //step-3:create new element
    console.log(lesson);
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
  <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
 <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
 </button>
`;
    //step-4:append into container
    labelContainer.append(btnDiv);
  }
}; //END

loadLessons();
