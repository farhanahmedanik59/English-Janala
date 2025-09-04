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
      <button class="btn border-[#422ad5]  h-[50px] w-32" onclick="loadWord(${lesson.level_no})"><img src="/english-janala-resources/assets/fa-book-open.png" alt="" />Lesson-${lesson.level_no}</button>
    `;
    levelcontainer.appendChild(childLesson);
  });
};
loadData();

const loadWord = async (id) => {
  const response = await fetch(`https://openapi.programming-hero.com/api/level/${id}`);
  const data = await response.json();
  const parentDiv = document.getElementById("lesson-info-container");
  parentDiv.innerHTML = "";
  if (data.data.length === 0) {
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
          <div class="flex justify-between max-w-[70%] m-auto mt-[66px] pb-[60px]">
            <div class="p-3 bg-[#1a91ff1a] rounded-md hover:cursor-pointer hover:bg-gray-200">
              <img src="/english-janala-resources/assets/fa-circle-question.png" alt="" />
            </div>
            <div>
              <span class="p-3 bg-[#1a91ff1a] rounded-md hover:cursor-pointer hover:bg-gray-200"><i class="fa-solid fa-volume-high"></i></span>
            </div>
          </div>
        </div>
    `;
    parentDiv.appendChild(childDiv);
  });
};
