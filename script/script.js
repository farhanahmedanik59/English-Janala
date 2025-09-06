const loadData = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayLessons(data.data));
};

const displayLessons = (data) => {
  const levelcontainer = document.getElementById("level-container");
  levelcontainer.innerHTML = "";
  data.forEach((lesson) => {
    const childLesson = document.createElement("div");
    childLesson.innerHTML = `
      <button class="btn border-[#422ad5]  h-[50px] w-32 " id="${lesson.level_no}" onclick="loadWord(${lesson.level_no})"><img src="/english-janala-resources/assets/fa-book-open.png" class="btnimg" alt="" />Lesson-${lesson.level_no}</button>
    `;
    levelcontainer.appendChild(childLesson);
    const btn = document.getElementById(lesson.level_no);
    const btnImg = btn.querySelector(".btnimg");
    btn.addEventListener("click", (event) => {
      const activeBtn = document.getElementsByClassName("active");
      const activeImf = document.getElementsByClassName("filter");
      for (const active of activeBtn) {
        active.classList.remove("active");
        for (const img of activeImf) {
          img.classList.remove("filter", "invert");
        }
      }
      btn.classList.add("active");
      btnImg.classList.add("filter", "invert");
    });
  });
};
loadData();

const loadWord = async (id) => {
  manageSpinner(true);
  const response = await fetch(`https://openapi.programming-hero.com/api/level/${id}`);
  const data = await response.json();
  const parentDiv = document.getElementById("lesson-info-container");
  parentDiv.innerHTML = "";
  if (data.data.length === 0) {
    manageSpinner(false);
    parentDiv.innerHTML = `
    <div class="col-span-full text-center p-9">
          <img class="mx-auto" src="/english-janala-resources/assets/alert-error.png" alt="" />
          <h1 class="mt-5">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h1>
          <h1 class="text-4xl mt-6 font-bold">নেক্সট Lesson এ যান</h1>
        </div>`;
  }
  data.data.forEach((dataByLevel) => {
    const childDiv = document.createElement("div");
    childDiv.innerHTML = `<div class="rounded-lg bg-white text-center">
          <h1 class="pt-[56px] text-3xl font-bold">${dataByLevel.word}</h1>
          <p class="mt-6 text-1xl font-bold">Meaning/Pronounciation</p>
          <h1 class="mt-6 text-2xl font-bold">"${dataByLevel.meaning === null ? "{Meaning Not Found}'" : dataByLevel.meaning} / ${dataByLevel.pronunciation}"</h1>
          <div  class="flex justify-between max-w-[70%] m-auto mt-[66px] pb-[60px]">
            <div onclick="loadinfo(${dataByLevel.id})" class="p-3 bg-[#1a91ff1a] rounded-md hover:cursor-pointer hover:bg-gray-200">
              <img src="/english-janala-resources/assets/fa-circle-question.png" alt="" />
            </div>
            <div>
              <span class="p-3 bg-[#1a91ff1a] rounded-md hover:cursor-pointer hover:bg-gray-200 " onclick="speak(${dataByLevel.id})"><i class="fa-solid fa-volume-high"></i></span>
            </div>
          </div>
        </div>
    `;
    parentDiv.appendChild(childDiv);
  });
  manageSpinner(false);
};

const loadinfo = (id) => {
  fetch(`https://openapi.programming-hero.com/api/word/${id}`).then((response) => response.json().then((data) => showinfo(data.data)));
};
const showinfo = (data) => {
  const modal = document.getElementById("my_modal_5");

  const synonyms = data.synonyms;
  const syn = (syno) => {
    m = syno.map((all) => `<div class="p-4 bg-[#EDF7FF] rounded-sm">${all}</div>`);
    return m.join(" ");
  };

  modal.innerHTML = "";
  modal.innerHTML = `<div class="modal-box">
        <h1 class="font-bold">${data.word} (<i class="fa-solid fa-microphone"></i>: ${data.pronunciation})</h1>
        <h2 class="mt-[32px] font-bold">Meaning</h2>
        <h1 class="mt-[10px]">${data.meaning}</h1>
        <h1 class="font-bold mt-[32px]">Example</h1>
        <p class="mt-[8px]">${data.sentence}</p>
        <h1 class="font-bold mt-[32px]">সমার্থক শব্দ গুলো</h1>
        <div class="flex gap-6">
          ${syn(synonyms)}
        </div>
        <div class="mt-5">
          <form method="dialog">
            <button class="btn bg-[#422AD5] text-white">Complete Learning</button>
          </form>
        </div>
      </div>`;
  modal.showModal();
};
const manageSpinner = (status) => {
  const spinner = document.getElementById("spinner");
  const container = document.getElementById("lesson-info-container");
  if (status === true) {
    spinner.classList.remove("hidden");
    container.classList.add("hidden");
  } else {
    container.classList.remove("hidden");
    spinner.classList.add("hidden");
  }
};

document.getElementById("btn-search").addEventListener("click", () => {
  const input = document.getElementById("input-search");
  const searchValue = input.value.trim().toLowerCase();
  if (searchValue === "") {
    return;
  }
  fetch("https://openapi.programming-hero.com/api/words/all").then((res) =>
    res.json().then((response) => {
      const data = response.data;
      const filterWors = data.filter((word) => word.word.toLowerCase().includes(searchValue));
      const parentDiv = document.getElementById("lesson-info-container");
      parentDiv.innerHTML = "";
      filterWors.forEach((word) => {
        const childDiv = document.createElement("div");
        childDiv.innerHTML = `<div class="rounded-lg bg-white text-center">
          <h1 class="pt-[56px] text-3xl font-bold">${word.word}</h1>
          <p class="mt-6 text-1xl font-bold">Meaning/Pronounciation</p>
          <h1 class="mt-6 text-2xl font-bold">"${word.meaning === null ? "{Meaning Not Found}'" : word.meaning} / ${word.pronunciation}"</h1>
          <div  class="flex justify-between max-w-[70%] m-auto mt-[66px] pb-[60px]">
            <div onclick="loadinfo(${word.id})" class="p-3 bg-[#1a91ff1a] rounded-md hover:cursor-pointer hover:bg-gray-200">
              <img src="/english-janala-resources/assets/fa-circle-question.png" alt="" />
            </div>
            <div>
              <span class="p-3 bg-[#1a91ff1a] rounded-md hover:cursor-pointer hover:bg-gray-200" onclick="speak(${word.id})"><i class="fa-solid fa-volume-high"></i></span>
            </div>
          </div>
        </div>
    `;
        parentDiv.appendChild(childDiv);
      });
    })
  );
});
const speak = (id) => {
  fetch(`https://openapi.programming-hero.com/api/word/${id}`).then((res) =>
    res.json().then((response) => {
      const data = response.data.word;
      function pronounceWord(word) {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = "en-EN"; // English
        window.speechSynthesis.speak(utterance);
      }
      pronounceWord(data);
    })
  );
};
