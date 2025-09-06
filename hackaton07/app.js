const username = document.getElementById("user-github");
const btnGithub = document.getElementById("btn-github");

const showSection = (sectionName) => {
  const section = document.getElementById(sectionName);
  section.classList.remove("hidden");
  section.classList.add("block");
};

const hiddenSection = (sectionName) => {
  const section = document.getElementById(sectionName);
  section.classList.add("hidden");
};

btnGithub.addEventListener("click", async () => {
  const user = username.value;
  if (!user) {
    alert("El usuario es necesario");
  }

  hiddenSection("github-section");
  showSection("result-github");

  const response = await fetch(`https://api.github.com/users/${user}`);

  const reposResponse = await fetch(
    `https://api.github.com/users/${user}/repos`
  );
  const repos = await reposResponse.json();

  const data = await response.json();

  const container = document.getElementById("result-github");

  container.innerHTML = `
      <div class="bg-white rounded-lg shadow-lg px-5 py-2">
        <div class="flex flex-row items-center justify-center p-5">
          <img class="rounded-full w-32 h-32 overflow-hidden m-5"
            src="${data.avatar_url}"
            alt="${data.login}"
          />
          <div class="flex flex-col items-start justify-center m-5">
            <h1 class="text-xl font-bold">${data.login}</h1>
            <h2>${data.name || "Sin nombre"}</h2>
            <h3>${data.location || "Sin ubicación"}</h3>
            <h4>${data.company || "Sin compañía"}</h4>
          </div>
        </div>

        <div class="w-full h-[1px] border"></div>

        <div class="flex flex-row items-center justify-around p-5">
          <h2 class="font-bold">Repositorios</h2>
          <span>${repos.length}</span>
        </div>

        <div class="w-full h-[1px] border"></div>

        <div>
          <div class="grid max-h-[450px] overflow-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-10">
            ${repos
              .map(
                (repo) => `
              <div
                class="bg-gray-100 flex flex-col justify-between p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
              >
                <div>
                  <h3 class="text-lg font-semibold mb-2">${repo.name}</h3>
                  <p class="text-gray-700">${
                    repo.description || "Sin descripción"
                  }</p>
                  <span class="text-sm text-gray-600">${
                    repo.language || "Desconocido"
                  }</span>
                </div>
                <a
                  href="${repo.html_url}"
                  target="_blank"
                  class="text-blue-500 hover:underline mt-2 inline-block"
                >Ver más</a>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      </div>`;
});

const sectionMovies = document.getElementById("result-movies");
const movieInput = document.getElementById("movie-input");

movieInput.addEventListener("input", (e) => {
    e.preventDefault();
    const value = e.target.value.toLowerCase();
    value.length >= 3 &&

    getMovies(`https://api.themoviedb.org/3/search/movie?query=${value}`);

});

const tokenMovieDB = "";

const getMovies = async (url) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${tokenMovieDB}`, // or put your token here
    },
  });

  const data = await response.json();

  sectionMovies.innerHTML = `
  <div class="w-full min-w-xl grid grid-cols-3 gap-4 p-10 max-h-[400px] overflow-auto">
    ${data.results
      .map(
        (movie) => `
<div class="w-full flex items-center justify-center h-[280px] bg-white rounded-lg shadow-lg relative">
            <img
                class="w-full h-[280px] rounded-lg"
                src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                alt="Avatar"
            />

            <div class="absolute w-full text-center text-white bg-white/30 bottom-0 text-wrap backdrop:blur-lg py-2 font-bold">
                ${movie.title}
            </div>

        </div>
    `
      )
      .join("")}
  </div>
`;
};

getMovies("https://api.themoviedb.org/3/movie/popular");
