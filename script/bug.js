const createElements = (arr) => {
  const htmlElements = arr.map(el => <span class='btn'> ${el} </span>);
  return htmlElements.join(" ")
};

const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById('spinner').classList.remove('hidden')
    document.getElementById('word-container').classList.add('hidden')
  } else {
    document.getElementById('spinner').classList.add('hidden');
    document.getElementById('word-container').classList.remove('hidden');
  }
}


// Step-1
const loadLessons = () => {
  fetch('https://openapi.programming-hero.com/api/levels/all') // promise of response
    .then(res => res.json()) // promise of json data
  .then(json => displayLesson(json.data)) 
}


const removeActive = () => {
  const lessonsBtn = document.querySelectorAll('.lesson-btn')
  lessonsBtn.forEach(btn => btn.classList.remove('active'))
};
// all lesson er jei button a click hosse sei button er data gula ke ei function er vitore pass kortese.
// Step-3
const loadLevelWord = (id) => {
  manageSpinner(true);
  const url =  `https://openapi.programming-hero.com/api/level/${id}`;//dynamic url with id.
  // console.log(url) 
  fetch(url)
    .then(res => res.json())
    .then(data => {
      removeActive(); // remove all active class 
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add('active') // set active class
      displayLevelWord(data.data);
    });
};

const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data)
}
//  {
// "word": "Eager",
// "meaning": "আগ্রহী",
// "pronunciation": "ইগার",
// "level": 1,
// "sentence": "The kids were eager to open their gifts.",
// "points": 1,
// "partsOfSpeech": "adjective",
// "synonyms": [
// "enthusiastic",
// "excited",
// "keen"
// ],
// "id": 5
// }
const displayWordDetails = (word) => {
  console.log(word)
  const detailsBox = document.getElementById('word-details-container')
  detailsBox.innerHTML = `
          <div class="">
          <h2>${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
        </div>
        <div class="">
          <h2>Meaning</h2>
          <p>${word.meaning}</p>
        </div>
        <div class="">
          <h2>Example</h2>
          <p>${word.sentence}</p>
        </div>
        <div class="">
          <h2>Synonym</h2>
          <div class="">${createElements(word.synonyms)}</div>
        </div>
  `;
  document.getElementById('word_modal').showModal();
}
// finally sei data gula ekta card er vitore dynamically dekhanor jonno ei fucntion kaj kortese
// Step-4
const displayLevelWord = (words) => {
  const wordContainer = document.getElementById('word-container');
  wordContainer.innerHTML = '';
  if (words.length == 0) {
    wordContainer.innerHTML = `
      <div class="py-10 text-center space-y-5 font-bangla col-span-full">
        <img class="mx-auto" src="./assets/alert-error.png" alt="">
        <p class="text-2xl">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="text-4xl font-medium">নেক্সট Lesson এ যান</h2>
      </div>`;
    manageSpinner(false)
    return;
  }
  words.forEach((word) => {
    // console.log(word)
    const card = document.createElement('div');
    card.innerHTML = `
      <div class="bg-white py-10 px-8 space-y-5 text-center rounded-xl shadow-sm">
      <h2 class="text-4xl font-bold">${word.word ? word.word : 'শব্দ পাওয়া যায় নি'}</h2>
      <p class="font-semibold">Meaning / Pronunciation</p>
      <p class="text-2xl">${word.meaning ? word.meaning : 'অর্থ পাওয়া যায় নি'} / ${word.pronunciation ? word.pronunciation : 'Pronunciation পাওয়া যায় নি'}</p>
      <div class="text-4xl font-bangla font-semibold"></div>
      <div class="flex justify-between items-center">
        <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF70]"><i class="fa-solid fa-circle-info"></i></button>
        <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF70]"><i class="fa-solid fa-volume-high"></i></button>
      </div>
    </div>
    `;
    wordContainer.appendChild(card)
  })
  manageSpinner(false)
}

//Step-2
const displayLesson = (lessons) => {
  // step-1 get the container and empty innerHTML;
  const lessonContainer = document.getElementById('lesson-container');
  lessonContainer.innerHTML = '';

  // step-2 get into every lessons
  for (let lesson of lessons) {
    // console.log(lesson)
    // step-3 create new element and set inner html;
    const btnDiv = document.createElement('div');
    btnDiv.innerHTML = `
                        <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-soft btn-primary lesson-btn">
                        <i class="fa-brands fa-leanpub"></i> Lesson - ${lesson.level_no}
                        </button>`;
    
    // step-4 append btnDiv to the lesson container 
    lessonContainer.appendChild(btnDiv)
  }
}

loadLessons()