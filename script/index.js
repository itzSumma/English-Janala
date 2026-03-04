//LEVEL-4(Synonyms)
const createElements = (arr) => {
  const htmlElements = arr.map((elem) => `<span class="btn">${elem}</span>`);
  console.log(htmlElements);
  return htmlElements.join(" ");
};

//START FROM HERE------>
const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLoad(json.data));
};

//LEVEL-3
const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  lessonButtons.forEach((btn) => btn.classList.remove("active"));
  console.log(lessonButtons);
};

//LEVEL-2 (START)

//second step here
const loadLevelWord = (id) => {
  removeActive();
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      // console.log(clickBtn);
      clickBtn.classList.add("active"); //add active class
      displayWord(data.data);
    });
};

//LEVEL-4(START)
const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  console.log(url);
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
};
const displayWordDetails = (word) => {
  console.log(word);
  // console.log(word.synonyms[0])
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `

                <div >
                    <h2 class="text-2xl font-semibold">${word.word}( <i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})</h2>
                </div>

                <div>
                    <h2 class=" font-semibold">Meaning</h2>
                    <p class="font-bangla">${word.meaning}</p>
                </div>

                <div>
                    <h2 class=" font-semibold">Example</h2>
                    <p>${word.sentence}</p>
                </div>
                <div>
                    <h2 class=" font-semibold">Synonyms</h2>
                   <div>
                   ${createElements(word.synonyms)}
                   
              
                </div>
            </div>
         


`;
  document.getElementById("word_modal").showModal();
};

//First step from here

const displayWord = (words) => {
  //get the container & make empty
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  //Last one give alert
  if (words.length == 0) {
    wordContainer.innerHTML = `
 <div class="text-center col-span-full p-5 space-y-3 font-bangla">
          
     <div class=" flex justify-center">
            <img src="./assets/alert-error.png" alt="">
            </div>
            <p class="text-sm font-sm text-gray-400">আপনি এখনো কোন Lesson Select করেননি </p>
            <h2 class="text-2xl font-semibold">একটি Lesson Select করুন।</h2>
           </div>
 `;
  }

  // get into every word
  words.forEach((word) => {
    //create new element
    // console.log(word)
    const card = document.createElement("div");
    card.innerHTML = `
 <div class="bg-white rounded-lg p-8 py-10 px-5  text-center shadow-lg space-y-4">
            <h2 class="text-2xl font-bold">
                ${word.word ? word.word : "শব্দ পাওয়া যায়নি"}
            </h2>
            <p class="font-semibold">Meaning /Pronunciation</p>
<div class="font-bangla font-medium text-2xl text-gray-600">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} /${word.pronunciation ? word.pronounciation : "Pronunciation পাওয়া যায়নি "}"</div>
<div class="flex justify-between items-center">
    <button onclick="loadWordDetail(${word.id})" class="btn btn-outline bg-[#1a91ff20] hover:bg-[#1a91ff60]  active:bg-[#1a91ff60]"><i class="fa-solid fa-circle-info"></i></button>
    <button class="btn btn-outline bg-[#1a91ff20] hover:bg-[#1a91ff60]  active:bg-[#1a91ff60]"><i class="fa-solid fa-volume-high"></i></button>
</div>
        </div>
`;
    wordContainer.append(card);
  });
}; //END

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
  <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
 <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
 </button>
`;
    //step-4:append into container
    labelContainer.append(btnDiv);
  }
}; //END

loadLessons();
